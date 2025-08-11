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
  <VideoPlayerOverlay
    ref="videoPlayerRef"
    :video-info="videoPlayer.currentVideo.value || { videoSrc: '', author: '', title: '', duration: 0, isLocal: false }"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
import { AudioPlayerOverlay } from '@/components/AudioPlayer'; 
import { VideoPlayerOverlay, videoService } from '@/components/VideoPlayer';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import useVideoPlayer from '@/hooks/useVideoPlayer';

const { currentLocale, translate } = useLanguage();
const audioPlayer = useAudioPlayer();
const videoPlayer = useVideoPlayer();
const videoPlayerRef = ref<InstanceType<typeof VideoPlayerOverlay> | null>(null);

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
  videoService.setVideoRef(videoPlayerRef);
});

</script>

<style>
/* 全局样式 */
</style>
