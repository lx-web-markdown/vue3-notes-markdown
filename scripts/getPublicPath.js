import { log } from "console";
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
        break;
      }
      if (item !== ".DS_Store") {
        // console.log("===> isFile =", itemPath, extname);
        result.push({
          type: "file",
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
      console.log("File is created successfully.");
    });
  } else {
    console.error("获取文件列表失败！！！");
  }
};

/**
 *******************************************************************************************
 */

// 输出文件路径 - Vue文件夹
const outputFilePath_HTML = "./public/fileList_HTML.txt";
const outputFilePath_CSS = "./public/fileList_CSS.txt";
const outputFilePath_JS = "./public/fileList_JS.txt";
const outputFilePath_Vue2 = "./public/fileList_Vue2.txt";
const outputFilePath_Vue3 = "./public/fileList_Vue3.txt";

const getAllFilesInPublicDir_HTML = async () => {
  getAllFilesInPublicDir("./public/HTML", outputFilePath_HTML);
};
const getAllFilesInPublicDir_CSS = async () => {
  getAllFilesInPublicDir("./public/CSS", outputFilePath_CSS);
};
const getAllFilesInPublicDir_JS = async () => {
  getAllFilesInPublicDir("./public/JS", outputFilePath_JS);
};
const getAllFilesInPublicDir_Vue2 = async () => {
  getAllFilesInPublicDir("./public/Vue/Vue2", outputFilePath_Vue2);
};
const getAllFilesInPublicDir_Vue3 = async () => {
  getAllFilesInPublicDir("./public/Vue/Vue3", outputFilePath_Vue3);
};

// 调用
getAllFilesInPublicDir_HTML();
getAllFilesInPublicDir_CSS();
getAllFilesInPublicDir_JS();
getAllFilesInPublicDir_Vue2();
getAllFilesInPublicDir_Vue3();
