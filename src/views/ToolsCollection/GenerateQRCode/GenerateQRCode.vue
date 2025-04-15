<template>
  <div class="qr-code-container">
    <h2>二维码生成工具</h2>
    <div class="input-section">
      <el-input
        v-model="text"
        placeholder="请输入要生成二维码的内容"
        type="textarea"
        :rows="4"
        @input="updateQRCode"
      ></el-input>
      <div class="options-section">
        <el-form :inline="true">
          <el-form-item label="大小">
            <el-input-number 
              v-model="size" 
              :min="100" 
              :max="400" 
              :step="10"
              @change="updateQRCode"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="color" @change="updateQRCode"></el-color-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="qr-display" v-if="text">
      <qrcode-vue
        :value="text"
        :size="size"
        :color="color"
        level="H"
        render-as="svg"
      ></qrcode-vue>
      <el-button type="primary" @click="downloadQRCode" class="download-btn">
        下载二维码
      </el-button>
    </div>
    <div class="empty-tip" v-else>
      请输入内容生成二维码
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const text = ref('')
const size = ref(200)
const color = ref('#000000')

const updateQRCode = () => {
  // 用于触发二维码重新渲染
}

const downloadQRCode = () => {
  const svg = document.querySelector('.qr-display svg')
  if (!svg) return
  
  const serializer = new XMLSerializer()
  const source = serializer.serializeToString(svg)
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
  
  const link = document.createElement('a')
  link.download = 'qrcode.svg'
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.qr-code-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.input-section {
  margin-bottom: 30px;
}

.options-section {
  margin-top: 20px;
}

.qr-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.empty-tip {
  text-align: center;
  color: #909399;
  padding: 40px;
  background: #f5f7fa;
  border-radius: 8px;
}

.download-btn {
  margin-top: 10px;
}
</style>
