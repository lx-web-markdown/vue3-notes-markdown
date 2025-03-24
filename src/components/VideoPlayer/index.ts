/**
 * VideoPlayer模块导出文件
 * 提供视频播放器组件和视频控制服务
 */
import VideoPlayerOverlay from './VideoPlayerOverlay.vue';
import { videoService } from './videoService';
import type { VideoInfo } from './types';

export {
  VideoPlayerOverlay,
  videoService,
};

// 导出类型
export type { VideoInfo };

// 默认导出
export default VideoPlayerOverlay; 