<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { renderMarkdown } from '@/utils/markedConfig'

const props = defineProps<{
  markdownFilePath: string;
}>();

// 用于存储 Markdown 文件内容
const markdownContent = ref("");
const mdContentRef = ref<HTMLElement | null>(null);

const loadMarkdown = async () => {
  try {
    const response = await fetch(props.markdownFilePath);
    if (response.ok) {
      const text = await response.text();
      markdownContent.value = await renderMarkdown(text);
    } else {
      console.error("Failed to load markdown file:", response.status);
    }
  } catch (error) {
    console.error("Error loading markdown file:", error);
  }
};

watch(() => props.markdownFilePath, async (newFile) => {
  if (newFile && newFile !== '') {
    loadMarkdown();
    getTitle();
  }
});

// 获取Markdown文件中的标题列表
function getTitle() {
  nextTick(() => {
    if (mdContentRef.value) {
      // 使用 querySelectorAll 查询容器内所有 h1 至 h6 元素
      const headingsNodeList = mdContentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
      // 将 NodeList 转换为数组
      const headingsArray = Array.from(headingsNodeList);
      // 这里可以进一步处理标题数组，例如生成目录等
      console.log('所有标题元素数组：', headingsArray);
      // 遍历标题数组，获取标题内容和id
      headingsArray.forEach(heading => {
        const title = heading.textContent;
        const id = heading.id;
        console.log('标题内容：', title, '标题id：', id);
      });
    }
  });
}

// 初始加载
loadMarkdown();
getTitle();
</script>

<template>
  <!-- 1.使用github-markdown-css -->
  <div v-html="markdownContent" class="markdown-body" ref="mdContentRef"></div>
  <!-- 2.纯手搓样式 -->
  <!-- <div v-html="markdownContent" class="markdown-body"></div> -->
</template>

<style lang="scss">
@use "github-markdown-css";

/* 自定义 Markdown 样式可以在这里添加 */
/*
.markdown-body {
  pre {
    border: 2px solid greenyellow;
    margin: 10px;
    background-color: aquamarine;

    code {
      background-color: lightblue;
    }
  }
}
*/
</style>
