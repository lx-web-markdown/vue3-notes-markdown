// src/views/ToolsCollection/HtmlConvert/htmlConvertUtils.ts

/**
 * HTML 转义
 * @param str 原始字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });
}

/**
 * HTML 反转义
 * @param str 转义字符串
 * @returns 反转义后的字符串
 */
export function unescapeHtml(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}