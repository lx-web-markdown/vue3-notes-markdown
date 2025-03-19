<!--
  音频播放器浮层组件
  
  一个透明的浮层音频播放器，支持本地和远程MP3文件
  可以显示播放控制、进度条和音量控制
-->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAudioPlayer } from './composables/useAudioPlayer';
import type { AudioInfo, PlayerSettings } from './types';

// 定义组件属性
const props = defineProps<{
  // 是否显示播放器
  visible: boolean;
  // 音频信息
  audioInfo?: AudioInfo | null;
  // 播放器设置
  settings?: PlayerSettings;
}>();

// 定义组件事件
const emit = defineEmits<{
  // 关闭播放器事件
  (e: 'close'): void;
  // 播放状态变化事件
  (e: 'statusChange', status: string): void;
}>();

// 使用音频播放器Hook
const {
  audioInfo: currentAudio,
  status,
  progress,
  volume,
  isMuted,
  isPlaying,
  formattedCurrentTime,
  formattedDuration,
  setAudio,
  play,
  pause,
  stop,
  togglePlay,
  seekTo,
  setVolume,
  toggleMute
} = useAudioPlayer(props.settings);

// 是否最小化
const isMinimized = ref(false);

// 播放器可见性
const isVisible = ref(props.visible);

// 显示的音频标题
const displayTitle = computed(() => {
  return currentAudio.value?.title || '未知音频';
});

// 显示的艺术家
const displayArtist = computed(() => {
  return currentAudio.value?.artist || '';
});

// 音量百分比
const volumePercent = computed(() => {
  return `${volume.value * 100}%`;
});

// 进度条百分比
const progressPercent = computed(() => {
  return `${progress.value * 100}%`;
});

// 音量图标
const volumeIcon = computed(() => {
  if (isMuted.value || volume.value === 0) {
    return '🔇';
  } else if (volume.value < 0.5) {
    return '🔉';
  } else {
    return '🔊';
  }
});

// 播放/暂停图标
const playPauseIcon = computed(() => {
  return isPlaying.value ? '⏸️' : '▶️';
});

// 监听音频信息变化
watch(() => props.audioInfo, (newInfo) => {
  if (newInfo) {
    setAudio(newInfo);
    isVisible.value = true;
  }
}, { deep: true });

// 监听可见性变化
watch(() => props.visible, (newValue) => {
  isVisible.value = newValue;
  if (!newValue) {
    // 如果隐藏播放器，则停止播放
    stop();
  }
});

// 监听播放状态变化
watch(status, (newStatus) => {
  emit('statusChange', newStatus);
});

// 关闭播放器
const closePlayer = () => {
  isVisible.value = false;
  stop();
  emit('close');
};

// 切换最小化状态
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

// 处理进度条点击
const handleProgressClick = (event: MouseEvent) => {
  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = offsetX / rect.width;
  seekTo(percent);
};

// 处理音量滑块点击
const handleVolumeClick = (event: MouseEvent) => {
  const volumeBar = event.currentTarget as HTMLElement;
  const rect = volumeBar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = offsetX / rect.width;
  setVolume(percent);
};
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="isVisible" 
      class="audio-player-overlay" 
      :class="{ 'minimized': isMinimized }"
    >
      <!-- 播放器头部 -->
      <div class="player-header">
        <div class="audio-info">
          <p class="audio-title">{{ displayTitle }}</p>
          <p v-if="displayArtist" class="audio-artist">{{ displayArtist }}</p>
        </div>
        <div>
          <button 
            v-if="!isMinimized" 
            class="close-button" 
            @click="toggleMinimize"
            title="最小化"
          >
            ⬇️
          </button>
          <button 
            v-else 
            class="close-button" 
            @click="toggleMinimize"
            title="展开"
          >
            ⬆️
          </button>
          <button 
            class="close-button" 
            @click="closePlayer"
            title="关闭"
          >
            ❌
          </button>
        </div>
      </div>
      
      <!-- 播放器控制区域 -->
      <template v-if="!isMinimized">
        <div class="player-controls">
          <button class="control-button" title="上一首" disabled>
            ⏮️
          </button>
          <button class="control-button play-pause" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
            {{ playPauseIcon }}
          </button>
          <button class="control-button" title="下一首" disabled>
            ⏭️
          </button>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar" @click="handleProgressClick">
            <div class="progress-fill" :style="{ width: progressPercent }"></div>
          </div>
          <div class="time-display">
            <span>{{ formattedCurrentTime }}</span>
            <span>{{ formattedDuration }}</span>
          </div>
        </div>
        
        <!-- 音量控制 -->
        <div class="volume-container">
          <span class="volume-icon" @click="toggleMute" :title="isMuted ? '取消静音' : '静音'">
            {{ volumeIcon }}
          </span>
          <div class="volume-slider" @click="handleVolumeClick">
            <div class="volume-fill" :style="{ width: volumePercent }"></div>
          </div>
        </div>
      </template>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import './style.scss';
</style> 