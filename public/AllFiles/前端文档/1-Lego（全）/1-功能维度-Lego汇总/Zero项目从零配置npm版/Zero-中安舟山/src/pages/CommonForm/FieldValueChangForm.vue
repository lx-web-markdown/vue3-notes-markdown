<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @field-value-changed="onFieldValueChanged"
      @slavefield-value-changed="onSlaveFieldValueChanged"
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
    onFieldValueChanged(ctx, { table, field, value }) {
      console.log('field value changed:', ctx, table, field, value);
    },
    // slaveServiceId为行编辑开启时使用
    onSlaveFieldValueChanged(ctx, {
      table, field, value, slaveServiceId,
    }) {
      console.log('field value changed:', ctx.slaveLineEditService, table, field, value, slaveServiceId);
      if (field === 'danxuan' && value === '同意') {
        ctx.setFieldValue({
          table,
          field: 'shuzi',
          value: '444444',
          slaveServiceId,
        });
      }
      // if (field === 'danxuan' && value === '不同意') {
      //     ctx.setFieldValue({
      //     table,
      //     field: 'shuzi',
      //     value: '333',
      //     slaveServiceId
      //   })
      // }
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
