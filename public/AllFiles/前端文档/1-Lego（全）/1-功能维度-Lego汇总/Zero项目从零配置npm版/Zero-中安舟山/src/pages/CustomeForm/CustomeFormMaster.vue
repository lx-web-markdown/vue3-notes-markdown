<template>
    <form-page
      :spaceId='spaceId'
      :app="app"
      :module="module"
      :form="form"
      :edit="edit"
      bottomButtonRender
      @form-action="onFormAction"
      @field-value-changed="onFieldValueChanged"
    />
</template>

<script>
import { FormPage } from '@qycloud/lego';
// import Vue from 'vue';
// import ZhongHuaMaster from './Master.vue';
// import Dialog from './Dialog.vue';

// Vue.use(ComponentxPlugin);

export default {
  name: 'ZhongHuaPageMaster',
  // xComponents: {
  //   master: ZhongHuaMaster,
  // },
  data() {
    return {
      app: 'KeTianBiTianKeXuan',
      module: 'information',
      form: '199',
      edit: '0',
      spaceId: 'APICeShiQiYe',
    };
  },
  components: {
    FormPage,
  },
  methods: {
    onFieldValueChanged(ctx, { table, field, value }) {
      console.log('field value changed:', ctx, table, field, value);
    },
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      if (['CANCEL', 'DATAFLOW_CANCEL', 'WORKFLOW_CANCEL', 'SAVE_WORKFLOW'].indexOf(action) > -1) {
        next();
        this.$router.back(-1);
      } else {
        validate().then((result) => {
          if (result) {
            next().then(() => {
              this.$router.back(-1);
            });
          }
        });
      }
      console.log(ctx, action, formData, validate, next, 'action, formData, validate, next');
    },
  },
};
</script>

<style lang="scss">
.button-edit {
    position: absolute;
    top: 104px;
    right: 200px;
    min-width: 80px;
    height: 32px;
    padding: 0 15px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d8dde4;
    background: #fff;
    color: #596b89;

    .iconfont {
      font-size: 10px;
      text-align: center;
    }

    .edit {
      font-size: 14px;
      margin-left: 6px;
    }
}
.button-edit:hover {
    cursor: pointer;
    background-color: #4680ff;
    color: #fff;
}
.dialog-button {
    position: absolute;
    top: 104px;
    right: 100px;
    min-width: 80px;
    height: 32px;
    padding: 0 15px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #d8dde4;
    background: #fff;
    color: #596b89;
    font-size: 14px;
}
.dialog-button:hover {
    cursor: pointer;
    background-color: #4680ff;
    color: #fff;
}
</style>
