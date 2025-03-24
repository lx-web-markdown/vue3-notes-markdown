import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { videoService } from '@/components/VideoPlayer';
import type { VideoInfo } from '@/components/VideoPlayer/types';

/**
 * 视频播放器组合式API
 * 提供视频播放器相关的状态和方法
 */
export default function useVideoPlayer() {
  // 视频播放器相关
  const playerRef = ref<HTMLVideoElement | null>(null);

  // 获取音频服务中的状态
  const currentVideo = computed(() => videoService.getCurrentVideo().value);
  const visible = computed(() => videoService.getPlayerVisible().value);

  // 设置视频URL
  const setSource = (videoUrl: string, isLocalFile: boolean = false) => {
    // url.value = videoUrl;
    // videoInfo.value.isLocal = isLocalFile;
  };

  // 设置播放器引用
  const setPlayerRef = (ref: Ref<HTMLVideoElement | null>) => {
    playerRef.value = ref.value;
    videoService.setVideoRef(ref);
  };

  // 播放视频
  const play = (videoUrl?: string, isLocalFile: boolean = false) => {
    if (videoUrl) {
      setSource(videoUrl, isLocalFile);
    }
    videoService.playVideo();
  };

  onMounted(() => {
    // 注意：setPlayerRef方法应该在组件挂载后调用
  });

  return {
    playerRef,
    setSource,
    setPlayerRef,
  };
}
