import { ref } from 'vue';
import type { Ref } from 'vue';
import type { VideoInfo } from './types';

class VideoService {
  // 单例实例
  private static instance: VideoService;

  // 存储视频播放器实例的引用
  private videoRef: Ref<HTMLVideoElement | null> = ref(null);

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
  setVideoRef(ref: Ref<HTMLVideoElement | null>) {
    this.videoRef = ref;
  }

  // 播放视频
  playVideo() {
    console.log('playVideo', this.videoRef.value);

    // 创建音频信息对象
    const videoInfo: VideoInfo = {
      videoSrc: '',
      author: '',
      title: '',
      isPlaying: false,
      duration: 0,
      isLocal: false,
    };

    // 更新当前音频和可见性
    this.currentVideo.value = videoInfo;
    this.playerVisible.value = true;
  }

  // 暂停视频
  pauseVideo() {
    console.log('pauseVideo', this.videoRef.value);
    this.videoRef.value?.pause();
    if (this.currentVideo.value) {
      this.currentVideo.value.isPlaying = false;
    }
  }

  // 切换视频播放/暂停状态
  toggleVideo() {
    if (this.currentVideo.value?.isPlaying) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  // 获取视频信息
  getCurrentVideo() {
    return this.currentVideo.value;
  }

  // 获取播放器可见性
  getPlayerVisible() {
    return this.playerVisible.value;
  }
}

// 导出单例实例
export const videoService = VideoService.getInstance();
