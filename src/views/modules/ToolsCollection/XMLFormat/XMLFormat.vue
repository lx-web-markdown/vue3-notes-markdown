<template>
  <div class="xml-format">
    <div class="format-container">
      <div class="input-section">
        <div class="section-header">
          <h3>输入区域</h3>
          <el-button 
            type="success" 
            plain 
            size="small"
            @click="loadExample">
            加载示例
          </el-button>
        </div>
        <el-input
          v-model="state.inputText"
          type="textarea"
          :rows="15"
          placeholder="请输入需要格式化的XML内容..."
          @input="handleInput"
        />
      </div>

      <div class="controls">
        <el-button type="primary" @click="format" :loading="state.formatting" class="control-btn">
          格式化 <el-icon><Right /></el-icon>
        </el-button>
        <el-button @click="clear" class="control-btn">清空</el-button>
      </div>

      <div class="output-section">
        <div class="section-header">
          <h3>输出区域</h3>
        </div>
        <el-input
          v-model="state.outputText"
          type="textarea"
          :rows="15"
          readonly
          placeholder="格式化后的内容将显示在这里..."
        />
        <div class="output-actions">
          <el-button 
            type="primary" 
            @click="copy" 
            :disabled="!state.outputText">
            复制结果
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'
import { useXMLFormatter } from './useXMLFormatter'

const { state, format, clear, copy, loadExample } = useXMLFormatter()

const handleInput = () => {
  if (!state.value.inputText) {
    state.value.outputText = ''
  }
}
</script>

<style lang="scss" scoped>
.xml-format {
  padding: 20px;

  .format-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: start;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      margin: 0;
      font-size: 18px;
      color: var(--el-text-color-primary);
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    align-self: center;

    .control-btn {
      width: 120px;
      margin: 0 auto;
    }
  }

  .input-section,
  .output-section {
    width: 100%;
  }

  .output-actions {
    margin-top: 16px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  :deep(.el-textarea__inner) {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>