

# 基本流程
1. 确保你已安装 `marked` 库来解析 Markdown。
2. 如果希望采用现成的 Markdown 样式，可以使用 `github-markdown-css`。


```
<template>
  <!-- 包裹容器添加 .markdown-body 类以使用 github-markdown-css 样式 -->
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

// 示例 Markdown 内容，可以改为通过 fetch 动态加载 Markdown 文件内容
const markdownContent = fetch('/Vue3基础/Vue3 env.d.ts文件/Vue3中env.d.ts文件.md');  // 根据 public 下的路径加载文件

const htmlContent = ref('')

// 在组件挂载时将 Markdown 转换为 HTML
onMounted(() => {
  htmlContent.value = marked(markdownContent)
})
</script>

<style>

<!-- 可以在这里或全局样式中引入 github-markdown-css -->
@import "github-markdown-css";
  
/* 你也可以在这里添加或覆盖一些样式 */
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
</style>
```


