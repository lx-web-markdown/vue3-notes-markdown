<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      :extendParams="extendParams"
      @form-action="onFormAction"
      @on-init="handleOnInit"
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
      app: 'ZhuCongBiao',
      module: 'information',
      form: '278908',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
      extendParams: {
        customeBottomButtons: {
          // 格式aa_bb  aa为保存数据的方式，bb为自身项目区分按钮类型
          saveDataflow_zngc: {
            name: '给字符串字段赋值123',
            customeType: 'setFieldValue',
          },
        },
      },
    };
  },
  methods: {
    handleOnInit(ctx) {
      ctx.setFieldProperty({
        table: 'zhucongbiaozhubiao',
        field: 'zifuchuan',
        property: 'changeable',
        value: false,
      });
    },
    onFormAction(ctx, {
      action, formData, validate, next, customeButtonParam,
    }) {
      console.log(ctx, action, formData, validate, next, customeButtonParam);
      if (action === 'DATAFLOW_SAVE' && customeButtonParam === 'setFieldValue') {
        ctx.setFieldValue({
          table: 'zhucongbiaozhubiao',
          field: 'zifuchuan',
          value: 'zngcddd9995555599999',
        });
        //   next();
        setTimeout(() => {
          next();
        }, 300);
        //   validate().then(result => {
        //       if (result) {
        //           next()
        //       }
        //   })
      } else {
        next();
      }
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
