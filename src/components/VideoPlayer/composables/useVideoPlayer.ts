import { ref, computed } from 'vue'

export interface VideoPlayerOverlayProps {
  src: string
}

export function useVideoPlayerOverlay(props: VideoPlayerOverlayProps) {
  const videoRef = ref<HTMLVideoElement | null>(null)
  const showFloatingWindow = ref(false)
  const isPlaying = ref(false)

  const videoSrc = computed(() => {
    return props.src
  })

  // 打开视频播放窗口
  const open = () => {
    showFloatingWindow.value = true
    setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.play()
      }
    }, 100)
  }

  // 关闭视频播放窗口
  const close = () => {
    if (videoRef.value) {
      videoRef.value.pause()
    }
    showFloatingWindow.value = false
    isPlaying.value = false
  }

  // 切换视频播放窗口状态
  const toggle = () => {
    if (showFloatingWindow.value) {
      close()
    } else {
      open()
    }
  }

  return {
    videoRef,
    showFloatingWindow,
    isPlaying,
    videoSrc,
    open,
    close,
    toggle
  }
} 