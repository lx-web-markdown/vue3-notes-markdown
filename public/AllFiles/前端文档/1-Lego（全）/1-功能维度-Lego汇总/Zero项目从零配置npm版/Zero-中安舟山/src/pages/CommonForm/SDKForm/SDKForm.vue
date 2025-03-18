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
      @slave-form-action="onSlaveFormAction"
      @slave-table-init="handleSlaveTableInit"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import FiledComponents from './FiledComponents.vue';

Vue.use(ComponentxPlugin);


export default {
  name: 'CommonForm',
  xComponents: {
    'field-field-box': FiledComponents, // 主从表详情页字段组件
    'FieldBox': FiledComponents, // view列表字段组件/从表列表字段组件
  },
  components: {
    FormPage,
  },
  data() {
    return {
      app: 'DFZhuBiaoformXiangQi',
      module: 'dataflow',
      form: '1',
      node: '',
      edit: '1',
      spaceId: 'APICeShiQiYe',
      extendParams: {
        slaveAddSelectCallBack: this.slaveAddSelectCallBack, // 批量选择
        slaveCreateCallBack: this.slaveCreateCallBack, // 批量生成
      },
    };
  },
  methods: {
    /**
     * @param {Object} ctx 上下文
     * @param {Array} listData 当前列表数据
     * @param {Array} multipleSelection 当前勾选数据
     * @param {Array} conditions 条件组
     * @param {Function} next 平台内部默认保存添加逻辑
     * @param {Function} close 关闭弹窗事件(内部包含刷新该从表逻辑)
     */
    slaveAddSelectCallBack({
      ctx,
      listData,
      multipleSelection,
      conditions,
      params,
      next,
      close,
    }) {
      console.log(listData, multipleSelection, conditions, params);
    //   next();
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
    //   next();
    },

    /**
     * @param {Object} ctx 上下文，可获取该组件内部的值和方法
     * @param {String} action 操作按钮类型
       关闭按钮：CANCEL
       dataflow取消：DATAFLOW_CANCEL
       dataflow保存：DATAFLOW_SAVE
       workflow取消：WORKFLOW_CANCEL
       workflow存草稿：SAVE_WORKFLOW
       workflow提交：WORKFLOW_EXECUTE
     * @param {Object} formData 表单数据
     * @param {Function} validate 表单验证方法（只有dataflow保存和workflow提交才需要执行，其余操作不需要进行验证）
     * @param {Function} next 表单提交及结束方法
     * ctx.getOneFieldValue(field)  获取主表详情中某个具体字段的值
     * ctx.setFieldProperty({field, property, value}) 改变主表详情中某个具体字段的属性
     * ctx.setFieldValue({table, field, value}) 设置主表详情中某个具体字段的值
     */
    // eslint-disable-next-line consistent-return
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      if (['CANCEL', 'DATAFLOW_CANCEL', 'WORKFLOW_CANCEL', 'SAVE_WORKFLOW'].indexOf(action) > -1) {
        return next();
      }
      validate().then((result) => {
        if (result) {
          next();
        }
      });
    },

    /**
     * @param {Object} ctx 主表上下文
     * @param {Object} action 按钮类型
     * @param {Object} formData 表单数据
     * @param {Function} validate 表单验证方法
     * @param {Function} next 表单提交及结束方法
     * @param {Function} slaveCtx 从表上下文 仅限行编辑时使用
     * @param {Function} serviceId 区分从表实例id 仅限行编辑时使用
     * slaveCtx.getOneFieldValue(field, serviceId)  获取从表详情中某个具体字段的值
     * slaveCtx.setFieldProperty({field, property, value, serviceId}) 改变从表详情中某个具体字段的属性
     * slaveCtx.setFieldValue({table, field, value, serviceId}) 设置从表详情中某个具体字段的值
     */
    onSlaveFormAction(ctx, {
      action, formData, validate, next, slaveCtx, serviceId,
    }) {
      console.log(ctx, action, formData, validate, next, slaveCtx, serviceId, 'ctx');
    },

    /**
     * @param {Object} ctx 上下文
     * @param {String} masterTableId 主表Id
     * @param {String} slaveTableId 当前从表id
     * @param {String} slaveInfo 当前从表信息
     */
    handleSlaveTableInit(ctx, { masterTableId, slaveTableId, slaveInfo }) {
      console.log(masterTableId, slaveTableId, slaveInfo, 'masterTableId, slaveTableId, slaveInfo');
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
