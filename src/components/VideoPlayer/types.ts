export interface VideoPlayerOverlayProps {
  videoInfo: VideoInfo;
}

// 视频播放状态
export interface VideoInfo {
  videoSrc: string;
  author: string;
  title: string;
  duration: number;
  isLocal: boolean;
}
