<template>
  <div class="common-view">

    <DesignerAppView
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :extendParams="extendParams"
      :onViewActionCallBack="onViewActionCallBack"
      :openFormCallback="openFormCallback"
      ref="AppView"/>
  </div>
</template>

<script>
import {
  AppView, DesignerAppView, BaseAppView, openFormDialog,
} from '@qycloud/lego';
import { ViewService } from '@qycloud/cube';
import CommonViewExtend from './CommonViewExtend.vue';

export default {
  name: 'CommonView',
  data() {
    return {
      isOnDestroyed: true,
      module: 'information',
      appId: 'renyuanguanli',
      spaceId: 'shanghaidingshidaxie',
      extendParams: {
        // labelId: '173383559967580160',
        // handleTabClickCallback: this.toggleLabelCallBack,
        // beforeImportCallback: this.onBeforeImportCallback
      },
      /* componentsMap: {
        componentId: {
          '398293781344133120': {
            attr: {
              appName: '啊啊啊啊啊'
            }
          },
          '398293781432213504': {
            property: {
              display: false
            }
          },
          '398293783999127552': {
            property: {
              hiddenOperation: true,
              hiddenCheckbox: true
            }
          }
        }
      } */
    };
  },
  components: {
    DesignerAppView, AppView, CommonViewExtend, BaseAppView,
  },
  mounted() {
  },
  methods: {
    onDestroyed() {
      this.isOnDestroyed = false;
    },
    onShow(val) {
      this.designerConditions.filterParams[0].value = val;
      this.isOnDestroyed = true;
    },
    onBeforeImportCallback(ctx, next) {
      console.log(ctx);
      console.log(next);
      next();
      console.log('onBeforeImportCallback');
    },
    toggleLabelCallBack() {
      console.log('toggleLabelCallBack');
    },
    handleBtnClick() {
      // this.$refs.AppView.refreshList();
      const result = this.$refs.AppView.getViewService();
      console.log(result);
    },
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      console.log(data, 'data-openformcallback');
    },
    handleRowClick(arg) {
      console.log(arg);
    },
    rowChecked(playoad) {
      console.log(playoad);
    },
    handleFormCallback() {
      console.log('经过了hhh');
    },
    onViewActionCallBack(ctx, actionParams) {
      console.log('onViewActionCallBack');
      console.log(actionParams);
      actionParams.next();
      // console.log(ctx, actionParams.action, actionParams.next, 'onViewActionCallBack');
      // debugger;
      // actionParams.next();
    },
    handleConfigInit(v, v2, v3) {
      this.$nextTick(() => {
        this.$refs.AppView.handleGlobalBtn({
          viewId: '338109879904604172',
          type: 'COLUMN_DISPLAY',
          filterColumnFields: ['shuzi'],


        });
      });
    },
  },
};
</script>

<style lang="scss">
.view-page {
  width: 100%;
}

.common-view {
  width: 100%;
  height: 100%;
}
</style>
