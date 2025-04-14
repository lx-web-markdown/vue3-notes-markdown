<template>
  <div class="image-viewer-container" v-if="visible" @click.self="handleClose">
    <div class="image-viewer-wrapper" 
         :style="{ transform: `scale(${scale}) rotate(${rotation}deg)` }">
      <!-- 单图模式 -->
      <img v-if="!isMultiple" 
           :src="currentImage" 
           :alt="alt"
           class="image-viewer-img"
           @mousewheel="handleMouseWheel"
           @dragstart.prevent>
      
      <!-- 多图模式 -->
      <template v-else>
        <img :src="currentImage" 
             :alt="alt"
             class="image-viewer-img"
             @mousewheel="handleMouseWheel"
             @dragstart.prevent>
        <div class="image-viewer-thumbnails" v-if="images.length > 1">
          <img v-for="(img, index) in images"
               :key="index"
               :src="img"
               :class="['thumbnail', { active: index === currentIndex }]"
               @click="currentIndex = index">
        </div>
      </template>
    </div>

    <!-- 控制按钮 - 移到wrapper外部 -->
    <div class="image-viewer-actions">
      <button @click="zoomOut" title="缩小">
        <i class="fas fa-search-minus"></i>
      </button>
      <button @click="zoomIn" title="放大">
        <i class="fas fa-search-plus"></i>
      </button>
      <button @click="rotateLeft" title="向左旋转">
        <i class="fas fa-undo"></i>
      </button>
      <button @click="rotateRight" title="向右旋转">
        <i class="fas fa-redo"></i>
      </button>
      <button v-if="isMultiple && currentIndex > 0" 
              @click="prev" 
              title="上一张">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="isMultiple && currentIndex < images.length - 1" 
              @click="next" 
              title="下一张">
        <i class="fas fa-chevron-right"></i>
      </button>
      <button @click="handleClose" title="关闭">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  visible: boolean
  images?: string | string[]
  alt?: string
  initialIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  images: () => [],
  alt: '',
  initialIndex: 0
})

const emit = defineEmits(['update:visible'])

// 状态管理
const scale = ref(1)
const rotation = ref(0)
const currentIndex = ref(props.initialIndex)

// 计算属性
const isMultiple = computed(() => Array.isArray(props.images) && props.images.length > 0)
const currentImage = computed(() => {
  if (typeof props.images === 'string') return props.images
  return Array.isArray(props.images) ? props.images[currentIndex.value] : ''
})

// 方法
const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.1)
}

const rotateLeft = () => {
  rotation.value -= 90
}

const rotateRight = () => {
  rotation.value += 90
}

const handleMouseWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (Array.isArray(props.images) && currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

const handleClose = () => {
  emit('update:visible', false)
  // 重置状态
  scale.value = 1
  rotation.value = 0
  currentIndex.value = props.initialIndex
}
</script>

<style scoped>
.image-viewer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.image-viewer-wrapper {
  position: relative;
  transition: transform 0.3s ease;
}

.image-viewer-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
}

.image-viewer-actions {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  z-index: 10000; /* 确保控制按钮始终在最上层 */
}

.image-viewer-actions button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.image-viewer-actions button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.image-viewer-thumbnails {
  position: fixed;
  bottom: 100px; /* 调整缩略图位置，避免与控制按钮重叠 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  z-index: 10000;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
}

.thumbnail.active {
  border-color: #fff;
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
</style> 