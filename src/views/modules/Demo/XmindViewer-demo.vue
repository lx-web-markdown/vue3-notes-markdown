<template>
  <div class="xmind-view">
    <el-card class="xmind-card">
      <template #header>
        <div class="card-header">
          <span>Xmind 文件查看器</span>
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :show-file-list="false"
            accept=".xmind"
            @change="handleFileChange"
          >
            <el-button type="primary">选择Xmind文件</el-button>
          </el-upload>
        </div>
      </template>
      <div ref="viewerContainer" class="viewer"></div>
      <div v-if="!xmindFile" class="empty-state">
        请选择一个Xmind文件进行查看
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { UploadFile } from 'element-plus'
import { XMindEmbedViewer } from 'xmind-embed-viewer'

const xmindFile = ref<File | null>(null)
const viewerContainer = ref<HTMLElement | null>(null)
let viewer: XMindEmbedViewer | null = null

const handleFileChange = async (file: UploadFile) => {
  if (file.raw) {
    xmindFile.value = file.raw
    if (viewer && viewerContainer.value) {
      try {
        const arrayBuffer = await file.raw.arrayBuffer()
        await viewer.load(arrayBuffer)
      } catch (error) {
        console.error('加载xmind文件失败:', error)
      }
    }
  }
}

onMounted(() => {
  if (viewerContainer.value) {
    viewer = new XMindEmbedViewer({
      el: viewerContainer.value
    })
  }
})

onUnmounted(() => {
  viewer = null
})
</script>

<style scoped>
.xmind-view {
  padding: 20px;
}

.xmind-card {
  width: 100%;
  height: calc(100vh - 100px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.viewer {
  height: calc(100vh - 200px);
}

.empty-state {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 14px;
}
</style> 