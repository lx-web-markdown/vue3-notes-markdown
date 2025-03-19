import AudioPlayerOverlay from './AudioPlayerOverlay.vue';
import { audioService } from '@/services/audioService';

export { AudioPlayerOverlay, audioService };

// 导出类型
export type { AudioInfo, PlayerStatus, PlayerSettings } from './types'; 