<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @form-operation="handleFormOperation"
    />
  </div>
</template>

<script>
//  export { default as DesignerSlaveView } from '../../legoNext/src/service/components/form/Slave/src/Index.vue';
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import CustomeSlave from './CustomeSlave.vue';

Vue.use(ComponentxPlugin);
export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  xComponents: {
    'slave': CustomeSlave,
  },
  data() {
    return {
      app: 'GeZhongZiDuanZhuCong',
      module: 'information',
      form: '132',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    /**
     * @param {Object} ctx 上下文
     * @param {Object} actionParams 回调参数
     * @param {String} actionParams.action 按钮类型
     * @param {String} actionParams.next 按钮默认处理事件
     * @param {String} actionParams.buttonTitle 按钮名称
     * @param {String} actionParams.params 按钮带出相关数据

     */
    handleFormOperation(ctx, {
      action, next, buttonTitle, params,
    }) {
      if (action === 'default' && buttonTitle === '自定义按钮') {
        alert('这是一个自定义按钮');
      }
      // console.log('form on operation:', ctx, action, next, buttonTitle, params);
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
