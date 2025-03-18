// src/utils/markedConfig.ts
import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
// 引入高亮样式
import 'highlight.js/styles/atom-one-light.css';

// 创建自定义 Renderer 实例
const customRenderer = new Renderer();

/**
 * 自定义渲染器 - 标题定制
 * 支持标题内的markdown链接语法
 */
customRenderer.heading = (item: any) => {
  // 匹配[]()链接语法
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const replaced = item.text.replace(regex, (match: any, text: any, url: any) => {
    return `<a href="${url}" target="_blank">${text}</a>`;
  });
  
  // 添加id属性，支持锚点跳转
  return `<h${item.depth} id="${item.text.toLowerCase().replace(/[^\w]+/g, '-')}">${replaced}</h${item.depth}>`;
};

/**
 * 自定义渲染器 - 链接，默认打开新页签
 */
customRenderer.link = (item: any): string => {
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
};

/**
 * 自定义渲染器 - 图片，点击可在新页签打开
 */
customRenderer.image = (item: any): string => {
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer">
    <img src="${item.href}" alt="${item.title || ''}" />
  </a>`;
};

/**
 * 自定义渲染器 - 代码片段高亮
 */
customRenderer.code = (item: any) => {  
  let validLanguage = item.lang || 'plaintext';

  // 特殊处理vue文件
  if (item.lang === 'vue') {
    validLanguage = 'html';
  } else if (item.lang) {
    // 检查语言是否支持
    validLanguage = hljs.getLanguage(item.lang) ? item.lang : 'plaintext';
  }

  const highlightedCode = hljs.highlight(item.text, { language: validLanguage }).value;
  return `<pre><code class="language-${validLanguage}">${highlightedCode}</code></pre>`;
};

// 创建 marked 配置对象
const markedConfig = {
  renderer: customRenderer,
  gfm: true,         // 启用 GitHub Flavored Markdown
  breaks: true,      // 将换行符转换为 <br>
  pedantic: false,   // 不使用严格模式
  sanitize: false,   // 原始输出，允许HTML标签
};

// 应用配置
marked.setOptions(markedConfig as any);

// 导出配置好的 marked 实例
export default marked;

// 导出一个便捷的渲染函数
export function renderMarkdown(content: string): string | Promise<string> {
  return marked.parse(content);
}
