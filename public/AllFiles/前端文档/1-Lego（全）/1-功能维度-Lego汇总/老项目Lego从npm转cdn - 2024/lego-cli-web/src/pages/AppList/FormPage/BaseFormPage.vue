<template>
  <div class="base-page">
    <base-form :module="module"
               :app="app"
               :form="form"
               :isCopy="isCopy"
               :spaceId="spaceId"
               :edit="edit"
               :after-form-finished="afterFormFinished"
               @form-action="onFormAction"
               @on-init="onInitCallBack"
               @slave-form-action="onSlaveFormAction" />
  </div>
</template>

<script>
import Vue from 'vue';
import { ComponentxPlugin } from '@qycloud/lego';
import BaseForm from './BaseForm.vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'BaseFormPage',
  data() {
    return {
      count: 1,
    };
  },
  props: {
    'module': String,
    'app': String,
    'spaceId': String,
    'form': Number || String,
    'isCopy': String,
    'edit': String,
    'label': String,
    'node': String
  },
  components: {
    BaseForm,
  },
  methods: {
    onFormAction(ctx, {
      action,
      formData,
      validate,
      next,
    }) {
      console.log('ctx, formDatactx, formData', ctx, formData);
      const workNode = ['WorkNode_1', 'WorkNode_2', 'WorkNode_3', 'WorkNode_4'];
      if (
        [
          'CANCEL',
          'DATAFLOW_CANCEL',
          'WORKFLOW_CANCEL',
          'SAVE_WORKFLOW',
        ].indexOf(action) > -1 
        || (action === 'WORKFLOW_EXECUTE' && this.app === 'YinHuanPaiChaZhiLi')
      ) {
        next();
      } else if (
        action === 'WORKFLOW_EXECUTE'
        && formData.shigongzuoyeliucheng.property.appId === 'PuTongZuoYeXuKe'
        && workNode.indexOf(this.node) > -1
      ) {
        const getData = formData.shigongzuoyeliucheng.master;
        const zuzhimingcheng = getData.zuzhimingcheng.value;
        console.log(zuzhimingcheng);
        const suoshuzuzhi = getData.suoshuzuzhi.value.split('#@')[0];
        const zuoyeleixingdalei = getData.zuoyeleixingxiaolei.value.split('#@')[0];
        const zuoyekaishishijian = getData.zuoyekaishishijian.value.split(' ')[0];
        const zuoyejieshushijian = getData.zuoyejieshushijian.value.split(' ')[0];
        const shifoushejiyejianzuo = getData.shifoushejiyejianzuo.value.split(' ')[0];
        const tezhongshebeianzhuan = getData.tezhongshebeianzhuan.value.split(' ')[0];
        if (shifoushejiyejianzuo === '是' || tezhongshebeianzhuan === '是') {
          ctx.setFieldValue({
            table: 'shigongzuoyeliucheng',
            field: 'shifouxuyaoshengji',
            value: '是',
          });
          validate().then((result) => {
            if (result) {
              next();
            }
          });
        } else if (shifoushejiyejianzuo !== '是') {
          this.$http.get(
              '/sdkApi/ohsms/custom/works/getStatus'
              + `?base=${suoshuzuzhi}&type=${zuoyeleixingdalei}`
              + `&start=${zuoyekaishishijian}&end=${zuoyejieshushijian}`
            )
            .then((res) => {
              if (res.data.result.isLimit === '是') {
                return this.$message('本时间段内已禁止施工,请重新选择施工时间');
              }
              if (res.data.result.isLimit !== '是') {
                ctx.setFieldValue({
                  table: 'shigongzuoyeliucheng',
                  field: 'shifouxuyaoshengji',
                  value: res.data.result.isUpgrade,
                });
                if (res.data.result.isUpgrade === '是' && this.count === 1) {
                  this.count++;
                  return;
                }
                validate().then((result) => {
                  if (result) {
                    next();
                  }
                });
              }
            });
        }
      } else {
        validate().then((result) => {
          if (result) {
            next();
          }
        });
      }
    },
    afterFormFinished(ctx) {
      this.$router.push({
        path: `/lego/${this.module}/${this.app}`,
        query: {
          labelId: this.label,
        },
      });
    },
    onInitCallBack(ctx, type, nodeId) {
      const style = 'width: 100px;height: 30px;background: red';
    },
    onSlaveFormAction(ctx, { formData, validate, next }) {
      validate().then((result) => {
        if (result) {
          next();
        } else {
          console.log('平台验证不通过');
        }
      });
    },
  },
};
</script>

<style lang="scss">
.base-page {
  height: 100%;
}
</style>
