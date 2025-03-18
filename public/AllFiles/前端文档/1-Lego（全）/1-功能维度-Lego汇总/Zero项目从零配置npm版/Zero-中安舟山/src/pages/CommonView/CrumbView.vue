<template>
  <div class="crumb-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :isCustomShowCrumb="isCustomShowCrumb"
      :crumbClick="crumbClick"
      :toggleLabelCallBack="toggleLabelCallBack"
      :openFormCallback="openFormCallback"
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
      isCustomShowCrumb: 1, // 是否显示面包屑
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
    // 面包屑事件拦截
    crumbClick(crumb) {
      console.log(crumb, 'crumb');
    },
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
  },
};
</script>

<style lang="scss">
.crumb {
  &-view {
    height: 100%;
  }
}
</style>
