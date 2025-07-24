<template>
  <div class="html-convert">
    <h2 class="text-xl">HTML 转义与反转义工具</h2>
    <textarea v-model="input" class="input-textarea" placeholder="请输入需要处理的 HTML 字符串"></textarea>
    <div class="btn-list-div">
      <button class="btn" @click="handleEscape">转义</button>
      <button class="btn" @click="handleUnescape">反转义</button>
      <button class="btn copy-btn" @click="copyResult">复制</button>
      <button class="btn clear-btn" @click="handleClear">清空</button>
    </div>

    <div class="result-area-div">
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { escapeHtml, unescapeHtml } from './htmlConvertUtils.ts'
import { copyToClipboard } from '@/utils/utils.ts'

const input = ref<string>('')
const result = ref<string>('')

/** HTML 转义 */
function handleEscape() {
  result.value = escapeHtml(input.value)
}

/** HTML 反转义 */
function handleUnescape() {
  result.value = unescapeHtml(input.value)
}

/** 清空输入与结果 */
function handleClear() {
  input.value = ''
  result.value = ''
}

/** 复制结果 */
async function copyResult() {
  try {
    await copyToClipboard(result.value)
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}
</script>

<style lang="scss" scoped>
.html-convert {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #22223b;
    letter-spacing: 1px;
  }

  .input-textarea {
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border: 1px solid #e0e1dd;
    border-radius: 8px;
    font-size: 1rem;
    resize: vertical;
    background: #f8f9fa;
    transition: border 0.2s;

    &:focus {
      border-color: #4f8cff;
      outline: none;
    }
  }

  .btn-list-div {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    margin-top: 20px;

    .btn {
      font-weight: 500;
      letter-spacing: 0.5px;
      align-items: center;
      background-color: lightblue;
      margin-left: 20px;
      height: 50px;
      min-width: 80px;

      &:hover {
        box-shadow: 0 4px 24px 0 rgba(172, 248, 9, 0.8);
      }
    }

    .copy-btn {
      background-color: #4f8cff;
    }

    .clear-btn {
      background-color: #c3bebe;
    }
  }

  .result-area-div {
    width: 100%;
    min-height: 150px;
    background: #f4f6fb;
    border-radius: 8px;
    padding: 1rem;
  }

}
</style>
