import { ref } from 'vue';
import type { AudioInfo } from '@/components/AudioPlayer/types';

/**
 * 音频播放服务 - 单例模式实现
 */
class AudioService {
  // 单例实例
  private static instance: AudioService | null = null;

  // 当前播放的音频信息
  private currentAudio = ref<AudioInfo | null>(null);

  // 播放器是否可见
  private playerVisible = ref<boolean>(false);

  /**
   * 私有构造函数，防止外部通过 new 创建实例
   */
  private constructor() {
    console.log('AudioService 实例已创建');
  }

  /**
   * 获取单例实例
   * @returns AudioService 实例
   */
  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  /**
   * 播放音频
   * @param src 音频源路径
   * @param title 音频标题
   * @param artist 音频作者/歌手
   */
  playAudio(src: string, title?: string, artist?: string): void {
    // 从路径中提取文件名作为标题（如果未提供标题）
    if (!title) {
      const fileName = src.split('/').pop() || '';
      title = fileName.replace(/\.[^/.]+$/, ''); // 移除扩展名
    }

    // 创建音频信息对象
    const audioInfo: AudioInfo = {
      src,
      title,
      artist: artist || undefined,
    };

    // 更新当前音频和可见性
    this.currentAudio.value = audioInfo;
    this.playerVisible.value = true;
  }

  /**
   * 处理MP3文件点击
   * @param filePath MP3文件路径
   */
  handleMp3Click(filePath: string): void {
    // 判断是本地路径还是远程URL
    const isRemoteUrl = filePath.startsWith('http://') || filePath.startsWith('https://');

    // 如果是本地路径，需要拼接基础路径
    const src = isRemoteUrl ? filePath : this.getLocalAudioPath(filePath);

    // 从路径中提取文件名作为标题
    const fileName = filePath.split('/').pop() || '';
    const title = fileName.replace(/\.[^/.]+$/, ''); // 移除扩展名

    // 播放音频
    this.playAudio(src, title);
  }

  /**
   * 获取本地音频文件的完整路径
   * @param relativePath 相对路径
   * @returns 完整路径
   */
  private getLocalAudioPath(relativePath: string): string {
    // 如果已经是绝对路径或包含域名，则直接返回
    if (relativePath.startsWith('/') || relativePath.includes('://')) {
      return relativePath;
    }

    // 否则拼接基础路径
    // 注意: 这里假设音频文件放在public目录下的audio文件夹中
    return `/audio/${relativePath}`;
  }

  /**
   * 关闭播放器
   */
  closePlayer(): void {
    this.playerVisible.value = false;
    this.currentAudio.value = null;
  }

  /**
   * 获取当前音频信息
   */
  getCurrentAudio() {
    return this.currentAudio;
  }

  /**
   * 获取播放器可见性
   */
  getPlayerVisible() {
    return this.playerVisible;
  }
}

// 导出单例实例
export const audioService = AudioService.getInstance();

// 为了方便在其他地方获取实例，提供一个获取实例的函数
export function useAudioService(): AudioService {
  return AudioService.getInstance();
}
