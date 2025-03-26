import { ref } from 'vue';
import myBus from '@/utils/myBus';
import { audioService } from '@/components/AudioPlayer/audioService';
import { videoService } from '@/components/VideoPlayer/videoService';
import type { Tree, FilePathMapping } from './types';
import { downloadFile } from '@/utils/utils';
/**
 * 文件树相关逻辑的可组合函数
 */
export function useFileTree() {
  // 文件树数据
  const fileTree = ref<Tree[]>([]);

  // 路由与文件路径的映射关系
  const routeToFilePath: FilePathMapping = {
    'work-doc': '/FileListTXT/fileList_工作随笔.txt',
    vue2: '/FileListTXT/fileList_Vue2.txt',
    vue3: '/FileListTXT/fileList_Vue3.txt',
    html: '/FileListTXT/fileList_HTML.txt',
    css: '/FileListTXT/fileList_CSS.txt',
    js: '/FileListTXT/fileList_JS.txt',
  };

  /**
   * 根据路由获取对应的文件列表路径
   * @param routePath 当前路由路径
   * @returns 文件列表路径
   */
  const getFilePathByRoute = (routePath: string): string => {
    // 默认为工作随笔
    let filePath = routeToFilePath['work-doc'];

    // 遍历映射关系找到匹配的路径
    for (const key in routeToFilePath) {
      if (routePath.includes(key)) {
        filePath = routeToFilePath[key];
        break;
      }
    }

    return filePath;
  };

  /**
   * 加载文件树数据
   * @param filePath 文件列表路径
   */
  const loadFileList = async (filePath: string): Promise<void> => {
    try {
      // console.log('Loading file list from:', filePath);
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.status}`);
      }

      const text = await response.text();
      const fileList = JSON.parse(text);

      if (!text || !fileList || fileList.length === 0) {
        throw new Error('Empty or invalid file list');
      }

      fileTree.value = fileList;
      // console.log('File list loaded successfully:', fileList.length, 'items');
    } catch (error) {
      console.error('Error loading file list:', error);
      fileTree.value = [];
    }
  };

  /**
   * 根据路由路径加载对应的文件树
   * @param routePath 当前路由路径
   */
  const loadFileTreeByRoute = (routePath: string): void => {
    const filePath = getFilePathByRoute(routePath);
    loadFileList(filePath);
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
    } else if (item.type === '.ppt' || item.type === '.pptx') {
      // 如果是PPT文件，使用VueOfficePptx组件处理
      myBus.emit('showFilePath', item);
    }
  };

  return {
    fileTree,
    loadFileTreeByRoute,
    handleNodeClick,
  };
}
