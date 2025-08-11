import { computed } from 'vue';
import { audioService } from '@/components/AudioPlayer';
import type { PlayerSettings } from '@/components/AudioPlayer';

/**
 * 音频播放器组合式API
 * 提供音频播放器相关的状态和方法
 */
export default function useAudioPlayer() {
  // 播放器设置
  const settings: PlayerSettings = {
    autoplay: true,
    volume: 0.6,
    showVolumeControl: true,
    loop: false,
  };

  // 获取音频服务中的状态
  const currentAudio = computed(() => audioService.getCurrentAudio().value);
  const visible = computed(() => audioService.getPlayerVisible().value);

  // 处理播放器关闭事件
  const handleClose = () => {
    audioService.closePlayer();
  };

  // 处理播放状态变化事件
  const handleStatusChange = (status: string) => {
    console.log('AudioPlayer 播放状态变化:', status);
  };

  // 播放音频
  const play = (audioUrl: string, title?: string, artist?: string) => {
    audioService.playAudio(audioUrl, title, artist);
  };

  // 处理MP3文件点击
  const handleMp3Click = (filePath: string) => {
    audioService.handleMp3Click(filePath);
  };

  return {
    settings,
    currentAudio,
    visible,
    handleClose,
    handleStatusChange,
    // play,
    // handleMp3Click
  };
} 