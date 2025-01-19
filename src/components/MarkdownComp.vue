<script setup lang="ts">
import { ref, watch } from "vue";
import { marked } from "marked";

const props = defineProps<{
  markdownFilePath: string;
}>();


// 用于存储 Markdown 文件内容
const markdownContent = ref("");

// 使用mark.js解析markdown
const parseMarkdown = (md: string) => {
  return marked(md);
};

const loadMarkdown = async () => {
  const response = await fetch(props.markdownFilePath);
  if (response.ok) {
    const text = await response.text();
    // 确保 marked 解析完成后再赋值
    markdownContent.value = await parseMarkdown(text); // 将 Markdown 转换为 HTML
  } else {
    console.error("Failed to load markdown file:", response.status);
  }
};

watch(() => props.markdownFilePath, async (newFile) => {
  console.log('markdownFilePath =', newFile);
  if (newFile && newFile !== '') {
    loadMarkdown();
  }
});

loadMarkdown();

</script>

<template>
  <div v-html="markdownContent" class="markdown-content"></div>
</template>

<style lang="scss">
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
