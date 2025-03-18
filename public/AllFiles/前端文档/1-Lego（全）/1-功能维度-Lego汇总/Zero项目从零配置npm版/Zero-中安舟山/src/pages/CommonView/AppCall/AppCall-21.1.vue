<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :onViewActionCallBack="onViewActionCallBack"
    />
  </div>
</template>

<script>
import { AppView } from '@qycloud/lego';
import { setAppBusBtnvalue } from './SetAppBusBtnValue';

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
    onViewActionCallBack(ctxInfo, actionParams) {
      // debugger;
      const {
        ctx,
        action,
        next,
        radioProps,
        multipleProps,
        config,
        masterTableId,
        buttonName,
      } = actionParams;
      // buttonName为后台配置的按钮的title
      if (action === 'app' && buttonName === '跨应用赋值') {
        // debugger;
        const { appConfig, appBusBtnData } = setAppBusBtnvalue(
          multipleProps,
          ctx.sourceData,
          config,
          this.appId,
          ctx.recordIds,
          this.module,
          this.spaceId,
          masterTableId,
        );
        const storageTitle = `appBusBtn${appConfig.linkApp.id}`;
        localStorage.setItem(storageTitle, JSON.stringify(appBusBtnData));
        console.log(appConfig, appBusBtnData, 'appConfig');
        const { isSlaveTable } = appConfig.linkTable;
        // 目标应用信息
        const targetAppId = 'zuiquandeziduan';
        const targetAppIdModule = 'workflow';
        const routeUrl = this.$router.resolve({
          path: `/AppCall/formPage?app=${targetAppId}&module=${targetAppIdModule}&appCall=${isSlaveTable ? '1' : '0'}`,
        });
        window.open(routeUrl.href, '_blank');
        // this.$router.push();
      } else {
        next();
      }
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
