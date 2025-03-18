<template>
  <div class="common-form">
    <form-page
      ref="formPage"
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @crumb-item-click="onCrumbItemClick"
    />
  </div>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  data() {
    return {
      app: 'GeZhongZiDuanZhuCong',
      module: 'information',
      form: '123',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    // 以点击面包屑事件为例
    onCrumbItemClick(args, ctx) {
      console.log(args, ctx, 'args, ctx');
      console.log(this.$refs.formPage.getFieldsValue());
    },
  },
};
</script>

<style lang="scss">
.common-form {
  width: 100%;
  height: 100%;
}
</style>
