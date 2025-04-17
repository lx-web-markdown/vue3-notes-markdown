<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownView from '@/components/MarkdownComp/MarkdownComp.vue';
import About from './AboutView/index.vue';
import myBus from '@/utils/myBus.ts';
import { ElMessage } from 'element-plus';

const route = useRoute();
const markdownFilePath = ref('');

watch(
  () => route.fullPath,
  () => {
    // 清空markdownFilePath
    markdownFilePath.value = '';
  }
);

myBus.on('showFilePath', (data: any) => {
  if (data.type === '.md' && data.fullPath.endsWith('.md')) {
    console.log('markdownFilePath = ', data.fullPath);
    markdownFilePath.value = data.fullPath;
  }
  // 其他文件类型
  else {
    ElMessage.warning('文件暂未支持！！！');
  }
});
</script>

<template>
  <div class="right-main-view">
    <el-scrollbar class="scrollbar-container">
      <MarkdownView v-if="markdownFilePath" :markdown-file-path="markdownFilePath" />
      <About v-else />
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.right-main-view {
  background-color: #fff;

  .scrollbar-container {
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 20px;

    height: calc(var(--lx-main-container-height) - 5px - 5px);
  }
}
</style>
