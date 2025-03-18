<template>
  <div class="ui-custom-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      bottomButtonRender
      disableNav
      disableTopButton
      disableCrumb
      @form-action="onFormAction"
    />
  </div>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  name: 'UICustomForm',
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
.ui-custom-form {
  width: 100%;
  height: 100%;
}
</style>
