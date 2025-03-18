<template>
  <div class="common-form">
    <form-page
      ref="Form"
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @slave-list-data-change="handleSlaveListDataChange"
    >
    </form-page>
  </div>
</template>

<script>
import { FormPage, ComponentxPlugin, DesignerFieldBox } from '@qycloud/lego';
import Vue from 'vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  data() {
    return {
      visible: false,
      app: 'wfdanxuanshujuyuanzh',
      module: 'workflow',
      // module: 'information',
      form: '637791',
      node: '',
      edit: '1',
      spaceId: 'nanjinganyuankeji',
      appCtx: null,
      value: [],
      extendParams: {
        slaveAddSelectCallBack: () => {
          console.log(333);
        },
      },
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
    handleSlaveListRowClick(row, idx) {
      console.log(row, 'rowwww');
      console.log(idx, 'idxxxx');
    },
    handleSlaveListDataChange(ctx, params) {
      console.log('handleSlaveListDataChange');
      // console.log(ctx);
      // console.log(params);
    },
    afterFormFinished(ctx, next, nodeId) {
      console.log(':afterFormFinished="afterFormFinished"');
      console.log(ctx, next, nodeId);
    },
    handleOnInit(ctx) {
      console.log('form on init:', ctx);
      this.appCtx = ctx;
      setTimeout(() => {
        ctx.setFieldValue({ table: 'gangweikuozhanxinxi4', field: 'zifuchuan05', value: '8888' });
        console.log('设置了');
      }, 1000);
    },
    handleClick() {
      this.visible = true;
    },
    handleRowClick(ctx) {
      console.log(ctx, 'ctx');
    },

    onInitForm(data) {
      console.log(data, 'init---');
    },

    handleFormOperation(ctx, params) {
      console.log(params);
      // debugger
      // this.appCtx = ctx;
      // next({noValidate: true});
      // console.log('form on operation:', ctx, action, next, title, params);
    },
    onSlaveFormAction(ctx, {
      formData, validate, next, slaveCtx, serviceId,
    }) {
      /* validate().then((result) => {
        if (result) {
          next();
        } else {
          console.log(result, '从表验证失败');
        }
      }); */
      console.log(formData, slaveCtx, serviceId, 'onSlaveFormAction');
    },
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      console.log(ctx.store.state.table);
      return;

      // return;
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
