import { ref } from 'vue';
import type { Ref } from 'vue';
import type { VideoInfo } from './types';
import VideoPlayerOverlay from './VideoPlayerOverlay.vue';

class VideoService {
  // 单例实例
  private static instance: VideoService;

  // 存储视频播放器实例的引用
  private videoRef: Ref<InstanceType<typeof VideoPlayerOverlay> | null> = ref(null);

  // 视频状态
  private currentVideo = ref<VideoInfo | null>(null);

  // 播放器是否可见
  private playerVisible = ref<boolean>(false);

  // 私有构造函数，防止外部实例化
  private constructor() {
    console.log('VideoService 实例化 - 单例！！');
  }

  // 获取单例实例的静态方法
  public static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  // 设置视频引用
  setVideoRef(ref: any) {
    this.videoRef = ref;
  }

  // 播放视频
  playVideo(url: string, isLocalFile: boolean = false, title?: string, author?: string) {
    // 创建音频信息对象
    const videoInfo: VideoInfo = {
      videoSrc: url,
      author: author || '',
      title: title || '',
      duration: 0,
      isLocal: isLocalFile,
    };

    // 更新当前音频和可见性
    this.currentVideo.value = videoInfo;
    this.playerVisible.value = true;
    this.videoRef.value?.openVideo();
  }

  // 关闭播放器
  closePlayer() {
    this.videoRef.value?.closeVideo();
    this.playerVisible.value = false;
  }

  // 获取视频信息
  getCurrentVideo() {
    return this.currentVideo;
  }

  // 获取播放器可见性
  getPlayerVisible() {
    return this.playerVisible;
  }
}

// 导出单例实例
export const videoService = VideoService.getInstance();
