<template>
  <div class="common-form">
    <form-page
      ref="customeForm"
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      :extendParams="extendParams"
      @crumb-item-click="onCrumbItemClick"
      @slot-show="handleSlotShow"
      @form-operation="handleFormOperation"
    >
      <template>
        <div class="slot-form" v-if="show">
          <form-page
            :module="subModule"
            :app="subAppId"
            :form="subForm"
            :node="subNode"
            :edit="subEdit"
            :spaceId="subSpaceId"
            :extendParams="subExtendParams"
            disableFoot
            disableNav
            disableTopButton
            disableCrumb
          />
        </div>
      </template>
    </form-page>
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
      app: 'wuliaojichuxinxi',
      module: 'information',
      form: '10',
      node: '',
      edit: '0',
      spaceId: 'zhinenggongchang',
      extendParams: {},
      subModule: '',
      subAppId: '',
      subForm: '',
      subEdit: '',
      subNode: '',
      subSpaceId: '',
      subExtendParams: {},
      show: false,
    };
  },
  methods: {
    onCrumbItemClick(args, ctx) {
      console.log('crumb item click:', args, ctx);
    },
    handleSlotShow(slotParams) {
      // slotParams不为undefined时为点击子应用查看或者编辑时触发，反之为form表单初始化时候触发
      if (slotParams) {
        this.subModule = slotParams.params.module;
        this.subNode = slotParams.params.node || '';
        this.subAppId = slotParams.params.app;
        this.subForm = slotParams.params.form;
        this.subSpaceId = slotParams.params.spaceId;
        this.subExtendParams = {
          isOnlySlave: true,
          ...slotParams.params,
        };
        if (this.show) {
          this.show = false;
          this.$nextTick(() => {
            this.show = true;
          });
        } else {
          this.show = true;
        }
        console.log(slotParams, 'zero');
      } else {
        console.log('初始化');
      }
    },
    handleFormOperation(ctx, {
      action, next, title, params,
    }) {
      console.log('form on operation:', ctx, action, next, title, params);
      if (action === 'SUBAPPVIEW') {
        this.extendParams = {
          slotButtonType: 'SUBAPPVIEW',
        };
        this.subEdit = '0';
      } else if (action === 'SUBAPPEDIT') {
        this.extendParams = {
          slotButtonType: 'SUBAPPEDIT',
        };
        this.subEdit = '1';
      } else {
        this.show = false;
      }
      next();
    },
  },
};
</script>

<style lang="scss">
.common-form {
  width: 100%;
  height: 100%;

  .slot-form {
    margin-top: 20px;
  }
}
</style>
