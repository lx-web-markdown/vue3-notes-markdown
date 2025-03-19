import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { AudioInfo, PlayerStatus, PlayerSettings } from '../types';

/**
 * 音频播放器逻辑
 * @param initialSettings 初始播放器设置
 */
export function useAudioPlayer(initialSettings?: PlayerSettings) {
  // 默认设置
  const defaultSettings: PlayerSettings = {
    autoplay: false,
    volume: 0.7,
    showVolumeControl: true,
    loop: false
  };

  // 合并设置
  const settings = { ...defaultSettings, ...initialSettings };
  
  // 创建音频对象
  const audio = new Audio();
  
  // 音频信息
  const audioInfo = ref<AudioInfo | null>(null);
  
  // 播放状态
  const status = ref<PlayerStatus>('stopped');
  
  // 播放进度（0-1）
  const progress = ref(0);
  
  // 当前播放时间（秒）
  const currentTime = ref(0);
  
  // 音频总时长（秒）
  const duration = ref(0);
  
  // 音量（0-1）
  const volume = ref(settings.volume || 0.7);
  
  // 是否静音
  const isMuted = ref(false);
  
  // 格式化时间为 mm:ss 格式
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // 格式化后的当前时间
  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  
  // 格式化后的总时长
  const formattedDuration = computed(() => formatTime(duration.value));
  
  // 是否正在播放
  const isPlaying = computed(() => status.value === 'playing');
  
  // 设置音频源
  const setAudio = (info: AudioInfo): void => {
    // 如果当前正在播放，先停止
    if (isPlaying.value) {
      audio.pause();
    }
    
    audioInfo.value = info;
    audio.src = info.src;
    status.value = 'loading';
    
    // 设置循环播放
    audio.loop = settings.loop || false;
    
    // 加载音频
    audio.load();
    
    // 如果设置了自动播放，则加载后播放
    if (settings.autoplay) {
      play();
    }
  };
  
  // 播放音频
  const play = async (): Promise<void> => {
    try {
      if (!audioInfo.value) return;
      
      status.value = 'loading';
      await audio.play();
      status.value = 'playing';
    } catch (error) {
      console.error('播放音频失败:', error);
      status.value = 'error';
    }
  };
  
  // 暂停音频
  const pause = (): void => {
    audio.pause();
    status.value = 'paused';
  };
  
  // 停止音频（暂停并重置进度）
  const stop = (): void => {
    audio.pause();
    audio.currentTime = 0;
    status.value = 'stopped';
    progress.value = 0;
    currentTime.value = 0;
  };
  
  // 切换播放/暂停
  const togglePlay = (): void => {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
  };
  
  // 设置进度
  const seekTo = (percent: number): void => {
    if (!audio.duration) return;
    
    const newTime = audio.duration * Math.max(0, Math.min(1, percent));
    audio.currentTime = newTime;
    progress.value = percent;
    currentTime.value = newTime;
  };
  
  // 设置音量
  const setVolume = (value: number): void => {
    const newVolume = Math.max(0, Math.min(1, value));
    volume.value = newVolume;
    audio.volume = newVolume;
    
    // 如果设置音量大于0，取消静音状态
    if (newVolume > 0) {
      isMuted.value = false;
    }
  };
  
  // 切换静音状态
  const toggleMute = (): void => {
    isMuted.value = !isMuted.value;
    audio.muted = isMuted.value;
  };
  
  // 监听音频事件
  const setupAudioEvents = (): void => {
    // 音频加载完成
    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration;
    });
    
    // 播放进度更新
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        progress.value = audio.currentTime / audio.duration;
        currentTime.value = audio.currentTime;
      }
    });
    
    // 播放结束
    audio.addEventListener('ended', () => {
      if (!settings.loop) {
        status.value = 'stopped';
        progress.value = 0;
        currentTime.value = 0;
      }
    });
    
    // 音频已暂停
    audio.addEventListener('pause', () => {
      status.value = 'paused';
    });
    
    // 音频开始播放
    audio.addEventListener('play', () => {
      status.value = 'playing';
    });
    
    // 音频加载中
    audio.addEventListener('waiting', () => {
      status.value = 'loading';
    });
    
    // 音频加载错误
    audio.addEventListener('error', () => {
      status.value = 'error';
      console.error('音频加载错误');
    });
  };
  
  // 清理音频事件
  const cleanupAudioEvents = (): void => {
    audio.pause();
    audio.src = '';
  };
  
  // 监听音量变化
  watch(volume, (newVolume) => {
    audio.volume = newVolume;
  });
  
  // 初始化
  onMounted(() => {
    setupAudioEvents();
    audio.volume = volume.value;
  });
  
  // 组件卸载时清理
  onUnmounted(() => {
    cleanupAudioEvents();
  });
  
  return {
    audioInfo,
    status,
    progress,
    currentTime,
    duration,
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
  };
} 