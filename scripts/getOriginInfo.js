// 获取原始信息
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 源文件夹路径
const ORIGIN_DIR = join(__dirname, '../public/AllFiles');
// 目标JSON文件路径
const TARGET_JSON = join(__dirname, '../public/OriginInfo.json');

// 获取文件夹信息
function getFolderInfo(folderName, index) {
  return {
    id: String(index + 1),
    name: folderName,
    desc: `${folderName}相关的笔记和文章。`,
    fileRealPath: `./public/AllFiles/${folderName}`,
    fileListTxtPath: `./public/FileListTXT/fileList_${folderName}.txt`
  };
}

// 主函数
function generateOriginInfo() {
  try {
    // 读取源目录
    const folders = readdirSync(ORIGIN_DIR)
      .filter(item => {
        const itemPath = join(ORIGIN_DIR, item);
        return statSync(itemPath).isDirectory() && !item.startsWith('.');
      });

    // 生成信息数组
    const originInfo = folders.map((folder, index) => getFolderInfo(folder, index));

    // 创建最终的JSON对象
    const jsonContent = {
      originInfo
    };

    // 写入文件
    writeFileSync(
      TARGET_JSON,
      JSON.stringify(jsonContent, null, 2),
      'utf8'
    );

    console.log('OriginInfo.json has been generated successfully!');
  } catch (error) {
    console.error('Error generating OriginInfo.json:', error);
  }
}

// 执行生成
generateOriginInfo();