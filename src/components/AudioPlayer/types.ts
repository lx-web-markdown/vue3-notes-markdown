/**
 * 音频播放器相关类型定义
 */

/**
 * 音频信息接口
 */
export interface AudioInfo {
  /**
   * 音频源路径，支持本地和远程URL
   */
  src: string;
  
  /**
   * 音频标题
   */
  title?: string;
  
  /**
   * 音频作者/歌手
   */
  artist?: string;
  
  /**
   * 音频封面图片地址
   */
  cover?: string;
}

/**
 * 播放器状态
 */
export type PlayerStatus = 'playing' | 'paused' | 'stopped' | 'loading' | 'error';

/**
 * 播放器设置
 */
export interface PlayerSettings {
  /**
   * 是否自动播放
   */
  autoplay?: boolean;
  
  /**
   * 默认音量（0-1）
   */
  volume?: number;
  
  /**
   * 是否显示音量控制
   */
  showVolumeControl?: boolean;
  
  /**
   * 是否循环播放
   */
  loop?: boolean;
} 