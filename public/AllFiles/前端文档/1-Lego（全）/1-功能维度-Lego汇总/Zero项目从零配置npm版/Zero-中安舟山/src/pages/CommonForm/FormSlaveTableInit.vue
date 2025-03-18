<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      @slave-table-init="handleSlaveTableInit"
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
    };
  },
  methods: {
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
