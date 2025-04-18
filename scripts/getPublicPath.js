import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获得当前执行node命令时候的文件夹目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("===> fileUrl =", import.meta.url);
console.log("===> __filename =", __filename);
console.log("===> __dirname =", __dirname);
console.log("===> process.cwd() =", process.cwd());
console.log("===> ./ =", path.resolve("./"));

// 源文件路径
const publicDir = path.resolve(__dirname, "public");
const tempOutputFile = path.join(publicDir, "fileList.txt");
console.log("===> publicDir =", publicDir, tempOutputFile);

// 读取 OriginInfo.json 文件
const originInfoPath = path.resolve("./public/OriginInfo.json");
const originInfo = JSON.parse(fs.readFileSync(originInfoPath, 'utf8'));

/**
 * 获取某个目录下的所有文件
 * @param {string} _filePath : 文件路径
 * @param {number} _level : 文件层级，从1开始
 * @returns 列表
 */
const getAllFilesInPublicDir_Core = async (_filePath, _level) => {
  const files = await fs.readdirSync(_filePath);
  // console.log("===> files =", files);
  const result = [];

  for (let index = 0; index < files.length; index++) {
    const item = files[index];
    // 子文件路径
    const itemPath = `${_filePath}/${item}`;
    const stat = fs.statSync(itemPath);
    // 判断是否为文件夹
    if (stat.isDirectory()) {
      // 文件夹递归
      let data = {
        type: "folder",
        name: item,
        levle: _level,
        fullPath: itemPath,
      };
      let children = await getAllFilesInPublicDir_Core(itemPath, _level + 1);
      // 空文件夹不返回
      if (children && children.length) {
        data.children = children;
        result.push(data);
      }
    } else {
      //获取文件的后缀名
      var extname = path.extname(itemPath);
      if (
        extname === ".js" ||
        extname === ".cjs" ||
        extname === ".ts" ||
        extname === ".html" ||
        extname === ".css" ||
        extname === ".scss" ||
        extname === ".sass" ||
        extname === ".less" ||
        extname === ".json" ||
        extname === ".ico" ||
        extname === ".png" ||
        extname === ".jpg" ||
        extname === ".jpeg" ||
        extname === ".gif" ||
        extname === ".svg"
      ) {
        continue;
      }
      if (item !== ".DS_Store") {
        // console.log("===> isFile =", itemPath, extname);
        result.push({
          type: extname || "file",
          name: item,
          levle: _level,
          fullPath: itemPath,
        });
      }
    }
  }

  return result;
};

// 获取public目录下所有文件
const getAllFilesInPublicDir = async (_filePath, _outputFilePath) => {
  const res = await getAllFilesInPublicDir_Core(_filePath, 1);
  // console.log('res =', res);

  if (res && res.length > 0) {
    // 具有文件名，内容和回调函数的writeFile函数
    fs.writeFile(_outputFilePath, JSON.stringify(res), function (err) {
      if (err) throw err;
      // console.log("File is created successfully.");
    });
  } else {
    console.error("获取文件列表失败！！！");
  }
};

/**
 * 遍历目录下所有的md文件，并替换文件中的图片路径
 * @param {string} dirPath 要遍历的目录路径
 * @param {string} baseDir 基础目录，用于计算相对路径
 */
const processMarkdownFiles = async (dirPath, baseDir) => {
  try {
    // 读取目录下的所有文件和文件夹
    const items = await fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // 如果是目录，递归处理
        await processMarkdownFiles(itemPath, baseDir);
      } else if (path.extname(itemPath).toLowerCase() === '.md') {
        // 如果是md文件，处理图片路径
        await replaceImagePathsInMarkdown(itemPath, baseDir);
      }
    }

    // console.log(`处理完成目录: ${dirPath}`);
  } catch (error) {
    console.error(`处理目录 ${dirPath} 时出错:`, error);
  }
};

/**
 *******************************************************************************************
 */

/**
 * 替换Markdown文件中的图片路径
 * @param {string} filePath Markdown文件路径
 * @param {string} baseDir 基础目录，用于计算相对路径
 */
