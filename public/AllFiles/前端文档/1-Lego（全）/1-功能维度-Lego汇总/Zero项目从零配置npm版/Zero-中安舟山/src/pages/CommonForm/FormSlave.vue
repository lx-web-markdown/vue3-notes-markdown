<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @slave-init="onSlaveInit"
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
      app: 'gangweikuozhanxinxiy',
      module: 'information',
      form: '665',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    /**
     * @param {Object} ctx
     * @param {Number} serviceId 从表行编辑添加初始化使用
     * ctx.getOneFieldValue(field, serviceId)  获取从表详情中某个具体字段的值
     * ctx.setFieldProperty({field, property, value, serviceId}) 改变从表详情中某个具体字段的属性
     * ctx.setFieldValue({table, field, value, serviceId}) 设置从表详情中某个具体字段的值
     */
    onSlaveInit(ctx, serviceId) {
      console.log(ctx, serviceId, 'ctx, serviceId');
      const params = {
        table: ctx.$slaveStore.state.table,
        field: 'wenben01',
        property: 'editable',
        value: '222',
      };
      console.log(params);
      ctx.setFieldProperty(params);
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
