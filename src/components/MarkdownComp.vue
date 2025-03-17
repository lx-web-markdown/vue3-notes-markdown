<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
// import { marked } from "marked";

// import { customRenderer, parseMarkdown } from '@/utils/markedConfig'

import marked from '@/utils/markedConfig'

/**
 * 自定义渲染器 - 代码片段
 */
// customRenderer.code = (item: any) => {
//   // console.log("customRenderer.code", item);
//   return `<pre><code class="language-${item.lang}">${item.text}</code></pre>`;
// };

// /**
//  * 自定义渲染器 - 标题定制
//  */
// customRenderer.heading = (item: any) => {
//   // 匹配[]()
//   const regex = /\[(.*?)\]\((.*?)\)/g;

//   // 匹配到的每个匹配项，替换为链接
//   const replaced = item.text.replace(regex, (match: any, text: any, url: any) => {
//     console.log("match", match, text, url);
//     // 打开新页面
//     return `<a href="${url}" target="_blank">${text}</a>`;
//   });

//   // console.log("customRenderer.heading", item);
//   return `<h${item.depth}>${replaced}</h${item.depth}>`;
// };

const props = defineProps<{
  markdownFilePath: string;
}>();


// 用于存储 Markdown 文件内容
const markdownContent = ref("");
// const mdContentRef = ref();
const mdContentRef = ref<HTMLElement | null>(null);


const loadMarkdown = async () => {
  const response = await fetch(props.markdownFilePath);
  if (response.ok) {
    const text = await response.text();
    // 确保 marked 解析完成后再赋值
    markdownContent.value = await marked(text); // 将 Markdown 转换为 HTML
  } else {
    console.error("Failed to load markdown file:", response.status);
  }
};

watch(() => props.markdownFilePath, async (newFile) => {
  console.log('markdownFilePath =', newFile);
  if (newFile && newFile !== '') {
    loadMarkdown();
    getTitle();
  }
});

// markdown-生成标题
function getTitle() {

  nextTick(() => {
    if (mdContentRef.value) {
      // 使用js选择器，获取对应的h标签，组合成列表
      console.log('mdContentRef.value = ', mdContentRef.value);
      // const anchors = mdContentRef.value.querySelectorAll('h1');
      // console.log('anchors =', anchors);

      // 使用 querySelectorAll 查询容器内所有 h1 至 h6 元素
      const headingsNodeList = mdContentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');

      // 将 NodeList 转换为数组（如果需要进行数组方法操作）
      const headingsArray = Array.from(headingsNodeList);

      console.log('所有标题元素数组：', headingsArray);
    }
  });




  // 删除标题头尾的空格
  // const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
  // 当文章h标签为空时，直接返回
  // if (!titles.length) {
  //   titleList.value = [];
  //   return;
  // }
  // 从h标签属性中，提取相关信息
  // const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
  // titleList.value = titles.map((el) => ({
  //   title: el.innerText, // 标题内容
  //   lineIndex: el.getAttribute('data-v-md-line'), // 标签line id
  //   indent: hTags.indexOf(el.tagName), // 标签层级
  //   height: el.offsetTop, // 标签距离顶部距离
  // }));
}

loadMarkdown();
getTitle();

</script>

<template>
  <!-- 1.使用github-markdown-css -->
  <!-- 注意容器div要添加markdown-body类名 -->
  <div v-html="markdownContent" class="markdown-body" ref="mdContentRef"></div>

  <!-- 2.纯手搓样式 -->
  <!-- <div v-html="markdownContent" class="markdown-content"></div> -->
</template>

<style lang="scss">
@use "github-markdown-css";


.markdown-content {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: aliceblue;

  pre {
    border: 2px solid greenyellow;
    margin: 20px;
    background-color: aquamarine;

    code {
      font-family: Arial, sans-serif;
      color: crimson;
      background-color: transparent;
      padding: 2px;
      font-size: 105%;
    }

    .language-js {
      color: orange;
    }
  }

  code {
    font-family: Arial, sans-serif;
    color: crimson;
    background-color: #f1f1f1;
    padding: 2px;
    font-size: 105%;
  }
}
</style>
