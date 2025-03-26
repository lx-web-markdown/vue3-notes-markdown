export function formatToWan(value: number) {
  const tempN = Number(value);
  if (typeof tempN !== "number" || isNaN(tempN)) {
    return "Invalid number";
  }
  return (tempN / 10000).toFixed(2) + "万";
}




export function padZero(value: number) {
  const tempN = Number(value);
  return tempN.toString().padStart(2, '0');
}
/* 示例
  console.log(padZero(1));  // 输出: "01"
  console.log(padZero(9));  // 输出: "09"
  console.log(padZero(10)); // 输出: "10"
  console.log(padZero(123)); // 输出: "123" （超过两位的数字不会被修改）
 */





export function isEmpty(value: any) {
  // 检查 null 和 undefined
  if (value === null || value === undefined) {
    return true;
  }

  // 检查空字符串
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  // 检查空数组
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // 检查空对象
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  }

  // 默认返回 false（不为空）
  return false;
}

/*  示例用法
console.log(isEmpty(null));         // true
console.log(isEmpty(undefined));    // true
console.log(isEmpty(''));           // true
console.log(isEmpty('   '));        // true (空格字符串也算空)
console.log(isEmpty([]));           // true
console.log(isEmpty({}));           // true
console.log(isEmpty(0));            // false
console.log(isEmpty(false));        // false
 */



/**
 * 打开新tab页签
 */
export function openNewTab(relativePath: string) {
  const baseUrl = window.location.origin; // 获取当前站点的基础 URL
  const fullPath = new URL(relativePath, baseUrl).href; // 拼接完整路径  
  window.open(fullPath, '_blank'); // 打开新页签
}



/**
 * 获取唯一标识
 */
export function generateKey() {
  // 每次都生成一个独特的 key
  return Date.now() + Math.random();
}



/**
 * 下载文件
 * @param url 文件URL
 * @param filename 文件名
 */
export function downloadFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
