<script setup lang="ts">
import { ref } from "vue";
import MarkdownView from "@/components/MarkdownComp.vue";

import myBus from "@/utils/myBus.ts";

const markdownFilePath = ref("");


myBus.on("showFilePath", (data: any) => {
  console.log("Event Received:", data, data.fullPath);
  if (data.type === 'file') {
    let result = data.fullPath.replace("./public/", "");
    markdownFilePath.value = result;
  }
});
</script>

<template>
  <div class="right-main-view">
    <MarkdownView :markdown-file-path="markdownFilePath" />
  </div>
</template>

<style scoped lang="scss">
.right-main-view {
  background-color: aqua;
}
</style>
