<template>
  <div class="pdf-viewer-container">
    <h2 class="title">PDF文档查看器</h2>
    
    <div class="pdf-controls">
      <el-card class="control-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Document /></el-icon> 样本文档</span>
          </div>
        </template>
        <div class="button-group">
          <el-button type="primary" @click="openPdf" :icon="Document">
            打开本地PDF样本
          </el-button>
          <el-button type="success" @click="openPdfRemote" :icon="Download">
            打开远程PDF样本
          </el-button>
          <el-button type="warning" @click="handleFileUpload" :icon="Upload">
            上传PDF文件
          </el-button>
          <input 
            ref="fileInput"
            type="file" 
            accept=".pdf" 
            style="display: none" 
            @change="onFileSelected"
          />
        </div>
      </el-card>
      
      <el-card v-if="selectedFile" class="preview-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Document /></el-icon> 当前文件: {{ selectedFile.name }}</span>
            <el-button 
              v-if="selectedFile" 
              type="danger" 
              @click="resetFile" 
              :icon="Delete" 
              circle
              size="small"
            />
          </div>
        </template>
        <div class="file-details" v-if="selectedFile">
          <p><strong>文件名:</strong> {{ selectedFile.name }}</p>
          <p><strong>大小:</strong> {{ formatFileSize(selectedFile.size) }}</p>
          <p><strong>类型:</strong> {{ selectedFile.type }}</p>
          <div class="action-buttons">
            <el-button type="primary" @click="previewSelectedFile">预览文件</el-button>
            <el-button type="info" @click="downloadFile">下载文件</el-button>
          </div>
        </div>
      </el-card>
    </div>
    
    <el-card v-if="showEmbeddedPreview" class="embedded-preview">
      <template #header>
        <div class="card-header">
          <span><el-icon><Document /></el-icon> 内嵌预览</span>
          <div class="header-actions">
            <el-tooltip :content="fullScreenMode ? '退出全屏' : '全屏预览'">
              <el-button 
                type="primary" 
                size="small" 
                @click="toggleFullScreen"
                :icon="fullScreenMode ? FullScreen : Expand"
              >
                {{ fullScreenMode ? '退出全屏' : '全屏预览' }}
              </el-button>
            </el-tooltip>
            <el-tooltip content="关闭预览">
              <el-button 
                type="danger" 
                size="small" 
                @click="closePreview"
                :icon="Delete"
                circle
              />
            </el-tooltip>
          </div>
        </div>
      </template>
      <div class="pdf-frame-container" :class="{ 'fullscreen': fullScreenMode }">
        <div v-if="loading" class="loading-container">
          <el-icon class="loading-icon"><Loading /></el-icon>
          <p>PDF加载中，请稍候...</p>
        </div>
        <iframe 
          v-show="!loading && currentPdfUrl" 
          :src="viewerUrl + (currentPdfUrl ? '?file=' + encodeURIComponent(currentPdfUrl) : '')" 
          class="pdf-frame"
          @load="onIframeLoad"
        ></iframe>
      </div>
    </el-card>
    
    <el-dialog
      v-model="showHistory"
      title="最近查看记录"
      width="50%"
      destroy-on-close
    >
      <div v-if="viewHistory.length">
        <div class="history-actions">
          <el-button type="danger" size="small" @click="clearHistory" :icon="Delete">
            清空历史记录
          </el-button>
        </div>
        <el-table :data="viewHistory" style="width: 100%" border>
          <el-table-column prop="name" label="文件名" min-width="200" show-overflow-tooltip />
          <el-table-column prop="time" label="查看时间" width="180" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.type === 'local' ? 'primary' : scope.row.type === 'remote' ? 'success' : 'warning'">
                {{ scope.row.type === 'local' ? '本地文件' : scope.row.type === 'remote' ? '远程文件' : '上传文件' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button type="primary" size="small" @click="openHistoryItem(scope.row)">
                重新打开
              </el-button>
              <el-button type="danger" size="small" @click="removeHistoryItem(scope.row)" :icon="Delete" circle />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="empty-history">
        <el-empty description="暂无查看记录" />
      </div>
    </el-dialog>
    
    <div class="action-bar">
      <el-button type="info" @click="showHistory = true" :icon="List">查看历史记录</el-button>
      <el-tooltip content="配置PDF查看器选项" placement="top">
        <el-button :icon="Setting" circle @click="showSettings = true" />
      </el-tooltip>
    </div>
    
    <el-dialog v-model="showSettings" title="PDF查看器设置" width="30%">
      <el-form label-position="top">
        <el-form-item label="默认打开方式">
          <el-radio-group v-model="settings.openMethod">
            <el-radio :label="'new_tab'">新标签页</el-radio>
            <el-radio :label="'embedded'">内嵌预览</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保存历史记录">
          <el-switch v-model="settings.saveHistory" />
        </el-form-item>
        <el-form-item label="默认缩放">
          <el-select v-model="settings.defaultZoom" placeholder="选择默认缩放">
            <el-option label="自动适应" value="auto" />
            <el-option label="页面适应" value="page-fit" />
            <el-option label="宽度适应" value="page-width" />
            <el-option label="100%" value="100" />
            <el-option label="150%" value="150" />
            <el-option label="200%" value="200" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSettings = false">取消</el-button>
          <el-button type="primary" @click="saveSettings">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { 
  Document, 
  Download, 
  Upload, 
  Delete, 
  Setting, 
  List,
  Expand,
  FullScreen,
  Loading
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

interface HistoryItem {
  name: string;
  url: string;
  time: string;
  type: 'local' | 'remote' | 'uploaded';
}

interface Settings {
  openMethod: 'new_tab' | 'embedded';
  saveHistory: boolean;
  defaultZoom: string;
}

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const showEmbeddedPreview = ref(false);
const currentPdfUrl = ref('');
const viewHistory = ref<HistoryItem[]>([]);
const showHistory = ref(false);
const showSettings = ref(false);
const fullScreenMode = ref(false);
const loading = ref(false);

const settings = ref<Settings>({
  openMethod: 'new_tab',
  saveHistory: true,
  defaultZoom: 'auto'
});

const viewerUrl = computed(() => {
  const baseUrl = import.meta.env.BASE_URL + 'pdfjs-4.8.69-dist/web/viewer.html';
  const zoomParam = settings.value.defaultZoom !== 'auto' ? `&zoom=${settings.value.defaultZoom}` : '';
  return baseUrl + zoomParam;
});

// 本地默认PDF样本URL
const localPdfUrl = computed(() => {
  return import.meta.env.BASE_URL + 'pdfjs-4.8.69-dist/web/viewer.html';
});

// 远程PDF样本URL
const remotePdfUrl = computed(() => {
  return 'https://raw.githubusercontent.com/xishan-lin/resourcesRepo/main/genealogy/莆田林氏西山本支族谱(卷一).pdf';
});

onMounted(() => {
  loadSettings();
  loadHistory();
  
  // 添加全屏切换事件监听
  document.addEventListener('keydown', handleKeyDown);
});

// 添加按键事件，支持Esc退出全屏
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && fullScreenMode.value) {
    fullScreenMode.value = false;
  }
};

// 加载设置
const loadSettings = () => {
  const savedSettings = localStorage.getItem('pdf-viewer-settings');
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
};

// 保存设置
const saveSettings = () => {
  localStorage.setItem('pdf-viewer-settings', JSON.stringify(settings.value));
  showSettings.value = false;
  ElMessage({
    message: '设置已保存',
    type: 'success',
    duration: 2000
  });
};

// 加载历史记录
const loadHistory = () => {
  const savedHistory = localStorage.getItem('pdf-viewer-history');
  if (savedHistory) {
    try {
      viewHistory.value = JSON.parse(savedHistory);
    } catch (e) {
      console.error('历史记录解析失败', e);
      viewHistory.value = [];
    }
  }
};

// 保存历史记录
const saveToHistory = (item: HistoryItem) => {
  if (!settings.value.saveHistory) return;
  
  // 检查是否已存在相同URL的记录，如果有则更新时间
  const existingIndex = viewHistory.value.findIndex(h => h.url === item.url);
  if (existingIndex !== -1) {
    viewHistory.value[existingIndex].time = item.time;
    viewHistory.value = [
      viewHistory.value[existingIndex],
      ...viewHistory.value.filter((_, i) => i !== existingIndex)
    ];
  } else {
    viewHistory.value.unshift(item);
    // 保持历史记录不超过10条
    if (viewHistory.value.length > 10) {
      viewHistory.value.pop();
    }
  }
  
  localStorage.setItem('pdf-viewer-history', JSON.stringify(viewHistory.value));
};

// 清空历史记录
const clearHistory = () => {
  ElMessageBox.confirm('确定要清空所有历史记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    viewHistory.value = [];
    localStorage.removeItem('pdf-viewer-history');
    ElMessage({
      type: 'success',
      message: '历史记录已清空'
    });
  }).catch(() => {});
};

