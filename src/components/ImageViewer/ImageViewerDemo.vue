<template>
  <div class="demo-container">
    <h2>图片预览组件示例</h2>
    
    <div class="demo-section">
      <h3>单图预览</h3>
      <img :src="singleImage" 
           alt="示例图片" 
           class="demo-img"
           @click="showSingle = true">
    </div>

    <div class="demo-section">
      <h3>多图预览</h3>
      <div class="image-grid">
        <img v-for="(img, index) in images" 
             :key="index"
             :src="img"
             class="demo-img"
             @click="showMultiple(index)">
      </div>
    </div>

    <!-- 单图预览组件 -->
    <ImageViewer
      v-model:visible="showSingle"
      :images="singleImage"
      alt="示例单图"
    />

    <!-- 多图预览组件 -->
    <ImageViewer
      v-model:visible="showMultipleViewer"
      :images="images"
      :initial-index="currentIndex"
      alt="示例图片集"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageViewer from './ImageViewer.vue'

// 示例图片数据
const singleImage = 'https://picsum.photos/800/600'
const images = [
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/600?random=2',
  'https://picsum.photos/800/600?random=3',
  'https://picsum.photos/800/600?random=4',
  'https://picsum.photos/800/600?random=5'
]

// 控制预览器显示状态
const showSingle = ref(false)
const showMultipleViewer = ref(false)
const currentIndex = ref(0)

// 打开多图预览
const showMultiple = (index: number) => {
  currentIndex.value = index
  showMultipleViewer.value = true
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s;
}

.demo-img:hover {
  transform: scale(1.05);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

h2 {
  margin-bottom: 30px;
  color: #333;
}

h3 {
  margin-bottom: 15px;
  color: #666;
}
</style> 