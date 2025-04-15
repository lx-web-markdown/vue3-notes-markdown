<template>
  <div class="image-viewer-container" v-if="visible" @click.self="handleClose">
    <div class="image-viewer-wrapper" 
         :style="{ 
           transform: `scale(${scale}) rotate(${rotation}deg)`,
           marginBottom: isMultiple ? '160px' : '80px'
         }">
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
      </template>
    </div>

    <!-- 缩略图预览 -->
    <div class="image-viewer-thumbnails-container" v-if="isMultiple && images.length > 1">
      <button 
        class="thumbnail-scroll-button left"
        @click="scrollToStart"
        :disabled="isAtStart"
        title="滚动到开始">
        <i class="fas fa-angle-double-left"></i>
      </button>
      
      <div class="image-viewer-thumbnails" ref="thumbnailsRef">
        <img v-for="(img, index) in images"
             :key="index"
             :src="img"
             :class="['thumbnail', { active: index === currentIndex }]"
             @click="currentIndex = index">
      </div>

      <button 
        class="thumbnail-scroll-button right"
        @click="scrollToEnd"
        :disabled="isAtEnd"
        title="滚动到结束">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>

    <!-- 控制按钮 -->
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
      <button v-if="isMultiple" 
              @click="prev" 
              :disabled="currentIndex <= 0"
              title="上一张">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="isMultiple" 
              @click="next" 
              :disabled="currentIndex >= images.length - 1"
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
const thumbnailsRef = ref<HTMLDivElement>()
const isAtStart = ref(true)
const isAtEnd = ref(false)

// 监听 initialIndex 的变化
watch(() => props.initialIndex, (newIndex) => {
  currentIndex.value = newIndex
})

// 监听 visible 的变化，当关闭时重置状态
watch(() => props.visible, (newVisible) => {
  if (!newVisible) {
    scale.value = 1
    rotation.value = 0
    currentIndex.value = props.initialIndex
  }
})

// 监听当前索引变化，自动滚动缩略图
watch(currentIndex, (newIndex) => {
  if (!thumbnailsRef.value) return
  const thumbnails = thumbnailsRef.value.querySelectorAll('.thumbnail')
  const currentThumb = thumbnails[newIndex]
  if (currentThumb) {
    currentThumb.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
})

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
}

// 滚动到开始
const scrollToStart = () => {
  if (!thumbnailsRef.value) return
  thumbnailsRef.value.scrollTo({
    left: 0,
    behavior: 'smooth'
  })
}

// 滚动到结束
const scrollToEnd = () => {
  if (!thumbnailsRef.value) return
  thumbnailsRef.value.scrollTo({
    left: thumbnailsRef.value.scrollWidth - thumbnailsRef.value.clientWidth,
    behavior: 'smooth'
  })
}

// 监听滚动位置更新按钮状态
const updateScrollButtons = () => {
  if (!thumbnailsRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = thumbnailsRef.value
  isAtStart.value = scrollLeft <= 0
  isAtEnd.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth
}

// 监听缩略图容器的滚动事件
onMounted(() => {
  thumbnailsRef.value?.addEventListener('scroll', updateScrollButtons)
  // 初始化按钮状态
  updateScrollButtons()
})

onUnmounted(() => {
  thumbnailsRef.value?.removeEventListener('scroll', updateScrollButtons)
})
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
  max-height: calc(80vh - var(--margin-bottom, 0px)); /* 使用CSS变量动态计算高度 */
  object-fit: contain;
}

.image-viewer-actions {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  z-index: 10000;
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

.image-viewer-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.image-viewer-actions button:disabled:hover {
  background-color: transparent;
}

.image-viewer-thumbnails-container {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10000;
  max-width: 80vw;
}

.image-viewer-thumbnails {
  display: flex;
  gap: 8px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: center;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: calc(80vw - 100px); /* 减去两个按钮的宽度和间距 */
}

.thumbnail-scroll-button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.thumbnail-scroll-button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.7);
}

.thumbnail-scroll-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.thumbnail-scroll-button.left {
  margin-right: -5px;
}

.thumbnail-scroll-button.right {
  margin-left: -5px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
  flex-shrink: 0; /* 防止缩略图被压缩 */
}

.thumbnail.active {
  border-color: #fff;
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
</style> 