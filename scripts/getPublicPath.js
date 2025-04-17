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
  // 定义目录和输出文件的映射关系
  const dirConfigs = [
    // NEED TO DO
    { name: "《如何写出高质量的前端代码》", path: "./public/AllFiles/《如何写出高质量的前端代码》" },
    { name: "所有文件类型", path: "./public/AllFiles/所有文件类型" },
    { name: "HTML", path: "./public/AllFiles/HTML" },
    { name: "CSS", path: "./public/AllFiles/CSS" },
    { name: "JS", path: "./public/AllFiles/JS" },
    { name: "Vue2", path: "./public/AllFiles/Vue/Vue2" },
    { name: "Vue3", path: "./public/AllFiles/Vue/Vue3" }
  ];
  
  // 遍历处理每个目录
  for (const config of dirConfigs) {
    const outputFilePath = `./public/FileListTXT/fileList_${config.name}.txt`;
    // console.log(`处理目录: ${config.path} -> ${outputFilePath}`);
    await getAllFilesInPublicDir(config.path, outputFilePath);
  }
  
  // console.log("所有文件列表生成完成！");
};


// 处理所有目录下的Markdown文件，替换图片路径
const processAllMarkdownInPublic = async () => {
  const publicPath = "./public";
  // console.log("开始处理所有Markdown文件中的图片路径...");

  // NEED TO DO
  // 处理各个目录
  await processMarkdownFiles(`${publicPath}/AllFiles/《如何写出高质量的前端代码》`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/所有文件类型`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/HTML`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/CSS`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/JS`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/Vue/Vue2`, publicPath);
  await processMarkdownFiles(`${publicPath}/AllFiles/Vue/Vue3`, publicPath);

  console.log("所有Markdown文件处理完成！");
};

/** 
 *******************************************************************************************
 */

// 生成所有目录的文件列表
processAllFileListsInPublic();

// 处理Markdown文件中的图片路径
processAllMarkdownInPublic();
