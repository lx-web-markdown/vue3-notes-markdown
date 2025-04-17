<template>
  <div class="xmind-viewer-container">
    <div v-if="loading" class="loading">
      <el-loading :fullscreen="true" text="正在加载xmind文件..." />
    </div>
    <div ref="xmindContainer" class="xmind-content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
// @ts-ignore
import { XMindViewer } from 'xmind-viewer'
import 'xmind-viewer/dist/style.css'

const props = defineProps<{
  file: File | string // 可以是File对象或文件URL
}>()

const loading = ref(false)
const xmindContainer = ref<HTMLElement | null>(null)
let viewer: any = null

const loadXmindFile = async () => {
  if (!xmindContainer.value) return
  
  loading.value = true
  try {
    if (!viewer) {
      viewer = new XMindViewer({
        el: xmindContainer.value,
        theme: 'default'
      })
    }

    if (typeof props.file === 'string') {
      // 如果是URL，直接加载
      await viewer.load(props.file)
    } else {
      // 如果是File对象，需要读取文件内容
      const arrayBuffer = await props.file.arrayBuffer()
      await viewer.load(arrayBuffer)
    }
  } catch (error) {
    console.error('加载xmind文件失败:', error)
    ElMessage.error('加载xmind文件失败')
  } finally {
    loading.value = false
  }
}

watch(() => props.file, () => {
  loadXmindFile()
})

onMounted(() => {
  loadXmindFile()
})
</script>

<style scoped>
.xmind-viewer-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
}

.xmind-content {
  width: 100%;
  height: 100%;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 