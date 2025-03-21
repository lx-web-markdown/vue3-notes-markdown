import { ref } from 'vue';
import type { Ref } from 'vue';
import type VideoPlayerOverlay from './VideoPlayerOverlay.vue';

// 视频播放器实例类型
export type VideoPlayerInstance = {
  // 来自HTMLVideoElement的属性和方法
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  play: () => Promise<void>;
  pause: () => void;
  // 其他可能需要的方法
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
};

// 视频播放状态
interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

class VideoService {
  // 单例实例
  private static instance: VideoService;

  // 存储视频播放器实例的引用
  private videoRef: Ref<VideoPlayerInstance | null> = ref(null);

  // 视频状态
  private videoState = ref<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
  });

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
  setVideoRef(ref: Ref<VideoPlayerInstance | null>) {
    this.videoRef = ref;
  }

  // 播放视频
  playVideo() {
    console.log('playVideo', this.videoRef.value);
    this.videoRef.value?.play();
    this.videoState.value.isPlaying = true;
  }

  // 暂停视频
  pauseVideo() {
    console.log('pauseVideo', this.videoRef.value);
    this.videoRef.value?.pause();
    this.videoState.value.isPlaying = false;
  }

  // 切换视频播放/暂停状态
  toggleVideo() {
    if (this.videoState.value.isPlaying) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  // 设置视频音量
  setVideoVolume(volume: number) {
    if (this.videoRef.value) {
      this.videoRef.value.volume = volume;
      this.videoState.value.volume = volume;
    }
  }

  // 静音/取消静音
  muteVideo(mute: boolean) {
    if (this.videoRef.value) {
      this.videoRef.value.muted = mute;
      this.videoState.value.isMuted = mute;
    }
  }

  // 获取视频状态
  getVideoState() {
    return this.videoState;
  }

  // 跳转到指定时间
  seekVideo(time: number) {
    if (this.videoRef.value) {
      this.videoRef.value.currentTime = time;
      this.videoState.value.currentTime = time;
    }
  }

  // 更新视频状态
  updateVideoState() {
    if (this.videoRef.value) {
      this.videoState.value.currentTime = this.videoRef.value.currentTime;
      this.videoState.value.duration = this.videoRef.value.duration;
    }
  }
}

// 导出单例实例
export const videoService = VideoService.getInstance();
