<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { AppView, ComponentxPlugin } from '@qycloud/lego';
import XViewColumnOperate from './ColumnView/XViewColumnOperate.vue';

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
    ViewColumnOperate: XViewColumnOperate,
  },
  components: {
    AppView,
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
