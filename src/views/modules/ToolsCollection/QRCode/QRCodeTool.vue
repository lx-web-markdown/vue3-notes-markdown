<template>
  <div class="qr-code-tool-container">
    <h2>二维码工具</h2>
    
    <el-tabs type="border-card">
      <!-- 二维码生成部分 -->
      <el-tab-pane label="生成二维码">
        <div class="qr-code-container">
          <div class="input-section">
            <el-input
              v-model="text"
              placeholder="请输入要生成二维码的内容"
              type="textarea"
              :rows="4"
            ></el-input>
            <div class="options-section">
              <el-form :inline="true">
                <el-form-item label="大小">
                  <el-input-number 
                    v-model="size" 
                    :min="100" 
                    :max="600" 
                    :step="10"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="前景色">
                  <el-color-picker 
                    v-model="foregroundColor" 
                    show-alpha
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="背景色">
                  <el-color-picker 
                    v-model="backgroundColor" 
                    show-alpha
                  ></el-color-picker>
                </el-form-item>
              </el-form>

              <!-- 中心图标设置 -->
              <div class="logo-section">
                <div class="logo-title">
                  <span>中心图标</span>
                  <el-switch v-model="showLogo" @change="updateQRCode" />
                </div>
                <div v-if="showLogo" class="logo-options">
                  <el-upload
                    class="logo-upload"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    accept="image/*"
                    :on-change="handleLogoUpload"
                  >
                    <div class="logo-upload-area">
                      <img v-if="logoUrl" :src="logoUrl" class="logo-preview" />
                      <el-icon v-else><plus /></el-icon>
                      <span>点击上传图标</span>
                    </div>
                  </el-upload>
                  <div class="logo-settings">
                    <el-form :inline="true" size="small">
                      <el-form-item label="大小">
                        <el-slider
                          v-model="logoSize"
                          :min="10"
                          :max="30"
                          @change="updateQRCode"
                        />
                      </el-form-item>
                      <el-form-item label="圆角">
                        <el-switch
                          v-model="logoRounded"
                          @change="updateQRCode"
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>

              <!-- 预设颜色方案 -->
              <div class="color-presets">
                <span class="preset-label">预设方案：</span>
                <el-button-group>
                  <el-button 
                    size="small"
                    @click="applyColorPreset('classic')"
                    :class="{ active: currentPreset === 'classic' }"
                  >
                    经典黑白
                  </el-button>
                  <el-button 
                    size="small"
                    @click="applyColorPreset('blue')"
                    :class="{ active: currentPreset === 'blue' }"
                  >
                    蓝色商务
                  </el-button>
                  <el-button 
                    size="small"
                    @click="applyColorPreset('green')"
                    :class="{ active: currentPreset === 'green' }"
                  >
                    清新绿意
                  </el-button>
                  <el-button 
                    size="small"
                    @click="applyColorPreset('elegant')"
                    :class="{ active: currentPreset === 'elegant' }"
                  >
                    优雅金色
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </div>
          <div class="qr-display" v-if="text">
            <canvas ref="qrCodeRef" :width="size" :height="size"></canvas>
            <div class="download-options">
              <el-button-group>
                <el-button type="primary" @click="downloadQRCode('png')">
                  下载PNG
                </el-button>
                <el-button type="primary" @click="downloadQRCode('jpg')">
                  下载JPG
                </el-button>
              </el-button-group>
            </div>
          </div>
          <div class="empty-tip" v-else>
            请输入内容生成二维码
          </div>
        </div>
      </el-tab-pane>

      <!-- 二维码解析部分 -->
      <el-tab-pane label="解析二维码">
        <div class="qr-scanner-container">
          <!-- 隐藏的canvas用于处理图片 -->
          <canvas ref="canvasRef" style="display: none;"></canvas>
          
          <div class="upload-section">
            <!-- 拖拽上传区域 -->
            <el-upload
              class="upload-drag-box"
              drag
              action=""
              :auto-upload="false"
              :show-file-list="false"
              accept="image/*"
              :on-change="handleDragUpload"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将二维码图片拖到此处，或 <em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  支持 jpg/png/gif/bmp/webp 格式图片
                </div>
              </template>
            </el-upload>

            <!-- 分割线 -->
            <div class="divider">
              <span>或</span>
            </div>

            <!-- 按钮上传 -->
            <el-upload
              class="upload-button-box"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              accept="image/*"
              :on-change="handleButtonUpload"
            >
              <el-button type="primary">
                <el-icon><upload-filled /></el-icon>
                <span>点击上传二维码图片</span>
              </el-button>
            </el-upload>
          </div>

          <!-- 结果显示部分 -->
          <div class="result-section" v-if="scanResult">
            <h3>扫描结果：</h3>
            <div class="result-content">
              <p>{{ scanResult }}</p>
              <el-button type="primary" size="small" @click="copyResult">
                复制结果
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import { ElMessage } from 'element-plus'
import { UploadFilled, Plus } from '@element-plus/icons-vue'

