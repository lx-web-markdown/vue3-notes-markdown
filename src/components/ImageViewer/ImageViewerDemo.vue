<template>
  <div class="demo-container">
    <h2>图片预览组件示例</h2>

    <div class="demo-section">
      <h3>单图预览</h3>
      <img :src="singleImage" alt="示例图片" class="demo-img" @click="showSingle = true" />
    </div>

    <div class="demo-section">
      <h3>多图预览</h3>
      <div class="image-grid">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img"
          class="demo-img"
          @click="showMultiple(index)"
        />
      </div>
    </div>

    <!-- 单图预览组件 -->
    <ImageViewer v-model:visible="showSingle" :images="singleImage" alt="示例单图" />

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
import { ref } from 'vue';
import ImageViewer from './ImageViewer.vue';

// 示例图片数据
const singleImage = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
const images = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
  'https://images.unsplash.com/photo-1682687220198-88e9bdea9931?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687220015-186f63b8850a?w=800&auto=format&fit=crop',
];

// 控制预览器显示状态
const showSingle = ref(false);
const showMultipleViewer = ref(false);
const currentIndex = ref(0);

// 打开多图预览
const showMultiple = (index: number) => {
  currentIndex.value = index;
  showMultipleViewer.value = true;
};
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
