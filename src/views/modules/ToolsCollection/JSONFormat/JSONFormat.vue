<template>
  <div class="json-format">
    <div class="editor-container">
      <!-- 左侧编辑器 -->
      <div class="editor-panel">
        <div class="editor-header">
          <span class="editor-title">输入JSON</span>
          <div class="editor-tools">
            <button class="tool-btn" title="导入文件" @click="importFile">
              <i class="fas fa-file-import"></i>
            </button>
            <button class="tool-btn" title="复制" @click="copyInput">
              <i class="fas fa-copy"></i>
            </button>
            <button class="tool-btn" title="清空" @click="clearInput">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <textarea
          v-model="inputJson"
          class="json-editor"
          placeholder="请输入JSON数据..."
          @input="handleInput"
        ></textarea>
      </div>

      <!-- 右侧编辑器 -->
      <div class="editor-panel">
        <div class="editor-header">
          <span class="editor-title">转换结果</span>
          <div class="editor-tools">
            <button
              v-for="tool in tools"
              :key="tool.name"
              class="tool-btn"
              :title="tool.title"
              @click="handleConvert(tool.name)"
            >
              <i :class="tool.icon"></i>
            </button>

            <div class="tools-divider"></div>

            <button class="tool-btn" title="导出文件" @click="exportFile">
              <i class="fas fa-file-export"></i>
            </button>
            <button class="tool-btn" title="复制" @click="copyOutput">
              <i class="fas fa-copy"></i>
            </button>
            <button class="tool-btn" title="清空" @click="clearOutput">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="json-viewer-container">
          <vue-json-pretty
            v-if="outputJson"
            :data="outputJson"
            :deep="jsonViewerConfig.deep"
            :show-length="jsonViewerConfig.showLength"
            :show-line="jsonViewerConfig.showLine"
            :show-line-number="jsonViewerConfig.showLineNumber"
            :show-double-quotes="jsonViewerConfig.showDoubleQuotes"
            :selectable-type="jsonViewerConfig.selectableType"
            class="json-viewer"
          />
          <div v-else class="empty-placeholder">转换结果将显示在这里...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { ElMessage } from 'element-plus';
import { demo as demoJson } from './demo';

// 编辑器内容
const inputJson = ref('');
const outputJson = ref('');
const currentTool = ref('');

// JSON查看器配置
const jsonViewerConfig = reactive({
  showLength: true,
  showLine: true,
  showDoubleQuotes: true,
  selectableType: '' as const,
  deep: 1,
  showLineNumber: false,
});

// 工具列表
const tools = [
  { name: 'format', title: '格式化', icon: 'fas fa-align-left' },
  { name: 'collapse', title: '折叠', icon: 'fas fa-compress-alt' },
  { name: 'expand', title: '展开', icon: 'fas fa-expand-alt' },
  { name: 'toggleLine', title: '垂直对齐线', icon: 'fas fa-grip-lines-vertical' },
  { name: 'toggleLineNumber', title: '显示行号', icon: 'fas fa-list-ol' },
  // { name: 'escape', title: '转义', icon: 'fas fa-quote-right' },
  // { name: 'unescape', title: '去除转义', icon: 'fas fa-quote-left' },
  // { name: 'toObject', title: '转对象', icon: 'fas fa-cube' },
  // { name: 'toString', title: '转字符串', icon: 'fas fa-font' }
];

onMounted(() => {
  inputJson.value = JSON.stringify(demoJson);
});

// 处理输入
const handleInput = () => {
  // TODO: 实时验证JSON格式
};

// 处理转换
const handleConvert = (toolName: string) => {
  currentTool.value = toolName;
  try {
    if (toolName === 'format') {
      const parsedJson = JSON.parse(inputJson.value);
      outputJson.value = parsedJson;
    } else if (toolName === 'collapse') {
      outputJson.value = JSON.parse(inputJson.value);
      jsonViewerConfig.deep = 1;
    } else if (toolName === 'expand') {
      outputJson.value = JSON.parse(inputJson.value);
      jsonViewerConfig.deep = Infinity;
    } else if (toolName === 'toggleLine') {
      jsonViewerConfig.showLine = !jsonViewerConfig.showLine;
    } else if (toolName === 'toggleLineNumber') {
      jsonViewerConfig.showLineNumber = !jsonViewerConfig.showLineNumber;
    }
  } catch (error) {
    console.error('JSON操作错误:', error);
    ElMessage.error('操作错误');
  }
};

// 实现文件导入
const importFile = () => {
  const file = document.createElement('input');
  file.type = 'file';
  file.accept = '.json';
  file.onchange = e => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        inputJson.value = e.target?.result as string;
      };
      reader.readAsText(file);
    }
  };
  file.click();
};

// 导出文件
const exportFile = () => {
  const blob = new Blob([inputJson.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.json';
  a.click();
  URL.revokeObjectURL(url);
};

// 复制输入内容
const copyInput = () => {
  navigator.clipboard.writeText(inputJson.value);
  ElMessage.success('输入内容已复制到剪贴板');
};

// 复制输出内容
const copyOutput = () => {
  navigator.clipboard.writeText(outputJson.value);
  ElMessage.success('输出内容已复制到剪贴板');
};

// 清空输入内容
const clearInput = () => {
  inputJson.value = '';
};

// 清空输出内容
const clearOutput = () => {
  outputJson.value = '';
};
</script>

<style lang="scss" scoped>
.json-format {
  padding: 20px;
  height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .editor-container {
    display: flex;
    gap: 20px;
    height: 100%;
  }

  .editor-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background-color: #e9ecef;
    border-bottom: 1px solid #dee2e6;

    .editor-title {
      font-size: 14px;
      font-weight: 500;
      color: #495057;
    }

    .editor-tools {
      display: flex;
      gap: 8px;

      .tools-divider {
        width: 1px;
        height: 20px;
        background-color: #b1b1b1;
        margin: 0 4px;
        align-self: center;
      }

      .tool-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 4px;
        background-color: transparent;
        color: #6c757d;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
          color: #495057;
        }

        i {
          font-size: 14px;
        }
      }
    }
  }

  .json-editor {
    flex: 1;
    width: 100%;
    padding: 16px;
    border: none;
    background-color: #f8f9fa;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #212529;
    resize: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #adb5bd;
    }
  }

  .json-viewer-container {
    flex: 1;
    overflow: auto;
    padding: 16px;
    background-color: #f8f9fa;

    .empty-placeholder {
      color: #adb5bd;
      font-size: 14px;
      text-align: center;
      padding: 20px;
    }
  }

  :deep(.vjs-tree) {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 14px;
    line-height: 1.5;

    .vjs-tree-node {
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }

    .vjs-key {
      color: #881391;
    }

    .vjs-value {
      &.vjs-value-string {
        color: #268bd2;
      }

      &.vjs-value-number {
        color: #d33682;
      }

      &.vjs-value-boolean {
        color: #cb4b16;
      }

      &.vjs-value-null {
        color: #dc322f;
      }
    }

    .vjs-tree__brackets {
      color: #93a1a1;
    }

    .vjs-tree__comma {
      color: #93a1a1;
    }

    .vjs-tree__colon {
      color: #93a1a1;
    }
  }
}
</style>
