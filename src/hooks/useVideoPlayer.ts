import { computed, onBeforeUnmount } from 'vue';
import { videoService } from '@/components/VideoPlayer';

/**
 * 视频播放器组合式API
 * 提供视频播放器相关的状态和方法
 */
export default function useVideoPlayer() {
  // 获取音频服务中的状态
  const currentVideo = computed(() => videoService.getCurrentVideo().value);
  const visible = computed(() => videoService.getPlayerVisible().value);


  onBeforeUnmount(() => {
    // 清理视频播放器资源
    videoService.closePlayer();
  });

  return {
    currentVideo,
    visible,
  };
}
