<template>
  <Teleport to="body" v-if="cur_showFloatingWindow">
    <div class="floating-window-overlay" @click.self="closeVideo">
      <div class="floating-window">
        <div class="video-wrapper">
          <video
            ref="cur_videoRef"
            :src="cur_videoSrc"
            @play="cur_isPlaying = true"
            @pause="cur_isPlaying = false"
            @ended="cur_isPlaying = false"
            controls
          >
            您的浏览器不支持 HTML5 视频播放
          </video>
        </div>
        <div class="close-button" @click="closeVideo">×</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useVideoPlayerOverlay } from './composables/useVideoPlayer';
import type { VideoPlayerOverlayProps } from './types';
// import type { VideoInfo } from './types';

interface Props extends VideoPlayerOverlayProps {}

const props = withDefaults(defineProps<Props>(), {
  videoInfo: () => ({
    videoSrc: '',
    author: '',
    title: '',
    duration: 0,
    isLocal: false,
  }),
});

const { cur_videoRef, cur_showFloatingWindow, cur_isPlaying, cur_videoSrc, openVideo, closeVideo, toggleVideo } =
  useVideoPlayerOverlay(props);

// 曝光组件方法
defineExpose({
  openVideo,
  closeVideo,
  toggleVideo,
});
</script>

<style scoped lang="scss">
/* 组件特定的样式可以放在这里，但大部分样式已移至 style.scss */
@use './style.scss';
</style>
