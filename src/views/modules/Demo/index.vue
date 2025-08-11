<template>
  <div class="demo-home">
    <h1>Demo 示例展示</h1>
    <div class="demo-card-container">
      <router-link 
        v-for="demo in demoList" 
        :key="demo.path" 
        :to="demo.path"
        class="demo-card"
        :class="{ 'demo-card-deprecated': demo.deprecated }"
      >
        <div class="demo-card-title">
          {{ demo.title }}
          <span v-if="demo.deprecated" class="deprecated-tag">已废弃</span>
        </div>
        <div class="demo-card-desc">{{ demo.description }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface DemoItem {
  title: string;
  path: string;
  description: string;
  deprecated?: boolean;
}

const demoList = ref<DemoItem[]>([
  {
    title: '音频播放器',
    path: '/audio-player-demo',
    description: '一个自定义的音频播放器组件示例'
  },
  {
    title: '视频播放器',
    path: '/video-player-demo',
    description: '一个自定义的视频播放器组件示例'
  },
  {
    title: '文件下载',
    path: '/download-demo',
    description: '文件下载功能示例'
  },
  {
    title: 'PDF查看器',
    path: '/pdf-viewer-demo',
    description: 'PDF文件查看器示例'
  },
  {
    title: '图片查看器',
    path: '/image-viewer-demo',
    description: '图片查看器示例'
  },
  {
    title: 'Xmind查看器',
    path: '/xmind-viewer-demo',
    description: 'Xmind查看器示例'
  },
  {
    title: 'Word文档查看',
    path: '/vue-office-docx-demo',
    description: 'Word文档(.docx)查看组件示例',
    deprecated: true
  },
  {
    title: 'Excel表格查看',
    path: '/vue-office-excel-demo',
    description: 'Excel表格(.xlsx)查看组件示例',
    deprecated: true
  },
  {
    title: 'PDF文档查看',
    path: '/vue-office-pdf-demo',
    description: 'PDF文档查看组件示例',
    deprecated: true
  },
  {
    title: 'PPT演示文稿查看',
    path: '/vue-office-pptx-demo',
    description: 'PPT演示文稿(.pptx)查看组件示例',
    deprecated: true
  },
  {
    title: '通用Office文档查看器',
    path: '/office-viewer-demo',
    description: '支持多种Office文档格式的查看器示例',
    deprecated: true
  }
]);
</script>

<style scoped>
.demo-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #409eff;
}

.demo-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.demo-card {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 150px;
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: #409eff;
}

.demo-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.demo-card-desc {
  font-size: 14px;
  color: #606266;
  flex-grow: 1;
}

.demo-card-deprecated {
  background-color: #f8f8f8;
  opacity: 0.8;
}

.deprecated-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f56c6c;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: normal;
}
</style>