<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :openFormCallback="openFormCallback"
      :onViewActionCallBack="onViewActionCallBack"
      :toggleLabelCallBack="toggleLabelCallBack"
    />
  </div>
</template>

<script>
import { AppView } from '@qycloud/lego';

export default {
  name: 'CommonView',
  data() {
    return {
      module: 'information',
      appId: 'ZhuCongBiao',
      spaceId: 'preCeShiQiYe',
    };
  },
  components: {
    AppView,
  },
  methods: {
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      console.log('ctx===', ctx, 'data===', data);
    },
    // view 列表数据操作按钮事件拦截
    onViewActionCallBack(ctx, actionParams) {
      const {
        action, masterTableId, buttonName, radioProps, multipleProps, next,
      } = actionParams;
      console.log(ctx, action, masterTableId, buttonName, radioProps, multipleProps, next);
    },
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
  },
};
</script>

<style lang="scss">
.common {
  &-view {
    height: 100%;
  }
}
</style>
