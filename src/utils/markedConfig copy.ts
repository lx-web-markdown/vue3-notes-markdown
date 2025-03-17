import { marked, Renderer } from 'marked';
import hljs from 'highlight.js'; // 如果需要代码高亮

// 创建一个自定义 Renderer 实例
const customRenderer = new Renderer();

// 自定义标题渲染：添加锚点 id 和自定义 CSS 类
// customRenderer.heading = (text: string, level: number, raw: string, slugger: any) => {
//   const slug = slugger.slug(raw);
//   return `<h${level} id="${slug}" class="custom-heading">${text}</h${level}>`;
// };

// // 自定义代码块渲染：为代码块添加自定义样式
// customRenderer.code = (code: string, language: string, isEscaped: boolean) => {
//   const langClass = language ? ` language-${language}` : '';
//   return `<pre class="custom-code"><code class="${langClass}">${code}</code></pre>`;
// };

// 自定义图片渲染：如果图片路径以 "./" 开头，则转换为绝对路径（根据你的需求修改）
// customRenderer.image = (href: string, title: string, text: string) => {
//   if (href.startsWith('./')) {
//     href = '/assets/images/' + href.slice(2);
//   }
//   let out = `<img src="${href}" alt="${text}"`;
//   if (title) {
//     out += ` title="${title}"`;
//   }
//   out += ' />';
//   return out;
// };

/**
 * 自定义渲染器 - 标题定制
 */
customRenderer.heading = (item: any) => {
  // 匹配[]()
  const regex = /\[(.*?)\]\((.*?)\)/g;

  // 匹配到的每个匹配项，替换为链接
  const replaced = item.text.replace(regex, (match: any, text: any, url: any) => {
    console.log("BBBBBBBBBBBBBBBBBBBBBBb", match, text, url);
    // 打开新页面
    return `<a href="${url}" target="_blank">${text}</a>`;
  });

  // console.log("customRenderer.heading", item);
  return `<h${item.depth}>${replaced}</h${item.depth}>`;
};

// 配置 marked 选项
marked.setOptions({
  renderer: customRenderer, // 使用定制的 renderer
  breaks: true, // 开启换行符转为 <br> 标签
  gfm: true, // 启用 GitHub Flavored Markdown
  // smartLists: true, // 更好的列表渲染
  // smartypants: false, // 不开启智能标点转换
});

// 导出一个转换 Markdown 的函数
function myMarked(markdownText: string) {
  return marked(markdownText);
}

export default myMarked;