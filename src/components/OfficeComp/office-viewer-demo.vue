<template>
  <div class="office-viewer-demo">
    <h2>文件预览组件示例</h2>

    <div class="file-type-selector">
      <el-radio-group v-model="selectedFileType">
        <el-radio-button value="docx">Word 文档</el-radio-button>
        <el-radio-button value="xlsx">Excel 文档</el-radio-button>
        <el-radio-button value="pdf">PDF 文档</el-radio-button>
        <el-radio-button value="pptx">PPT 文档</el-radio-button>
      </el-radio-group>
    </div>

    <div class="preview-container">
      <OfficeComp :url="fileUrl" :filetype="selectedFileType" />
    </div>

    <div class="code-example">
      <h3>使用示例：</h3>
      <pre><code>
&lt;template&gt;
  &lt;OfficeComp 
    :url="fileUrl" 
    :filetype="fileType" 
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import OfficeComp from '@/components/OfficeComp/OfficeComp.vue'

const fileUrl = '您的文件URL'
const fileType = 'docx' // 支持 docx, xlsx, xls, pdf, pptx, ppt
&lt;/script&gt;
      </code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import OfficeComp from '@/components/OfficeComp/OfficeComp.vue';

const selectedFileType = ref('docx');

// 根据选择的文件类型设置对应的示例文件 URL
const fileUrl = computed(() => {
  switch (selectedFileType.value) {
    case 'docx':
      return '/AllFiles/所有文件类型/互联网信息服务备案登记表.dotx';
    case 'xlsx':
      return '/AllFiles/所有文件类型/2023年度套餐方案.xlsx';
    case 'pdf':
      return '/AllFiles/所有文件类型/手写签名文档.pdf';
    case 'pptx':
      return '/AllFiles/所有文件类型/我的PPT.pptx';
    default:
      return '';
  }
});
</script>

<style lang="scss" scoped>
.office-viewer-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #303133;
  }

  .file-type-selector {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }

  .preview-container {
    width: 100%;
    height: 600px;
    margin-bottom: 30px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: auto;
  }

  .code-example {
    background-color: #f5f7fa;
    padding: 20px;
    border-radius: 8px;

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #303133;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;

      code {
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        color: #606266;
      }
    }
  }
}
</style>
