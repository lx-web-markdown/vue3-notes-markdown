<script setup lang="ts">
import { ref } from 'vue'

const inputText = ref('')
const outputText = ref('')

const encodeURL = () => {
  try {
    outputText.value = encodeURIComponent(inputText.value)
  } catch (error) {
    console.error('编码失败:', error)
  }
}

const decodeURL = () => {
  try {
    outputText.value = decodeURIComponent(inputText.value)
  } catch (error) {
    console.error('解码失败:', error)
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<template>
  <div class="url-encode-container">
    <h2>URL 编码/解码工具</h2>
    <div class="input-section">
      <label>输入文本：</label>
      <textarea
        v-model="inputText"
        placeholder="请输入需要编码或解码的文本"
        rows="6"
      ></textarea>
    </div>
    
    <div class="button-group">
      <button @click="encodeURL" class="btn">编码</button>
      <button @click="decodeURL" class="btn">解码</button>
      <button @click="clearAll" class="btn clear">清空</button>
    </div>

    <div class="output-section">
      <label>输出结果：</label>
      <textarea
        v-model="outputText"
        placeholder="这里显示编码或解码后的结果"
        rows="6"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.url-encode-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }

  .input-section,
  .output-section {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #2c3e50;
    }

    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.4;
      resize: vertical;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #409eff;
      }

      &::placeholder {
        color: #909399;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 20px 0;

    .btn {
      padding: 10px 24px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #409eff;
      color: white;

      &:hover {
        background-color: #66b1ff;
      }

      &.clear {
        background-color: #909399;

        &:hover {
          background-color: #a6a9ad;
        }
      }
    }
  }
}
</style>