import AudioPlayerOverlay from './AudioPlayerOverlay.vue';
import { audioService, useAudioService } from '@/components/AudioPlayer/audioService';

// 导出类型
export type { AudioInfo, PlayerStatus, PlayerSettings } from './types';

// 导出组件
export { AudioPlayerOverlay, audioService, useAudioService };
