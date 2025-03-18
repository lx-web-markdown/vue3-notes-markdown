<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @after-operation="handleAfterOperation"
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
      app: 'ceshigangchuangjiand',
      module: 'workflow',
      form: '636676',
      node: 'WorkNode_2',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    handleFormOperation(ctx, { action, next, buttonTitle }) {
      next();
      console.log('form on operation:', ctx, action, buttonTitle, next);
    },
    handleAfterOperation(type, ctx) {
      console.log(type, ctx, '啊啊啊');
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