const replaceImagePathsInMarkdown = async (filePath, baseDir) => {
  try {
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf8');

    // 获取文件所在目录的相对路径（相对于baseDir）
    const fileDir = path.dirname(filePath);
    const relativePath = path.relative(baseDir, fileDir);

    // console.log("AA===> filePath =", filePath);
    // console.log("AA===> baseDir =", baseDir);
    // console.log("AA===> fileDir =", fileDir);
    // console.log("AA===> relativePath =", relativePath);

    // 使用正则表达式匹配Markdown中的图片语法 ![alt](path)
    // const imgRegex = /!\[(.*?)\]\((\.\/.*?)\)/g;

    // 匹配 ![alt](path) 或 ![alt](./path)
    const imgRegex  = /!\[(.*?)\]\((.*?)\)/g;

    // 替换所有匹配项
    let match;
    let modified = false;
    let newContent = content;

    while ((match = imgRegex.exec(content)) !== null) {
      const [fullMatch, altText, imgPath] = match;

      // console.log("===> fullMatch =", fullMatch);
      // console.log("===> altText =", altText);
      // console.log("===> imgPath =", imgPath);

      // 只处理相对路径的图片（以./开头）
      if (imgPath.startsWith('./')) {
        // 构建新的图片路径
        // 例如：将 ./images/pic.png 替换为 /AllFiles/Vue/Vue3/xxx/images/pic.png
        const newImgPath = `/${relativePath}${imgPath.substring(1)}`;
        const newImgMarkdown = `![${altText}](${newImgPath})`;

        // 替换内容
        newContent = newContent.replace(fullMatch, newImgMarkdown);
        modified = true;
      }

      if (imgPath.startsWith('./')) {
        // 构建新的图片路径
        // 例如：将 ./images/pic.png 替换为 /AllFiles/Vue/Vue3/xxx/images/pic.png
        const newImgPath = `/${relativePath}${imgPath.substring(1)}`;
        const newImgMarkdown = `![${altText}](${newImgPath})`;

        // 替换内容
        newContent = newContent.replace(fullMatch, newImgMarkdown);
        modified = true;
      }
      else if (imgPath.startsWith('images') || imgPath.startsWith('asset')) {
        // 构建新的图片路径
        // 例如：将 ./images/pic.png 替换为 /AllFiles/Vue/Vue3/xxx/images/pic.png
        const newImgPath = `/${relativePath}/${imgPath}`;
        const newImgMarkdown = `![${altText}](${newImgPath})`;

        // 替换内容
        newContent = newContent.replace(fullMatch, newImgMarkdown);
        modified = true;
      }
    }

    // 如果有修改，写回文件
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      // console.log(`已更新图片路径: ${filePath}`);
    }
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error);
  }
};


/** 
 *******************************************************************************************
 */

/**
 * 处理所有目录的文件列表生成
 */
const processAllFileListsInPublic = async () => {
  try {
    // 从 OriginInfo.json 生成目录配置
    const dirConfigs = originInfo.originInfo.map(item => ({
      name: item.name,
      fileRealPath: path.resolve(item.fileRealPath),
      fileListTxtPath: path.resolve(item.fileListTxtPath)
    }));
    
    // 遍历处理每个目录
    for (const config of dirConfigs) {
      try {
        // 确保目录存在
        if (!fs.existsSync(config.fileRealPath)) {
          console.log(`目录不存在，跳过处理: ${config.fileRealPath}`);
          continue;
        }

        // 确保输出目录存在
        const outputDir = path.dirname(config.fileListTxtPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`处理目录: ${config.fileRealPath} -> ${config.fileListTxtPath}`);
        await getAllFilesInPublicDir(config.fileRealPath, config.fileListTxtPath);
      } catch (err) {
        console.error(`处理目录 ${config.fileRealPath} 时出错:`, err);
      }
    }
  } catch (err) {
    console.error("处理文件列表时出错:", err);
  }
};


// 处理所有目录下的Markdown文件，替换图片路径
const processAllMarkdownInPublic = async () => {
  try {
    const publicPath = path.resolve("./public");
    console.log("开始处理所有Markdown文件中的图片路径...");

    // 从 OriginInfo.json 获取所有目录并处理
    for (const item of originInfo.originInfo) {
      const dirPath = path.resolve(item.fileRealPath);
      
      // 确保目录存在
      if (!fs.existsSync(dirPath)) {
        console.log(`目录不存在，跳过处理: ${dirPath}`);
        continue;
      }

      try {
        await processMarkdownFiles(dirPath, publicPath);
      } catch (err) {
        console.error(`处理目录 ${dirPath} 时出错:`, err);
      }
    }

    console.log("所有Markdown文件处理完成！");
  } catch (err) {
    console.error("处理Markdown文件时出错:", err);
  }
};

/** 
 *******************************************************************************************
 */

// 生成所有目录的文件列表
processAllFileListsInPublic();

// 处理Markdown文件中的图片路径
processAllMarkdownInPublic();
