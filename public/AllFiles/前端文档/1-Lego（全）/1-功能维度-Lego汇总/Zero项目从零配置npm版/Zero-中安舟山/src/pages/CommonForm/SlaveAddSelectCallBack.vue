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
      form: '278920',
      node: '',
      edit: '0',
      spaceId: 'preCeShiQiYe',
      extendParams: {
        slaveAddSelectCallBack: this.slaveAddSelectCallBack, // 批量选择
        slaveCreateCallBack: this.slaveCreateCallBack, // 批量生成
      },
    };
  },
  methods: {
    /**
         * @param {Object} ctx 上下文 保存按钮禁用状态可通过ctx.saving = false 解除
         * @param {Array} listData 当前列表数据
         * @param {Array} multipleSelection 当前勾选数据
         * @param {Array} conditions 条件组
         * @param {Object} message 保存提示弹窗,可通过message.close()手动关闭
         * @param {Object} params 原生逻辑接口入参
         * @param {Function} next 平台内部默认保存添加逻辑
         * @param {Function} close 关闭弹窗事件(内部包含刷新该从表逻辑)
     */
    slaveAddSelectCallBack({
      ctx, listData, multipleSelection, conditions, next, message, close, params
    }) {
      console.log(listData, multipleSelection, conditions, message, params);
      setTimeout(() => {
        message.close();
        ctx.saving = false;
      }, 5000);
      // next();
    },

    /**
         * @param {Object} ctx 上下文
         * @param {Object} params 参数
         * @param {Function} next 平台内部默认保存添加逻辑
         * @param {Function} close 关闭弹窗事件(内部包含刷新该从表逻辑)
     */
    slaveCreateCallBack({
      ctx, params, next, close,
    }) {
      console.log(params);
      next();
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
