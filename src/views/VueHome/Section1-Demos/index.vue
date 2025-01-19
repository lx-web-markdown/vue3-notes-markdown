
<script setup lang="ts">
import { ref } from 'vue'
import MarkdownView from '@/components/MarkdownComp.vue'

const markdownFilePath = ref('')

markdownFilePath.value = '/Vue3基础/Vue3 env.d.ts文件/Vue3中env.d.ts文件.md';

const change = () => {
  markdownFilePath.value = '/Vue3基础/defineProps/defineProps.md';
}

</script>

<template>
  <div>
    我是ddd
  </div>

  <button @click="change">切换</button>

  <MarkdownView :markdown-file-path="markdownFilePath" />
</template>


<style scoped>

</style>