<template>
  <el-button class="button" type="primary" @click="handleClick">点击打开弹窗</el-button>
</template>

<script>
import { openFormDialog } from '@qycloud/lego';
import MyFormPage from './ReplaceField/MyFormPage.vue';

export default {
  name: 'form-dialog',
  methods: {
    handleClick() {
      openFormDialog(
        {
          app: 'GeZhongZiDuanZhuCong',
          module: 'information',
          form: '123',
          node: '',
          edit: '1',
          spaceId: 'preCeShiQiYe',
        },
        {
          title: '定制字段', // 弹窗标题
          formComponent: MyFormPage, // 弹窗内容组件(可不传)
        },
        // 底部按钮执行完成后回调
        (type) => {
          console.log(type);
          // this.$store.commit("refreshData");
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin: 50px 0 0 50px;
}
</style>
