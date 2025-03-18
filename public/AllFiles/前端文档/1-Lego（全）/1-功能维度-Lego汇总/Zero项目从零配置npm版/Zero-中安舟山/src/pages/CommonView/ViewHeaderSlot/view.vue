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
import CustomeHeaderSlot from './CustomeViewHeaderSlot.vue';

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
  xComponents: {
    ViewTableHeaderSlot: CustomeHeaderSlot,
  },
  components: {
    AppView,
  },
  methods: {
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      this.$router.push(`${data.url}`);
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
