<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { renderMarkdown } from '@/utils/markedConfig'

const props = defineProps<{
  markdownFilePath: string;
}>();

// 用于存储 Markdown 文件内容
const markdownContent = ref("");
const mdContentRef = ref<HTMLElement | null>(null);

// 存储标题列表
interface HeadingItem {
  id: string;
  text: string;
  level: number;
}
const headings = ref<HeadingItem[]>([]);

// 屏幕宽度响应式
const isSmallScreen = ref(window.innerWidth < 1200);

// 监听窗口大小变化
const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 1200;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const loadMarkdown = async () => {
  try {
    const response = await fetch(props.markdownFilePath);
    if (response.ok) {
      const text = await response.text();
      // 在markdown内容后面添加一个高度为80px的div，用于占位
      markdownContent.value = await renderMarkdown(text) + '<div style="height: 80px; background-color: transparent;"></div>';
      // console.log("markdownContent.value = ", markdownContent.value);
    } else {
      console.error("Failed to load markdown file:", response.status);
    }
  } catch (error) {
    console.error("Error loading markdown file:", error);
  }
};

watch(() => props.markdownFilePath, async (newFile) => {
  if (newFile && newFile !== '') {
    // 重置标题列表
    headings.value = [];
    // 加载Markdown文件
    await loadMarkdown();
    // 在渲染完成后再获取标题
    setTimeout(() => {
      getTitle();
    }, 100);
  }
});

// 获取Markdown文件中的标题列表
function getTitle() {
  if (mdContentRef.value) {
    // 使用 querySelectorAll 查询容器内所有 h1 至 h6 元素
    const headingsNodeList = mdContentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
    // 将 NodeList 转换为数组
    const headingsArray = Array.from(headingsNodeList);
    // 清空现有标题列表
    headings.value = [];
    // 处理标题数组
    headingsArray.forEach(heading => {
      const title = heading.textContent || '';
      const id = heading.id;
      const level = parseInt(heading.tagName.substring(1)); // 获取标题级别 (1-6)
      headings.value.push({
        id,
        text: title,
        level
      });
    });
    console.log('MarkdownComp - Title目录已更新:', headings.value);
  }
}

// 点击目录项跳转到对应标题
function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(async () => {
  // 初始加载
  await loadMarkdown();
  getTitle();
});
</script>

<template>
  <div class="markdown-container">
    <!-- 回到顶部 -->
    <el-backtop target=".markdown-body" :right="50" :bottom="50" />

    <!-- 1.左侧Markdown内容 -->
    <div v-html="markdownContent" class="markdown-body" :class="{ 'full-width': isSmallScreen }" ref="mdContentRef">
    </div>
    <!-- 2.纯手搓样式 -->
    <!-- <div v-html="markdownContent" class="markdown-body"></div> -->

    <!-- 右侧标题目录，在小屏幕下隐藏 -->
    <div class="toc-container" v-if="headings.length > 0 && !isSmallScreen">
      <div class="toc-title">{{ $t("common.content") }}</div>
      <div class="toc-items">
        <div v-for="(heading, index) in headings" :key="index" class="toc-item" :class="`level-${heading.level}`"
          @click="scrollToHeading(heading.id)">
          {{ heading.text }}
        </div>
      </div>
    </div>
  </div>
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

.markdown-container {
  display: flex;
  position: relative;

  .markdown-body {
    flex: 1;
    max-width: calc(100% - 320px); // 预留右侧目录的空间

    &.full-width {
      max-width: 100%; // 在小屏幕下占据全宽
    }
  }

  .toc-container {
    position: sticky;
    top: 0;
    width: 300px;
    max-height: calc(100vh - 90px);
    overflow-y: auto;
    padding: 10px;
    background-color: #f8f9fa;
    border-left: 1px solid #eaecef;
    margin-left: 20px;

    .toc-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 8px;
      padding-bottom: 5px;
      border-bottom: 1px solid #eaecef;
    }

    .toc-items {
      .toc-item {
        cursor: pointer;
        margin: 4px 0;
        color: #0366d6;
        word-break: break-word;

        &:hover {
          text-decoration: underline;
        }

        &.level-1 {
          font-weight: bold;
          margin-left: 0;
        }

        &.level-2 {
          margin-left: 5px;
        }

        &.level-3 {
          margin-left: 10px;
          font-size: 0.95em;
        }

        &.level-4,
        &.level-5,
        &.level-6 {
          margin-left: 15px;
          font-size: 0.9em;
          color: #586069;
        }
      }
    }
  }
}
</style>
