<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @on-init="handleOnInit"
      disableFoot
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
      app: 'xinshejiqidf',
      module: 'information',
      form: '43',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    handleOnInit(ctx) {
      ctx.setSlaveTableProperty({
        table: 'weiyixingyanzheng', // 主表id
        value: {
          // 子流程表id
          liuchengjiaochanghui: { status: 'all' },
        },
      });
      console.log('form on init:', ctx);
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
