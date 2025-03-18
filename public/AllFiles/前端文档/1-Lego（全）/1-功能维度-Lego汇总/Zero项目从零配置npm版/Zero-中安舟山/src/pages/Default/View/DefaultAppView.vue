<template>
  <div class="app-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :spaceUri="spaceUri"
      :openFormCallback="openFormCallback"
      :toggleLabelCallBack="toggleLabelCallBack"
      :onViewActionCallBack="onViewActionCallBack"
    />
  </div>
</template>

<script>
import { AppView, openFormDialog } from '@qycloud/lego';

export default {
  name: 'DefaultAppView',
  data() {
    return {
      spaceId: this.$route.params.spaceUri
        ? window.AY.getSpaceIdByUri(this.$route.params.spaceUri)
        : window.AY.getSpaceId(),
    };
  },
  props: ['module', 'appId', 'spaceUri'],
  components: {
    AppView,
  },
  methods: {
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
    onViewActionCallBack(ctx, actionParams) {
      console.log(ctx, actionParams, 'ctx, actionParams');
    },
    openFormCallback(ctx, data) {
      console.log(ctx, data, 'openForm');
      const formId = data.id || data.recordId;
      const formParams = {
        module: ctx.module, // 所属模块
        app: ctx.appId, // 应用 id
        spaceId: ctx.spaceId,
        form: formId || '', // form id
        edit: formId ? '0' : '1', // 是否为编辑模式
        isCopy: data.isCopy || false, // 是否是复制
        node: data.node || '', // 流程节点
      };
      const formOptions = {
        title: ctx.app.title,
      };
      const formCallback = (type) => {
        console.log(type, 'type');
        ctx.$store.commit('refreshData');
      };
      openFormDialog(formParams, formOptions, formCallback);
    },
  },
  created() {
    console.log(this.spaceId, 'spaceId');
  },
};
</script>

<style lang="scss">
.app-view {
  height: 100%;
}
</style>
