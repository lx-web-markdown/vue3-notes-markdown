<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :exportConfirmCallBack="exportConfirmCallBack"
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
      appId: 'GeZhongZiDuanZhuCong',
      spaceId: 'preCeShiQiYe',
    };
  },
  components: {
    AppView,
  },
  methods: {
    exportConfirmCallBack(actionParams) {
      console.log('===>>>>', actionParams.params);
      // console.log(JSON.parse(actionParams.params.showFields))
      actionParams.next(actionParams.params);
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
