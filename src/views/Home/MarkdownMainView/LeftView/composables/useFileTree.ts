import { ref } from 'vue';
import myBus from '@/utils/myBus';
import { audioService } from '@/components/AudioPlayer/audioService';
import { videoService } from '@/components/VideoPlayer/videoService';
import type { Tree, FilePathMapping } from './types';
import { downloadFile } from '@/utils/utils';
import { ElMessage } from 'element-plus';
import { de } from 'element-plus/es/locale/index.mjs';

interface OriginInfo {
  id: string;
  name: string;
  desc: string;
  fileRealPath: string;
  fileListTxtPath: string;
}

interface OriginInfoResponse {
  originInfo: OriginInfo[];
}

/**
 * 文件树相关逻辑的可组合函数
 */
export function useFileTree() {
  // 文件树数据
  const fileTree = ref<Tree[]>([]);
  // 原始信息数据
  const originInfoData = ref<OriginInfo[]>([]);

  /**
   * 加载 OriginInfo.json 数据
   */
  const loadOriginInfo = async (): Promise<void> => {
    try {
      const response = await fetch('/OriginInfo.json');
      if (!response.ok) {
        throw new Error(`Failed to load OriginInfo.json: ${response.status}`);
      }
      const data: OriginInfoResponse = await response.json();
      originInfoData.value = data.originInfo;
    } catch (error) {
      console.error('Error loading OriginInfo.json:', error);
      originInfoData.value = [];
    }
  };

  /**
   * 根据路由 ID 获取对应的文件列表路径
   * @param id 路由ID参数
   * @returns 文件列表路径
   */
  const getFilePathById = (id: string): string => {
    const info = originInfoData.value.find(item => item.id === id);
    if (!info) {
      // 如果没找到对应的ID，返回所有文件类型的路径
      const defaultInfo = originInfoData.value.find(item => item.name === '所有文件类型');
      return defaultInfo?.fileListTxtPath || '';
    }
    return info.fileListTxtPath;
  };

  /**
   * 加载文件树数据
   * @param filePath 文件列表路径
   */
  const loadFileList = async (filePath: string): Promise<void> => {
    try {
      // 移除路径开头的 ./public
      const cleanPath = filePath.replace('./public', '');
      const response = await fetch(cleanPath);

      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.status}`);
      }

      const text = await response.text();
      const fileList = JSON.parse(text);

      if (!text || !fileList || fileList.length === 0) {
        throw new Error('Empty or invalid file list');
      }

      fileTree.value = fileList;
    } catch (error) {
      console.error('Error loading file list:', error);
      fileTree.value = [];
    }
  };

  /**
   * 根据路由ID加载对应的文件树
   * @param id 路由ID参数
   */
  const loadFileTreeById = async (id: string): Promise<void> => {
    if (originInfoData.value.length === 0) {
      await loadOriginInfo();
    }
    const filePath = getFilePathById(id);
    if (filePath) {
      await loadFileList(filePath);
    }
  };

  /**
   * 处理节点点击事件
   * @param item 被点击的节点
   */
  const handleNodeClick = (item: Tree): void => {
    // 如果是文件夹，则不处理点击事件
    if (item.type === 'folder') {
      return;
    }

    console.log('Node clicked:', item);

    // 移除完整系统路径前缀
    // const fullPathWithoutPrefix = item.fullPath.replace('/Users/qiyeyun/Study/vue3-notes-markdown/public', '');
    // item.fullPath = fullPathWithoutPrefix;

    // 移除public前缀
    let removePublic = item.fullPath.replace('./public', '');
    item.fullPath = removePublic;

    // 处理不同类型的文件
    if (item.type === '.md') {
      // 如果是Markdown文件，发送事件
      myBus.emit('showFilePath', item);
    } else if (item.type === '.mp3' || item.fullPath.endsWith('.mp3')) {
      // 如果是MP3文件，使用音频服务处理
      audioService.handleMp3Click(item.fullPath);
    } else if (item.type === '.mp4' || item.fullPath.endsWith('.mp4')) {
      // 如果是MP4文件，使用视频服务处理
      videoService.playVideo(item.fullPath);
    } else if (item.type === '.pdf' || item.fullPath.endsWith('.pdf')) {
      // 如果是PDF文件，使用PDF预览
      window.open(
        import.meta.env.BASE_URL + 'pdfjs-4.8.69-dist/web/viewer.html?file=' + item.fullPath
      );
    } else if (
      item.type === '.zip' ||
      item.type === '.rar' ||
      item.type === '.7z' ||
      item.type === '.tar' ||
      item.type === '.gz' ||
      item.type === '.bz2' ||
      item.type === '.iso'
    ) {
      // 如果是ZIP文件，下载文件
      downloadFile(item.fullPath, item.name);
    }
    // 其他文件类型
    else {
      ElMessage.warning('文件暂未支持！！！');
    }
  };

  return {
    fileTree,
    loadFileTreeById,
    handleNodeClick,
  };
}
