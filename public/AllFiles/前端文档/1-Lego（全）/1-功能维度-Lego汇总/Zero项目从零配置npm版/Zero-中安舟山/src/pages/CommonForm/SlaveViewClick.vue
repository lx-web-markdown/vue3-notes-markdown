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
import XSlave from './XSlave.vue';

Vue.use(ComponentxPlugin);


export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  xComponents: {
    'slave': XSlave,
  },
  data() {
    return {
      app: 'ZhuCongBiao',
      module: 'information',
      form: '278909',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    onSlaveFormAction(ctx, {
      formData, validate, next, slaveCtx, serviceId,
    }) {
      validate().then((result) => {
        if (result) {
          next();
        } else {
          console.log(result, '从表验证失败');
        }
      });
      console.log(formData, slaveCtx, serviceId);
    },
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      console.log(ctx, action, formData, validate, next);
      if (
        [
          'CANCEL',
          'DATAFLOW_CANCEL',
          'WORKFLOW_CANCEL',
          'SAVE_WORKFLOW',
        ].indexOf(action) > -1
      ) {
        return next();
      }
      return validate().then((result) => {
        if (result) {
          return next();
        }
        return '';
      });
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
