// src/utils/markedConfig.ts
import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
// 引入markdown样式
import 'highlight.js/styles/atom-one-dark.css' 
// import "highlight.js/styles/1c-light.css"; // 引入高亮样式 这里我用的是sublime样式

// 创建一个自定义 Renderer 实例
const customRenderer = new Renderer();


/**
 * 自定义渲染器 - 标题定制
 */
customRenderer.heading = (item: any) => {
  // console.log("customRenderer.heading", item);
  // 匹配[]()
  const regex = /\[(.*?)\]\((.*?)\)/g;
  // 匹配到的每个匹配项，替换为链接
  const replaced = item.text.replace(regex, (match: any, text: any, url: any) => {
    // console.log("match =", match, text, url);
    // 打开新页面
    return `<a href="${url}" target="_blank">${text}</a>`;
  });
  // return `<h${item.depth}>${replaced}</h${item.depth}>`;
  return `<h${item.depth} id="${item.text.toLowerCase().replace(/[^\w]+/g, '-')}">${replaced}</h${item.depth}>`;
};

/**
 * 自定义渲染器 - 链接，打开新页签
 */
customRenderer.link = (item: any): string => {
  // console.log("customRenderer.link", item);
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
};

/**
 * 自定义渲染器 - 图片，打开新页签
 */
customRenderer.image = (item: any): string => {
  // console.log("customRenderer.image", item);
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer"><img src="${item.href}" alt="${item.title || ''}" /></a>`;
};

/**
 * 自定义渲染器 - 代码片段
 * 注意：如果使用了 highlight 选项，这个方法可能不会被调用
 */
customRenderer.code = (item: any) => {  
  // console.log("customRenderer.code", item);
  const validLanguage = item.lang ? item.lang : 'plaintext';
  const highlightedCode = hljs.highlight(item.text, { language: validLanguage }).value;
  return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
};

// 创建 marked 配置对象
const markedConfig = {
  renderer: customRenderer,
  // 基本配置
  gfm: true,         // 启用 GitHub Flavored Markdown
  breaks: true,      // 将换行符转换为 <br>
  pedantic: false,   // 不使用严格模式
  sanitize: false,   // 原始输出，允许HTML标签
  // 代码高亮配置
  highlight: (code: string, lang: string): string => {
    // 如果指定了语言且该语言受支持
    const validLanguage = lang ? lang : 'plaintext';
    console.log("validLanguage", validLanguage, lang);
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (e) {
        console.error('代码高亮错误:', e);
      }
    }
    // 如果没有指定语言或语言不受支持，使用普通文本
    return hljs.highlight(code, { language: 'plaintext' }).value;
  },
  langPrefix: 'hljs language-', // 添加到代码块 class 的前缀
};


// 应用配置 - 使用类型断言绕过类型检查
marked.setOptions(markedConfig as any);

// 导出配置好的 marked 实例
export default marked;