// 删除特定历史记录项
const removeHistoryItem = (item: HistoryItem) => {
  const index = viewHistory.value.findIndex(h => h.url === item.url);
  if (index > -1) {
    viewHistory.value.splice(index, 1);
    localStorage.setItem('pdf-viewer-history', JSON.stringify(viewHistory.value));
    ElMessage({
      type: 'success',
      message: '已删除该记录'
    });
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / 1048576).toFixed(2) + ' MB';
};

const openPdf = () => {
  // 打开本地PDF样本
  loading.value = true;
  
  if (settings.value.openMethod === 'new_tab') {
    window.open(localPdfUrl.value);
    loading.value = false;
  } else {
    showEmbeddedPreview.value = true;
    currentPdfUrl.value = '';
  }
  
  saveToHistory({
    name: '本地PDF样本',
    url: localPdfUrl.value,
    time: new Date().toLocaleString(),
    type: 'local'
  });
};

const openPdfRemote = () => {
  // 打开远程PDF样本
  loading.value = true;
  
  if (settings.value.openMethod === 'new_tab') {
    window.open(viewerUrl.value + '?file=' + encodeURIComponent(remotePdfUrl.value));
    loading.value = false;
  } else {
    showEmbeddedPreview.value = true;
    currentPdfUrl.value = remotePdfUrl.value;
  }
  
  saveToHistory({
    name: '莆田林氏西山本支族谱(卷一)',
    url: remotePdfUrl.value,
    time: new Date().toLocaleString(),
    type: 'remote'
  });
};

