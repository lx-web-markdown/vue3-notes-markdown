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
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
import { AudioPlayerOverlay, audioService } from '@/components/AudioPlayer';
import type { PlayerSettings } from '@/components/AudioPlayer';

const { currentLocale, translate } = useLanguage();

// 播放器设置
const playerSettings: PlayerSettings = {
  autoplay: true,
  volume: 0.6,
  showVolumeControl: true,
  loop: false
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

onMounted(() => {
  // 系统初始化日志
  console.log('系统信息:', {
    语言: currentLocale.value,
    页面标题: translate('appTitle'),
    初始化时间: new Date().toLocaleString()
  });

  // 设置页面标题
  document.title = translate('appTitle') || '';
});
</script>

<style>
/* 全局样式 */
</style>