// 二维码样式相关
const text = ref('')
const size = ref(200)
const foregroundColor = ref('#000000')
const backgroundColor = ref('#FFFFFF')
const currentPreset = ref('classic')
const qrCodeRef = ref<HTMLCanvasElement | null>(null)

// 中心图标相关
const showLogo = ref(false)
const logoUrl = ref('')
const logoSize = ref(20)
const logoRounded = ref(true)
const logoImage = ref<HTMLImageElement | null>(null)

// 更新二维码
const updateQRCode = async () => {
  if (!text.value || !qrCodeRef.value) return

  const canvas = qrCodeRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  try {
    // 清空画布
    ctx.fillStyle = backgroundColor.value
    ctx.fillRect(0, 0, size.value, size.value)

    // 生成二维码
    await QRCode.toCanvas(canvas, text.value, {
      width: size.value,
      margin: 0,
      color: {
        dark: foregroundColor.value,
        light: backgroundColor.value
      }
    })

    // 如果有图标且开启了显示，绘制图标
    if (showLogo.value && logoImage.value) {
      const logoWidth = (size.value * logoSize.value) / 100
      const logoHeight = logoWidth
      const logoX = (size.value - logoWidth) / 2
      const logoY = (size.value - logoHeight) / 2

      // 创建临时 canvas 用于绘制圆形图标
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = logoWidth
      tempCanvas.height = logoHeight
      const tempCtx = tempCanvas.getContext('2d')
      
      if (tempCtx) {
        // 清除临时画布
        tempCtx.clearRect(0, 0, logoWidth, logoHeight)
        
        if (logoRounded.value) {
          // 绘制圆形裁剪路径
          tempCtx.beginPath()
          tempCtx.arc(
            logoWidth / 2,
            logoHeight / 2,
            logoWidth / 2,
            0,
            Math.PI * 2
          )
          tempCtx.closePath()
          tempCtx.clip()
        }

        // 在临时画布上绘制图标
        tempCtx.drawImage(logoImage.value, 0, 0, logoWidth, logoHeight)

        // 将临时画布的内容绘制到主画布上
        ctx.drawImage(tempCanvas, logoX, logoY)
      }
    }
  } catch (error) {
    console.error('生成二维码失败:', error)
    ElMessage.error('生成二维码失败，请重试')
  }
}