const handleFileUpload = () => {
  fileInput.value?.click();
};

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    if (selectedFile.value.type !== 'application/pdf') {
      ElMessage({
        message: '请选择PDF文件',
        type: 'error',
        duration: 2000
      });
      selectedFile.value = null;
    }
  }
};

const resetFile = () => {
  selectedFile.value = null;
  if (fileInput.value) fileInput.value.value = '';
};

const previewSelectedFile = () => {
  if (!selectedFile.value) return;
  
  loading.value = true;
  const fileUrl = URL.createObjectURL(selectedFile.value);
  
  if (settings.value.openMethod === 'new_tab') {
    window.open(viewerUrl.value + '?file=' + encodeURIComponent(fileUrl));
    loading.value = false;
  } else {
    showEmbeddedPreview.value = true;
    currentPdfUrl.value = fileUrl;
  }
  
  saveToHistory({
    name: selectedFile.value.name,
    url: fileUrl,
    time: new Date().toLocaleString(),
    type: 'uploaded'
  });
};

const downloadFile = () => {
  if (!selectedFile.value) return;
  
  const url = URL.createObjectURL(selectedFile.value);
  const a = document.createElement('a');
  a.href = url;
  a.download = selectedFile.value.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  ElMessage({
    message: '文件下载已开始',
    type: 'success',
    duration: 2000
  });
};

const openHistoryItem = (item: HistoryItem) => {
  if (item.type === 'local') {
    if (settings.value.openMethod === 'new_tab') {
      window.open(localPdfUrl.value);
    } else {
      showEmbeddedPreview.value = true;
      currentPdfUrl.value = '';
    }
  } else if (item.type === 'uploaded') {
    // 上传的文件URL通常在会话期间有效，之后就无效了
    ElMessage({
      message: '上传的文件无法从历史记录中重新打开',
      type: 'warning',
      duration: 2000
    });
  } else {
    loading.value = true;
    if (settings.value.openMethod === 'new_tab') {
      window.open(viewerUrl.value + '?file=' + encodeURIComponent(item.url));
      loading.value = false;
    } else {
      showEmbeddedPreview.value = true;
      currentPdfUrl.value = item.url;
    }
  }
  
  // 更新访问时间
  item.time = new Date().toLocaleString();
  localStorage.setItem('pdf-viewer-history', JSON.stringify(viewHistory.value));
  showHistory.value = false;
};

const toggleFullScreen = () => {
  fullScreenMode.value = !fullScreenMode.value;
  
  if (fullScreenMode.value) {
    ElMessage({
      message: '按ESC键可退出全屏',
      type: 'info',
      duration: 2000
    });
  }
};

const closePreview = () => {
  ElMessageBox.confirm('确定要关闭预览吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    showEmbeddedPreview.value = false;
    currentPdfUrl.value = '';
    fullScreenMode.value = false;
  }).catch(() => {});
};

const onIframeLoad = () => {
  loading.value = false;
};

// 监听全屏状态变化，调整样式
watch(fullScreenMode, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.pdf-viewer-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 15px;
}

.pdf-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.control-card, .preview-card {
  flex: 1;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.control-card:hover, .preview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header .el-icon {
  margin-right: 5px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-details {
  padding: 10px 0;
}

.file-details p {
  margin: 8px 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.embedded-preview {
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pdf-frame-container {
  width: 100%;
  height: 600px;
  transition: all 0.3s ease;
  position: relative;
  background-color: #f5f7fa;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
}

.action-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.empty-history {
  padding: 20px;
  text-align: center;
}

.history-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #409EFF;
}

.loading-icon {
  font-size: 40px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .pdf-controls {
    flex-direction: column;
  }
  
  .pdf-frame-container {
    height: 400px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
