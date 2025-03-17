// src/utils/markedConfig.ts
import { marked } from 'marked';
import hljs from 'highlight.js';

// 创建 marked 配置
const markedConfig = {
  gfm: true,
  breaks: true,
  renderer: {
    // // 自定义链接渲染
    // link(href: string, title: string | null, text: string): string {
    //   return `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    // },
    // // 自定义标题渲染
    // heading(text: string, level: number): string {
    //   const escapedText = text.raw.toLowerCase().replace(/[^\w]+/g, '-');
    //   return `<h${level} id="${escapedText}">${text}</h${level}>`;
    // },
    // // 自定义代码块渲染
    // code(code: string, language: string): string {
    //   const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    //   const highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
    //   return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
    // },
    // highlight(code: string, language: string): string {
    //   const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    //   return hljs.highlight(code, { language: validLanguage }).value;
    // }
  }
};

// 应用配置 - 使用any类型断言绕过类型检查
marked.setOptions(markedConfig as any);

// 导出配置好的 marked 实例
export default marked;