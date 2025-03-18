<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :openFormCallback="openFormCallback"
      :toggleLabelCallBack="toggleLabelCallBack"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { AppView, ComponentxPlugin } from '@qycloud/lego';
import XViewDataTable from './XViewDataTable.vue';

Vue.use(ComponentxPlugin);


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
  xComponents: {
    ViewDataTable: XViewDataTable,
  },
  methods: {
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      console.log('ctx===', ctx, 'data===', data);
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
