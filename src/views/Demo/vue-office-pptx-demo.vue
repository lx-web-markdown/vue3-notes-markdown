<template>
  <div>
    <vue-office-pptx
      :src="pptx"
      style="height: 100vh"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePptx from '@vue-office/pptx';

const pptx = ref('/AllFiles/所有文件类型/我的PPT.pptx');

const renderedHandler = () => {
  console.log('渲染完成');
};

const errorHandler = () => {
  console.log('渲染失败');
};
</script>

<style scoped></style>
