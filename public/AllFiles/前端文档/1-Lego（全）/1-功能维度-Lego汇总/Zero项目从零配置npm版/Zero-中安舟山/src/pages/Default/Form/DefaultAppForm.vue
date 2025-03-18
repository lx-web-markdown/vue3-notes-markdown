<template>
    <form-page
      ref="formPage"
      :spaceId='spaceId'
      :app="$route.params.app"
      :module="$route.query.module"
      :form="$route.params.form"
      :node="$route.query.node"
      :edit="$route.query.edit"
      :disableCrumb="false"
      bottomButtonRender
      @slave-table-init="handleSlaveTableInit"
    />
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  name: 'DefaultAppForm',
  data() {
    return {
      spaceId: this.$route.params.spaceUri
        ? window.AY.getSpaceIdByUri(this.$route.params.spaceUri)
        : window.AY.getSpaceId(),
      // options: {
      //   table: 'dfmaindefault',
      //   field: 'mainzifuchuan',
      //   value: 'sfsdfsdfsdfsdfsdfsdfs',
      //   isMagnifier: false,
      // },
    };
  },
  components: {
    FormPage,
  },
  methods: {
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      if (['CANCEL', 'DATAFLOW_CANCEL', 'WORKFLOW_CANCEL', 'SAVE_WORKFLOW'].indexOf(action) > -1) {
        next();
      } else {
        validate().then((result) => {
          if (result) {
            next();
          }
        });
      }
      console.log(ctx, action, formData, validate, next, 'action, formData, validate, next');
      this.$router.back(-1);
    },
    handleSlaveTableInit(ctx, { masterTableId, slaveTableId, slaveInfo }) {
      console.log(masterTableId, slaveTableId, slaveInfo, 'masterTableId, slaveTableId, slaveInfo');
    },
  },
};
</script>

<style lang="scss">
</style>
