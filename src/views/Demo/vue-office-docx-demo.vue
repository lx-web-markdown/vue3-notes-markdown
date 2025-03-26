<template>
  <div>
    <vue-office-docx :src="docx" style="height: 100vh" @rendered="rendered" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx';
//引入相关样式
import '@vue-office/docx/lib/index.css';

const docx = ref('/AllFiles/所有文件类型/互联网信息服务备案登记表.dotx');

const rendered = (e: any) => {
  console.log(e);
};
</script>

<style scoped></style>
