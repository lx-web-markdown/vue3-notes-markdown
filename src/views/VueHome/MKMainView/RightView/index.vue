<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from 'vue-router';
import MarkdownView from "@/components/MarkdownComp.vue";
import About from "./AboutView/index.vue";
import myBus from "@/utils/myBus.ts";

const route = useRoute();
const markdownFilePath = ref("");

watch(() => route.fullPath, () => {
  // 清空markdownFilePath
  markdownFilePath.value = '';
});

myBus.on("showFilePath", (data: any) => {
  if (data.type === ".md") {
    let result = data.fullPath.replace("./public", "");
    console.log("Event Received:", data, data.fullPath);
    console.log("markdownFilePath = ", result);
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
