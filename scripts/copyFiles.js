import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义路径
const publicOriginPath = path.resolve(__dirname, '../public_origin');
const allFilesPath = path.resolve(__dirname, '../public/AllFiles');

/**
 * 确保目录存在，如果不存在则创建
 * @param {string} dirPath 目录路径
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    // console.log(`创建目录: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 清空目录中的所有文件和子目录
 * @param {string} dirPath 目录路径
 */
function emptyDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    // console.log(`目录不存在，无需清空: ${dirPath}`);
    return;
  }

  // console.log(`清空目录: ${dirPath}`);
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 递归删除子目录
      emptyDirectory(filePath);
      fs.rmdirSync(filePath);
    } else {
      // 删除文件
      fs.unlinkSync(filePath);
    }
  }
}

/**
 * 复制文件或目录
 * @param {string} src 源路径
 * @param {string} dest 目标路径
 */
function copyFileOrDirectory(src, dest) {
  // 如果是 code-demo 文件夹，则跳过
  if (path.basename(src).startsWith('code-demo') || path.basename(src).startsWith('my-code-demo')) {
    return;
  }

  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    // 确保目标目录存在
    ensureDirectoryExists(dest);
    
    // 读取源目录中的所有文件和子目录
    const files = fs.readdirSync(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      // 递归复制
      copyFileOrDirectory(srcPath, destPath);
    }
  } else {
    // 复制文件
    fs.copyFileSync(src, dest);
    // console.log(`复制文件: ${src} -> ${dest}`);
  }
}

// 主函数
function main() {
  try {
    // 确保 public_origin 目录存在
    ensureDirectoryExists(publicOriginPath);
    
    // 确保 public/AllFiles 目录存在
    ensureDirectoryExists(allFilesPath);
    
    // 清空 public/AllFiles 目录
    emptyDirectory(allFilesPath);
    
    // 检查 public_origin 是否有文件
    if (fs.existsSync(publicOriginPath)) {
      const files = fs.readdirSync(publicOriginPath);
      
      if (files.length === 0) {
        // console.log(`警告: public_origin 目录为空，没有文件可复制`);
      } else {
        // console.log(`开始从 ${publicOriginPath} 复制文件到 ${allFilesPath}`);
        
        // 复制 public_origin 中的所有文件到 public/AllFiles
        for (const file of files) {
          const srcPath = path.join(publicOriginPath, file);
          const destPath = path.join(allFilesPath, file);
          
          copyFileOrDirectory(srcPath, destPath);
        }
        
        // console.log('文件复制完成！');
      }
    } else {
      console.log(`错误: public_origin 目录不存在`);
    }
  } catch (error) {
    console.error('发生错误:', error);
  }
}

// 执行主函数
main(); 