<template>
  <div class="common">
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
    <div class="common-slave" v-if="showSlave">
      <form-page
        :module="module"
        :app="appId"
        :form="form"
        :node="node"
        :edit="edit"
        :spaceId="spaceId"
        :extendParams="extendParams"
        disableFoot
        disableNav
        disableTopButton
        disableCrumb
      />
    </div>
  </div>
</template>

<script>
import { AppView, FormPage } from '@qycloud/lego';

export default {
  name: 'CommonView',
  data() {
    return {
      module: 'information',
      appId: 'ZhuCongBiao',
      spaceId: 'preCeShiQiYe',
      form: '',
      node: '',
      edit: '1',
      showSlave: false,
      extendParams: {
        isOnlySlave: true,
      },
    };
  },
  components: {
    AppView,
    FormPage,
  },
  methods: {
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      if (data.id) {
        this.showSlave = false;
        this.form = data.id;
        this.$nextTick(() => {
          this.showSlave = true;
        });
      }
      //   console.log('ctx===', ctx, 'data===', data);
    },
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
    onViewActionCallBack(ctx, actionParams) {
      console.log(actionParams, 'actionParams');
      const { action, next } = actionParams;
      if (action === 'DELETE') {
        alert('=====');
        next();
      } else {
        next();
      }
    },
  },
};
</script>

<style lang="scss">
.common {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-view {
    flex: 0.6;
  }

  &-slave {
    flex: 0.4;
    overflow: auto;
  }
}
</style>
