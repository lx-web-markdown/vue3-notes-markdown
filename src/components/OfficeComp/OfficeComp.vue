<template>
  <div class="office-comp">
    <div v-if="loading" class="loading">
      <el-icon class="loading-icon">
        <Loading />
      </el-icon>
      <span class="loading-text">文件加载中...</span>
    </div>

    <div v-else-if="error" class="error">
      <el-icon class="error-icon">
        <WarningFilled />
      </el-icon>
      <span class="error-text">{{ errorMessage }}</span>
    </div>

    <div class="file-preview">
      <!-- DOCX 文件预览 -->
      <vue-office-docx
        v-if="fileType === 'docx'"
        :src="fileUrl"
        @rendered="onRendered"
        @error="onError"
      />

      <!-- Excel 文件预览 -->
      <vue-office-excel
        v-else-if="fileType === 'xlsx' || fileType === 'xls'"
        :src="fileUrl"
        @rendered="onRendered"
        @error="onError"
      />

      <!-- PDF 文件预览 -->
      <vue-office-pdf
        v-else-if="fileType === 'pdf'"
        :src="fileUrl"
        @rendered="onRendered"
        @error="onError"
      />

      <!-- PPT 文件预览 -->
      <vue-office-pptx
        v-else-if="fileType === 'pptx' || fileType === 'ppt'"
        :src="fileUrl"
        @rendered="onRendered"
        @error="onError"
      />

      <!-- 不支持的文件类型 -->
      <div v-else class="unsupported">
        <el-icon class="unsupported-icon">
          <DocumentDelete />
        </el-icon>
        <span class="unsupported-text">不支持的文件类型：{{ fileType }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Loading, WarningFilled, DocumentDelete } from '@element-plus/icons-vue';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';
import VueOfficePptx from '@vue-office/pptx';
// 引入相关样式
import '@vue-office/docx/lib/index.css';
import '@vue-office/excel/lib/index.css';

interface Props {
  // 文件URL
  url: string;
  // 文件类型：docx, xlsx, xls, pdf, pptx, ppt
  filetype: string;
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  filetype: '',
});

// 组件状态
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('加载失败，请检查文件格式或链接是否正确');

// 根据 props 计算文件 URL 和类型
const fileUrl = computed(() => props.url);
const fileType = computed(() => props.filetype.toLowerCase());

// 文件渲染成功回调
const onRendered = () => {
  console.log('文件渲染成功');
  loading.value = false;
  error.value = false;
};

// 文件渲染错误回调
const onError = (e: any) => {
  loading.value = false;
  error.value = true;
  console.error('文件预览失败:', e);
  errorMessage.value = `加载失败: ${e?.message || '请检查文件格式或链接是否正确'}`;
};

// 监听参数变化
watch([() => props.url, () => props.filetype], () => {
  loading.value = true;
  error.value = false;
});

// 组件挂载时
onMounted(() => {
  if (!props.url) {
    loading.value = false;
    error.value = true;
    errorMessage.value = '请提供文件URL';
  }
});
</script>

<style lang="scss" scoped>
.office-comp {
  width: 100%;
  height: 100%;
  min-height: 500px;

  .file-preview {
    width: 100%;
    height: 100%;

    .file-preview {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      justify-content: center;

      :deep(.docx-viewer),
      :deep(.excel-viewer),
      :deep(.pdf-viewer),
      :deep(.pptx-viewer) {
        width: 100%;
        height: 100%;
        min-height: 500px;
      }
    }
  }

  .loading,
  .error,
  .unsupported {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 300px;

    .loading-icon,
    .error-icon,
    .unsupported-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #909399;
    }

    .loading-text,
    .error-text,
    .unsupported-text {
      font-size: 16px;
      color: #606266;
    }
  }
}
</style>
