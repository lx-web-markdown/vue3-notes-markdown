<template>
  <div>
    <vue-office-pdf
      :src="pdf"
      style="height: 100vh"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePdf from '@vue-office/pdf';

const pdf = ref('/AllFiles/工作随笔/手写签名文档.pdf');

const renderedHandler = () => {
  console.log('渲染完成');
};

const errorHandler = () => {
  console.log('渲染失败');
};
</script>

<style scoped></style>
