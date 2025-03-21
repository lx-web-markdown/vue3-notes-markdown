<template>
  <router-view />

  <!-- 音频播放器浮层 -->
  <AudioPlayerOverlay
    :visible="playerVisible"
    :audio-info="currentAudio"
    :settings="playerSettings"
    @close="handlePlayerClose"
    @status-change="handleStatusChange"
  />

  <!-- 视频播放器浮层 -->
  <VideoPlayerOverlay
    ref="videoPlayerRef"
    :src="videoUrl"
    :isLocalFile="isLocalVideo"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, onBeforeUnmount } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
import { AudioPlayerOverlay, audioService } from '@/components/AudioPlayer';
import { VideoPlayerOverlay, videoService, type VideoPlayerInstance } from '@/components/VideoPlayer';
import type { PlayerSettings } from '@/components/AudioPlayer';

const { currentLocale, translate } = useLanguage();

// 播放器设置
const playerSettings: PlayerSettings = {
  autoplay: true,
  volume: 0.6,
  showVolumeControl: true,
  loop: false,
};

// 获取音频服务中的状态
const currentAudio = computed(() => audioService.getCurrentAudio().value);
const playerVisible = computed(() => audioService.getPlayerVisible().value);

// 处理播放器关闭事件
const handlePlayerClose = () => {
  audioService.closePlayer();
};

// 处理播放状态变化事件
const handleStatusChange = (status: string) => {
  console.log('播放状态变化:', status);
};

// 视频播放器相关
const videoPlayerRef = ref<VideoPlayerInstance | null>(null);
const videoUrl = ref('');
const isLocalVideo = ref(false);

// 设置视频URL
const setVideoSource = (url: string, isLocal: boolean = false) => {
  videoUrl.value = url;
  isLocalVideo.value = isLocal;
};

// 示例：播放视频
const playVideo = (url: string, isLocal: boolean = false) => {
  setVideoSource(url, isLocal);
  videoService.playVideo();
};

onMounted(() => {
  // 系统初始化日志
  console.log('系统信息:', {
    语言: currentLocale.value,
    页面标题: translate('appTitle'),
    初始化时间: new Date().toLocaleString(),
  });

  // 设置页面标题
  document.title = translate('appTitle') || '';
  
  // 初始化videoService
  videoService.setVideoRef(videoPlayerRef);
});

onBeforeUnmount(() => {
  // 清理视频播放器资源
  videoService.pauseVideo();
});

// 导出视频播放控制方法
defineExpose({
  playVideo,
  pauseVideo: videoService.pauseVideo,
  toggleVideo: videoService.toggleVideo,
  setVideoVolume: videoService.setVideoVolume,
  muteVideo: videoService.muteVideo,
  seekVideo: videoService.seekVideo
});
</script>

<style>
/* 全局样式 */
</style>
