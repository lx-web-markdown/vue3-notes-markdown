<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from 'vue-router';
import myBus from "@/utils/myBus.ts";

interface Tree {
  name: string;
  type: string;
  level: number;
  fullPath: string;
  children?: Tree[];
}

const defaultProps = {
  children: "children",
  label: "name",
};

const route = useRoute();
const dataSrouce = ref<Tree[]>([]);

watch(() => route.fullPath, () => {  
  let tempFilePath = '/FileListTXT/fileList_Vue3.txt';
  // 根据路由，来区分不同的文件加载
  if (route.fullPath.indexOf("vue2") !== -1) {
    tempFilePath = '/FileListTXT/fileList_Vue2.txt';
  } else if (route.fullPath.indexOf("vue3") !== -1) {
    tempFilePath = '/FileListTXT/fileList_Vue3.txt';
  } else if (route.fullPath.indexOf("html") !== -1) {
    tempFilePath = '/FileListTXT/fileList_HTML.txt';
  } else if (route.fullPath.indexOf("css") !== -1) {
    tempFilePath = '/FileListTXT/fileList_CSS.txt';
  } else if (route.fullPath.indexOf("js") !== -1) {
    tempFilePath = '/FileListTXT/fileList_JS.txt';
  }
  console.log("route.fullPath", route.fullPath);
  console.log("tempFilePath", tempFilePath);
  //
  getFileList(tempFilePath);
});

const getFileList = async (_fileListPath: string) => {
  try {
    const response = await fetch(_fileListPath); // 根据 public 下的路径加载文件
    if (response.ok) {
      const text = await response.text();
      const fileList = JSON.parse(text);
      if (text && fileList && fileList.length > 0) {
        dataSrouce.value = fileList;
      } else {
        throw new Error("Failed to load fileList.txt");
      }
    } else {
      console.error("Failed to load markdown file:", response.status);
    }
  } catch (error) {
    console.error("Error loading markdown file:", error);
  }
};

getFileList('/FileListTXT/fileList_Vue3.txt');

const handleNodeClick = (item: Tree) => {
  // console.log("handleNodeClick", item);
  if (item.type === "file") {
    // 发射事件
    myBus.emit("showFilePath", item);
  }
};
</script>

<template>
  <div class="left-sidebar">
    <el-scrollbar class="scrollbar-container">
      <el-tree
        style="max-width: 600px"
        :data="dataSrouce"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.left-sidebar {
  width: 100%;
  height: 100%;
  background-color: #FFF;

  .scrollbar-container {
    // border-right: 1px solid green;
    background-color: transparent;
    height: var(--lx-main-container-height);

    .scrollbar-item {
      height: 30px;
      width: 100%;
      border-bottom: 1px solid yellowgreen;
    }
  }
}
</style>
