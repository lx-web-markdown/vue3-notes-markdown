export interface VideoPlayerOverlayProps {
  src: string;
}

// 视频播放状态
export interface VideoInfo {
  videoSrc: string;
  author: string;
  title: string;
  isPlaying: boolean;
  duration: number;
  isLocal: boolean;
}
