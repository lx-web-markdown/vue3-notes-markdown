<template>
  <Teleport to="body" v-if="showFloatingWindow">
    <div class="floating-window-overlay" @click.self="close">
      <div class="floating-window">
        <div class="video-wrapper">
          <video 
            ref="videoRef" 
            :src="videoSrc" 
            @play="isPlaying = true" 
            @pause="isPlaying = false"
            @ended="isPlaying = false" 
            controls 
            :class="{ 'local-file': isLocalFile }"
          >
            您的浏览器不支持 HTML5 视频播放
          </video>
        </div>
        <div class="close-button" @click="close">×</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue'

interface Props {
  src: string
  isLocalFile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLocalFile: false
})

const videoRef = ref<HTMLVideoElement | null>(null)
const showFloatingWindow = ref(false)
const isPlaying = ref(false)

const videoSrc = computed(() => {
  if (props.isLocalFile && props.src.startsWith('blob:')) {
    return props.src
  }
  return props.src
})

// 打开视频播放窗口
const open = () => {
  showFloatingWindow.value = true
  setTimeout(() => {
    if (videoRef.value) {
      videoRef.value.play()
    }
  }, 100)
}

// 关闭视频播放窗口
const close = () => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
  showFloatingWindow.value = false
  isPlaying.value = false
}

// 切换视频播放窗口状态
const toggle = () => {
  if (showFloatingWindow.value) {
    close()
  } else {
    open()
  }
}

// 曝光组件方法
defineExpose({
  open,
  close,
  toggle
})
</script>

<style scoped>
.video-player-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
  cursor: pointer;
}

.video-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.play-icon {
  font-size: 48px;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.video-player-container:hover .play-icon {
  opacity: 1;
}

.floating-window-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.floating-window {
  position: relative;
  width: 80vw;
  max-width: 1200px;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>