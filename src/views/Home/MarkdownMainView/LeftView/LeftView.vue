<!--
  LeftView组件 - 文件树侧边栏
  
  用于显示文件树结构，根据路由加载不同类型的文件列表
  当点击Markdown文件时，会触发showFilePath事件
-->
<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useFileTree } from './composables/useFileTree';

// 使用可组合函数来处理文件树相关逻辑
const { 
  fileTree, 
  loadFileTreeById,
  handleNodeClick 
} = useFileTree();

// 树形控件配置
const defaultProps = {
  children: "children",
  label: "name",
};

// 监听路由变化，加载相应文件树
const route = useRoute();
watch(() => route.fullPath, () => {
  console.log('route.fullPath = ', route.fullPath);
  // 接受参数的方式依然是：`$route.params.参数值`
  console.log('route.params.id = ', route.params.id);
  const paramId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  loadFileTreeById(paramId || '');
});

// 组件挂载时初始加载
onMounted(() => {
  console.log('route.fullPath = ', route.fullPath);
  // 从路由路径中提取ID
  const paramId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  loadFileTreeById(paramId || '');
});
</script>

<template>
  <div class="left-sidebar">
    <el-scrollbar class="scrollbar-container">
      <el-tree
        class="file-tree"
        :data="fileTree"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
