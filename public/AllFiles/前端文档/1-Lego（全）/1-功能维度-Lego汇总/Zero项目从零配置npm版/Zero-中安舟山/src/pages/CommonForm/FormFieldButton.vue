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
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import XFieldBox from './XFieldBox.vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  xComponents: {
    'field-field-box': XFieldBox,
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
      // 监听某个字段的变化时给其他字段赋值
    //   if (field === 'zifuchuan') {
    //       ctx.setFieldValue({
    //           table: '', // 表id
    //           field: '', // 需要赋值的字段id
    //           value: '' // 需要赋值的值
    //       })
    //   }
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
