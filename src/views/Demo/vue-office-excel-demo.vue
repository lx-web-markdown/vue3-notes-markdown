<template>
  <div>
    <vue-office-excel
      :src="excel"
      style="height: 100vh"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel';
//引入相关样式
import '@vue-office/excel/lib/index.css';

const excel = ref('/AllFiles/所有文件类型/2023年度套餐方案.xlsx');

const renderedHandler = () => {
  console.log('渲染完成');
};

const errorHandler = () => {
  console.log('渲染失败');
};
</script>

<style scoped></style>
