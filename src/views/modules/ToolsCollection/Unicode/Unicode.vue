<script setup lang="ts">
import { ref } from 'vue'

const inputText = ref('')
const outputText = ref('')
const mode = ref<'toUnicode' | 'fromUnicode'>('toUnicode')

const convert = () => {
  if (mode.value === 'toUnicode') {
    outputText.value = Array.from(inputText.value)
      .map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`)
      .join('')
  } else {
    try {
      outputText.value = inputText.value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => 
        String.fromCharCode(parseInt(hex, 16))
      )
    } catch (error) {
      outputText.value = '转换失败，请检查输入格式'
    }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('复制成功！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<template>
  <div class="unicode-converter">
    <h1>Unicode 转换工具</h1>
    
    <div class="mode-selector">
      <label>
        <input
          type="radio"
          v-model="mode"
          value="toUnicode"
        > 文本转Unicode
      </label>
      <label>
        <input
          type="radio"
          v-model="mode"
          value="fromUnicode"
        > Unicode转文本
      </label>
    </div>

    <div class="converter-container">
      <div class="input-group">
        <label>输入：</label>
        <textarea
          v-model="inputText"
          :placeholder="mode === 'toUnicode' ? '请输入要转换的文本' : '请输入Unicode编码 (格式如: \\u0041)'"
          @input="convert"
        ></textarea>
        <div class="actions">
          <button @click="copyToClipboard(inputText)">复制输入</button>
          <button @click="clearAll">清空</button>
        </div>
      </div>

      <div class="input-group">
        <label>输出：</label>
        <textarea
          v-model="outputText"
          readonly
          :placeholder="mode === 'toUnicode' ? 'Unicode编码将在这里显示' : '转换后的文本将在这里显示'"
        ></textarea>
        <div class="actions">
          <button @click="copyToClipboard(outputText)">复制输出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.unicode-converter {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
  }

  .mode-selector {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      input[type="radio"] {
        cursor: pointer;
      }
    }
  }

  .converter-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: bold;
      color: #2c3e50;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      resize: vertical;
      font-family: monospace;
      
      &:focus {
        outline: none;
        border-color: #409eff;
      }

      &:read-only {
        background-color: #f8f9fa;
      }
    }
  }

  .actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #409eff;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #66b1ff;
      }

      &:active {
        background-color: #3a8ee6;
      }
    }
  }
}
</style>