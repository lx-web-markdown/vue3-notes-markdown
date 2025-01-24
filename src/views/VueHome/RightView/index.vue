<script setup lang="ts">
import { ref } from "vue";
import MarkdownView from "@/components/MarkdownComp.vue";
import About from "../AboutView/index.vue";
import myBus from "@/utils/myBus.ts";

const markdownFilePath = ref("");

myBus.on("showFilePath", (data: any) => {
  console.log("Event Received:", data, data.fullPath);
  if (data.type === "file") {
    let result = data.fullPath.replace("./public/", "");
    markdownFilePath.value = result;
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
  background-color: #FFF;

  .scrollbar-container {
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 20px;

    height: calc(var(--lx-main-container-height) - 5px - 5px);
  }
}
</style>
