<script setup lang="ts">
import { ref } from "vue";
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

const dataSrouce = ref<Tree[]>([]);

const getFileList = async () => {
  try {
    const response = await fetch("/fileList.txt"); // 根据 public 下的路径加载文件
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

getFileList();

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
    border-right: 1px solid green;
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
