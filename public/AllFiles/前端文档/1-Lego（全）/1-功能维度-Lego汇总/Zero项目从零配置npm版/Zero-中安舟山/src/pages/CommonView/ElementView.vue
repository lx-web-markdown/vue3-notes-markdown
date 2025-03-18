<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :openFormCallback="openFormCallback"
      :toggleLabelCallBack="toggleLabelCallBack"
      :onViewActionCallBack="onViewActionCallBack"
    />
  </div>
</template>

<script>
import { AppView, createDialog } from '@qycloud/lego';
import ElementSetting from './ElementSetting/ElementSetting.vue';

export default {
  name: 'CommonView',
  data() {
    return {
      module: 'information',
      appId: 'zhinengliucheng',
      spaceId: 'zhonghuazhoushan',
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
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
    onViewActionCallBack(ctx, actionParams) {
      const { radioProps } = actionParams;
      createDialog({
        component: ElementSetting,
        data: {
          element: {
            appId: radioProps.sourceData.yingyongmingcheng,
            edit: '1',
            spaceId: 'zhonghuazhoushan',
            versionName: radioProps.sourceData.morenbanben,
          },
          title: '关联要素',
        },
        onClose: () => {
          console.log('callBack');
        },
        width: 900,
        height: 900,
      });
      console.log(actionParams, 'ctx, actionParams');
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
