<script setup lang="ts">
import { ref, computed } from 'vue'

// 文本转换相关
const inputText = ref('')
const encodedText = computed(() => {
  try {
    return inputText.value ? btoa(inputText.value) : ''
  } catch (e) {
    return '无效的输入'
  }
})

const inputBase64 = ref('')
const decodedText = computed(() => {
  try {
    return inputBase64.value ? atob(inputBase64.value) : ''
  } catch (e) {
    return '无效的Base64字符串'
  }
})

// 图片转换相关
const imageFile = ref<File | null>(null)
const imageBase64 = ref('')
const previewImage = ref('')

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        imageBase64.value = e.target.result as string
        previewImage.value = URL.createObjectURL(file)
      }
    }
    reader.readAsDataURL(file)
  }
}

const base64Input = ref('')
const base64Preview = ref('')

const handleBase64ToImage = () => {
  try {
    base64Preview.value = base64Input.value
  } catch (e) {
    console.error('Invalid base64 string')
  }
}

const clearImage = () => {
  imageFile.value = null
  imageBase64.value = ''
  previewImage.value = ''
}

const clearBase64Image = () => {
  base64Input.value = ''
  base64Preview.value = ''
}
</script>

<template>
  <div class="base64-container">
    <h2>Base64 编解码工具</h2>

    <div class="section">
      <h3>文本转换</h3>
      <div class="conversion-group">
        <div class="input-group">
          <label>文本内容：</label>
          <textarea v-model="inputText" placeholder="请输入要编码的文本" />
        </div>
        <div class="input-group">
          <label>Base64 结果：</label>
          <textarea v-model="encodedText" readonly />
        </div>
      </div>

      <div class="conversion-group">
        <div class="input-group">
          <label>Base64 内容：</label>
          <textarea v-model="inputBase64" placeholder="请输入要解码的Base64字符串" />
        </div>
        <div class="input-group">
          <label>解码结果：</label>
          <textarea v-model="decodedText" readonly />
        </div>
      </div>
    </div>

    <div class="section">
      <h3>图片转换</h3>
      <div class="conversion-group">
        <div class="image-group">
          <label>图片转Base64：</label>
          <input type="file" accept="image/*" @change="handleImageUpload" />
          <button v-if="imageFile" @click="clearImage">清除</button>
          <div v-if="previewImage" class="preview">
            <img :src="previewImage" alt="预览图" />
          </div>
          <textarea v-if="imageBase64" v-model="imageBase64" readonly />
        </div>

        <div class="image-group">
          <label>Base64转图片：</label>
          <textarea v-model="base64Input" placeholder="请输入图片的Base64字符串" />
          <button @click="handleBase64ToImage">转换</button>
          <button v-if="base64Preview" @click="clearBase64Image">清除</button>
          <div v-if="base64Preview" class="preview">
            <img :src="base64Preview" alt="Base64预览图" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base64-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 20px;
      color: #666;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
  }

  .conversion-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .input-group, .image-group {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      font-weight: bold;
      color: #666;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
      font-family: monospace;

      &:read-only {
        background-color: #f5f5f5;
      }
    }
  }

  .preview {
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    
    img {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }

  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-start;

    &:hover {
      background-color: #45a049;
    }
  }

  input[type="file"] {
    padding: 10px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>