// 修改下载函数
const downloadQRCode = (format: 'png' | 'jpg') => {
  const canvas = qrCodeRef.value
  if (!canvas) {
    ElMessage.error('二维码生成失败')
    return
  }

  try {
    // 如果是JPG格式，需要创建新的canvas并填充白色背景
    let dataUrl: string
    if (format === 'jpg') {
      const exportCanvas = document.createElement('canvas')
      exportCanvas.width = canvas.width
      exportCanvas.height = canvas.height
      const ctx = exportCanvas.getContext('2d')!
      
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvas, 0, 0)
      
      dataUrl = exportCanvas.toDataURL('image/jpeg', 1.0)
    } else {
      dataUrl = canvas.toDataURL('image/png')
    }
    
    const link = document.createElement('a')
    const timestamp = new Date().getTime()
    link.download = `qrcode_${timestamp}.${format}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    ElMessage.success('下载成功')
  } catch (error) {
    console.error('下载错误:', error)
    ElMessage.error('下载失败，请重试')
  }
}

// 监听相关属性变化，自动更新二维码
watch([text, size, foregroundColor, backgroundColor, showLogo, logoSize, logoRounded], () => {
  nextTick(() => {
    updateQRCode()
  })
})

// 组件挂载后初始化
onMounted(() => {
  updateQRCode()
})

// 处理图标上传
const handleLogoUpload = (file: any) => {
  if (!file || !file.raw) {
    ElMessage.error('请选择要上传的图片')
    return
  }

  // 检查文件类型
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const fileType = file.raw.type || ''
  
  if (!validImageTypes.includes(fileType)) {
    ElMessage.error('请上传正确的图片格式（JPG、PNG、GIF、WEBP）')
    return
  }

  // 检查文件大小（200KB）
  if (file.raw.size > 200 * 1024) {
    ElMessage.error('图片大小不能超过200KB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!e.target?.result) {
      ElMessage.error('图片读取失败')
      return
    }

    // 预加载图片以确保在绘制二维码时可用
    const img = new Image()
    img.onload = () => {
      logoImage.value = img
      logoUrl.value = e.target!.result as string
      updateQRCode()
    }
    img.onerror = () => {
      ElMessage.error('图片加载失败')
    }
    img.src = e.target.result as string
  }
  reader.onerror = () => {
    ElMessage.error('文件读取失败')
  }
  reader.readAsDataURL(file.raw)
}

// 解析二维码相关
const canvasRef = ref<HTMLCanvasElement | null>(null)
const scanResult = ref('')

// 处理拖拽上传
const handleDragUpload = (file: any) => {
  // 检查文件是否存在
  if (!file || !file.raw) {
    ElMessage.error('请选择要上传的文件')
    return
  }

  // 检查文件类型
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
  const fileType = file.raw.type || ''
  
  if (!validImageTypes.includes(fileType)) {
    ElMessage.error('请上传正确的图片格式（JPG、PNG、GIF、BMP、WEBP）')
    return
  }

  processQRCode(file.raw)
}

// 处理按钮上传
const handleButtonUpload = (file: any) => {
  // 检查文件是否存在
  if (!file || !file.raw) {
    ElMessage.error('请选择要上传的文件')
    return
  }

  // 检查文件类型
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
  const fileType = file.raw.type || ''
  
  if (!validImageTypes.includes(fileType)) {
    ElMessage.error('请上传正确的图片格式（JPG、PNG、GIF、BMP、WEBP）')
    return
  }

  processQRCode(file.raw)
}

// 处理二维码识别
const processQRCode = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    if (!e.target?.result) {
      ElMessage.error('文件读取失败')
      return
    }

    const img = new Image()
    img.onload = () => {
      if (!canvasRef.value) {
        ElMessage.error('Canvas初始化失败')
        return
      }

      const canvas = canvasRef.value
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      
      if (!ctx) {
        ElMessage.error('浏览器不支持Canvas，无法处理图片')
        return
      }

      // 尝试多种处理方式
      const tryDecode = (imageData: ImageData) => {
        // 1. 直接尝试解码
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth"
        })
        if (code) return code

        // 2. 尝试增强对比度后解码
        const enhancedData = new Uint8ClampedArray(imageData.data)
        for (let i = 0; i < enhancedData.length; i += 4) {
          // 转换为灰度
          const avg = (enhancedData[i] + enhancedData[i + 1] + enhancedData[i + 2]) / 3
          // 增强对比度
          const value = avg < 128 ? 0 : 255
          enhancedData[i] = enhancedData[i + 1] = enhancedData[i + 2] = value
          enhancedData[i + 3] = 255 // alpha通道
        }
        
        const enhancedImageData = new ImageData(enhancedData, imageData.width, imageData.height)
        return jsQR(enhancedImageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth"
        })
      }

      const processImage = (sourceCanvas: HTMLCanvasElement) => {
        const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height)
        return tryDecode(imageData)
      }

      // 尝试不同的图片尺寸
      const tryDifferentSizes = () => {
        // 1. 原始尺寸
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        let code = processImage(canvas)
        if (code) return code

        // 2. 固定尺寸（400x400）
        canvas.width = 400
        canvas.height = 400
        ctx.drawImage(img, 0, 0, 400, 400)
        code = processImage(canvas)
        if (code) return code

        // 3. 放大尺寸（800x800）
        canvas.width = 800
        canvas.height = 800
        ctx.drawImage(img, 0, 0, 800, 800)
        code = processImage(canvas)
        if (code) return code

        return null
      }

      try {
        const code = tryDifferentSizes()
        
        if (code) {
          scanResult.value = code.data
          ElMessage.success('二维码解析成功')
        } else {
          ElMessage.error('未能识别二维码，请确保：\n1. 图片清晰\n2. 二维码完整\n3. 光线充足\n4. 二维码在图片中位置正确')
        }
      } catch (error) {
        console.error('二维码解析错误:', error)
        ElMessage.error('二维码解析出错，请尝试使用其他图片')
      }
    }

    img.onerror = () => {
      ElMessage.error('图片加载失败，请确保图片格式正确')
    }
    img.src = e.target.result as string
  }

  reader.onerror = () => {
    ElMessage.error('文件读取失败，请重试')
  }
  reader.readAsDataURL(file)
}

// 复制结果
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(scanResult.value)
    ElMessage.success('复制成功')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

// 颜色预设方案
const colorPresets = {
  classic: {
    foreground: '#000000',
    background: '#FFFFFF'
  },
  blue: {
    foreground: '#0066CC',
    background: '#F0F7FF'
  },
  green: {
    foreground: '#00796B',
    background: '#E0F2F1'
  },
  elegant: {
    foreground: '#8B7355',
    background: '#FFF8DC'
  }
}

// 应用颜色预设
const applyColorPreset = (preset: keyof typeof colorPresets) => {
  const colors = colorPresets[preset]
  foregroundColor.value = colors.foreground
  backgroundColor.value = colors.background
  currentPreset.value = preset
}
</script>

<style scoped>
.qr-code-tool-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

/* 生成二维码样式 */
.qr-code-container {
  padding: 20px;
}

.input-section {
  margin-bottom: 30px;
}

.options-section {
  margin-top: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 8px;
}

.options-section :deep(.el-form--inline .el-form-item) {
  margin-right: 20px;
}

.qr-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
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

.download-options {
  margin-top: 15px;
}

.qr-scanner-container {
  padding: 20px;
}

.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.upload-drag-box {
  width: 100%;
}

.upload-button-box {
  text-align: center;
}

.divider {
  position: relative;
  text-align: center;
  width: 100%;
  height: 20px;
  margin: 10px 0;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 30px);
  height: 1px;
  background-color: #dcdfe6;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  display: inline-block;
  padding: 0 10px;
  color: #909399;
  background-color: #fff;
}

:deep(.el-upload-dragger) {
  width: 100%;
}

:deep(.el-upload__tip) {
  margin-top: 10px;
  color: #909399;
}

.result-section {
  margin-top: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.result-content {
  display: flex;
  align-items: center;
  gap: 10px;
  word-break: break-all;
}

.result-content p {
  flex: 1;
  margin: 0;
}

.color-presets {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.preset-label {
  color: #606266;
  font-size: 14px;
}

.el-button-group .el-button.active {
  background-color: #409EFF;
  border-color: #409EFF;
  color: white;
}

.logo-section {
  margin-top: 15px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.logo-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.logo-options {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.logo-upload {
  flex-shrink: 0;
}

.logo-upload-area {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
}

.logo-upload-area:hover {
  border-color: #409EFF;
}

.logo-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-settings {
  flex-grow: 1;
}

.logo-settings :deep(.el-form-item) {
  margin-bottom: 10px;
}

.logo-settings :deep(.el-slider) {
  width: 200px;
}
</style> 