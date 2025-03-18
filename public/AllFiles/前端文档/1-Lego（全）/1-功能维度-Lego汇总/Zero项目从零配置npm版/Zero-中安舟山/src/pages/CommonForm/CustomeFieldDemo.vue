<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import CustomeField from './CustomeField/CustomeField.vue';

Vue.use(ComponentxPlugin);


export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  xComponents: {
    'DesignerFieldBox': CustomeField, // form新设计器
  },
  data() {
    return {
      app: 'anquanbaojingfankuig',
      module: 'workflow',
      form: '2365',
      node: '',
      edit: '',
      spaceId: 'yulinjingjijishukaif',
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">
.common-form {
    width: 100%;
    height: 100%;
}
</style>
