<template>
  <router-view />

  <!-- 音频播放器浮层 -->
  <AudioPlayerOverlay
    :visible="audioPlayer.visible.value"
    :audio-info="audioPlayer.currentAudio.value"
    :settings="audioPlayer.settings"
    @close="audioPlayer.handleClose"
    @status-change="audioPlayer.handleStatusChange"
  />

  <!-- 视频播放器浮层 -->
  <!-- <VideoPlayerOverlay
    ref="videoPlayerRef"
    :src="videoPlayer.url.value"
  /> -->

  <VideoPlayerOverlay
    :visible="videoPlayer.visible.value"
    :video-info="videoPlayer.currentVideo.value"
    @close="videoPlayer.handleClose"
    @status-change="videoPlayer.handleStatusChange"
  />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
import { AudioPlayerOverlay } from '@/components/AudioPlayer'; 
import { VideoPlayerOverlay, type VideoPlayerInstance } from '@/components/VideoPlayer';
import useAudioPlayer from '@/app/composables/useAudioPlayer';
import useVideoPlayer from '@/app/composables/useVideoPlayer';

const { currentLocale, translate } = useLanguage();
const audioPlayer = useAudioPlayer();
const videoPlayer = useVideoPlayer();
const videoPlayerRef = ref<VideoPlayerInstance | null>(null);

onMounted(() => {
  // 系统初始化日志
  console.log('系统信息:', {
    语言: currentLocale.value,
    页面标题: translate('appTitle'),
    初始化时间: new Date().toLocaleString(),
  });

  // 设置页面标题
  document.title = translate('appTitle') || '';

  // 设置视频播放器引用
  videoPlayer.setPlayerRef(videoPlayerRef);
});

onBeforeUnmount(() => {
  // 清理视频播放器资源
  videoPlayer.pause();
});
</script>

<style>
/* 全局样式 */
</style>
