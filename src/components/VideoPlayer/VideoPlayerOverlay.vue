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
import { defineExpose } from 'vue';
import { useVideoPlayerOverlay, type VideoPlayerOverlayProps } from './composables/useVideoPlayer';

interface Props extends VideoPlayerOverlayProps {}

const props = withDefaults(defineProps<Props>(), {
  src: '',
});

const { videoRef, showFloatingWindow, isPlaying, videoSrc, open, close, toggle } =
  useVideoPlayerOverlay(props);

// 曝光组件方法
defineExpose({
  open,
  close,
  toggle,
});
</script>

<style scoped lang="scss">
/* 组件特定的样式可以放在这里，但大部分样式已移至 style.scss */
@use './style.scss';
</style>
