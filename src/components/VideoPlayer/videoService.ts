import { ref } from 'vue'
import type { Ref } from 'vue'
import type VideoPlayerOverlay from './VideoPlayerOverlay.vue'

// 视频播放器实例类型
type VideoPlayerInstance = InstanceType<typeof VideoPlayerOverlay> | null

// 视频播放状态
interface VideoState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
}

class VideoService {
  // 存储视频播放器实例的引用
  private onlineVideoRef: Ref<VideoPlayerInstance> = ref(null)
  private localVideoRef: Ref<VideoPlayerInstance> = ref(null)
  
  // 视频状态
  private onlineVideoState = ref<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false
  })
  
  private localVideoState = ref<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false
  })

  // 设置视频引用
  setOnlineVideoRef(ref: Ref<VideoPlayerInstance>) {
    this.onlineVideoRef = ref
  }

  setLocalVideoRef(ref: Ref<VideoPlayerInstance>) {
    this.localVideoRef = ref
  }

  // 播放视频
  playOnlineVideo() {
    this.onlineVideoRef.value?.play()
    this.onlineVideoState.value.isPlaying = true
  }

  playLocalVideo() {
    this.localVideoRef.value?.play()
    this.localVideoState.value.isPlaying = true
  }

  // 同时播放两个视频
  playAllVideos() {
    this.playOnlineVideo()
    this.playLocalVideo()
  }

  // 暂停视频
  pauseOnlineVideo() {
    this.onlineVideoRef.value?.pause()
    this.onlineVideoState.value.isPlaying = false
  }

  pauseLocalVideo() {
    this.localVideoRef.value?.pause()
    this.localVideoState.value.isPlaying = false
  }

  // 同时暂停两个视频
  pauseAllVideos() {
    this.pauseOnlineVideo()
    this.pauseLocalVideo()
  }

  // 切换视频播放/暂停状态
  toggleOnlineVideo() {
    if (this.onlineVideoState.value.isPlaying) {
      this.pauseOnlineVideo()
    } else {
      this.playOnlineVideo()
    }
  }

  toggleLocalVideo() {
    if (this.localVideoState.value.isPlaying) {
      this.pauseLocalVideo()
    } else {
      this.playLocalVideo()
    }
  }

  // 设置视频音量
  setOnlineVideoVolume(volume: number) {
    if (this.onlineVideoRef.value) {
      this.onlineVideoRef.value.volume = volume
      this.onlineVideoState.value.volume = volume
    }
  }

  setLocalVideoVolume(volume: number) {
    if (this.localVideoRef.value) {
      this.localVideoRef.value.volume = volume
      this.localVideoState.value.volume = volume
    }
  }

  // 静音/取消静音
  muteOnlineVideo(mute: boolean) {
    if (this.onlineVideoRef.value) {
      this.onlineVideoRef.value.muted = mute
      this.onlineVideoState.value.isMuted = mute
    }
  }

  muteLocalVideo(mute: boolean) {
    if (this.localVideoRef.value) {
      this.localVideoRef.value.muted = mute
      this.localVideoState.value.isMuted = mute
    }
  }

  // 获取视频状态
  getOnlineVideoState() {
    return this.onlineVideoState
  }

  getLocalVideoState() {
    return this.localVideoState
  }

  // 跳转到指定时间
  seekOnlineVideo(time: number) {
    if (this.onlineVideoRef.value) {
      this.onlineVideoRef.value.currentTime = time
      this.onlineVideoState.value.currentTime = time
    }
  }

  seekLocalVideo(time: number) {
    if (this.localVideoRef.value) {
      this.localVideoRef.value.currentTime = time
      this.localVideoState.value.currentTime = time
    }
  }

  // 同步两个视频的进度
  syncVideos() {
    if (this.onlineVideoRef.value && this.localVideoRef.value) {
      const onlineTime = this.onlineVideoRef.value.currentTime
      this.seekLocalVideo(onlineTime)
    }
  }
}

// 创建单例实例
export const videoService = new VideoService()
