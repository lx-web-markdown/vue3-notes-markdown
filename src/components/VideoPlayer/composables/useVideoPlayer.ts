import { ref, computed } from 'vue'
import type { VideoPlayerOverlayProps } from '../types';

export function useVideoPlayerOverlay(props: VideoPlayerOverlayProps) {
  const cur_videoRef = ref<HTMLVideoElement | null>(null)
  const cur_showFloatingWindow = ref(false)
  const cur_isPlaying = ref(false)  

  const cur_videoSrc = computed(() => {
    return props.videoInfo.videoSrc
  })

  // 打开视频播放窗口
  const openVideo = () => {
    cur_showFloatingWindow.value = true
    setTimeout(() => {
      if (cur_videoRef.value) {
        cur_videoRef.value.play()
        cur_isPlaying.value = true
      }
    }, 100)
  }

  // 关闭视频播放窗口
  const closeVideo = () => {
    if (cur_videoRef.value) {
      cur_videoRef.value.pause()
    }
    cur_showFloatingWindow.value = false
    cur_isPlaying.value = false
  }

  // 切换视频播放窗口状态
  const toggleVideo = () => {
    if (cur_showFloatingWindow.value) {
      closeVideo()
    } else {
      openVideo()
    }
  }

  return {
    cur_videoRef,
    cur_showFloatingWindow,
    cur_isPlaying,
    cur_videoSrc,
    openVideo,
    closeVideo,
    toggleVideo
  }
} 