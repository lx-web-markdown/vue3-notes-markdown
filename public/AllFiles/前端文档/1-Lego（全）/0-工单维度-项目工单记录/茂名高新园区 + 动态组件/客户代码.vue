<template>
  <component :is="componentName" v-bind="listProps"  ref="AppView" @toFatherRefreshList="receiveRefreshList" />
</template>

<script>
import { ComponentxPlugin } from '@qycloud/lego';
import utils from '@51safety/safety-utils';
import Vue from 'vue';
import DefaultList from './Base.vue';
import DesignerAppView from './DesignerAppView.vue';

const {
  ajax: { getJSON },
} = utils;

Vue.use(ComponentxPlugin);

export default {
  name: 'MainAppList',
  components: {
      DefaultList,
      DesignerAppView,
  },
  props: [
      'module',
      'appId',
      'spaceId',
      'toggleLabelCallBack',
      'form',
      'labelId',
  ],
  data() {
      return {
          isNewAppDesigner: '0', // 1:新版,0:旧版
      };
  },
  xComponents: {},
  watch: {
      $route:{
          handler(to, from) {
              if (from.path === '/FormPage3d') {
                  this.receiveRefreshList();
              }
          },
          deep: true,
      }
  },
  async created() {
      const safetyReportListRes = await getJSON(
          `/api2/app/appinfo/isNewAppDesigner/${this.module}/${this.appId}/-1`,
      );
      console.log(safetyReportListRes, 'safetyReportListRes');
      const {
          status,
          result: { isNewAppDesigner },
      } = safetyReportListRes.data;
      if (status === 200) {
          this.isNewAppDesigner = isNewAppDesigner;
      }
  },
  computed: {
      listProps() {
          return {
              module: this.module,
              appId: this.appId,
              spaceId: this.spaceId,
              form: this.form,
              labelId: this.labelId,
              toggleLabelCallBack: this.toggleLabelCallBack,
              extendParams: {
                  currentPage: 3,
                  // pageSize: 5,
                  // pageSizes: [10, 20, 30]
              },
              // conditions
          };
      },
      componentName() {
          let componentName;
          if (this.$options.components[this.appId]) {
              componentName = this.appId;
          } else {
              componentName = this.isNewAppDesigner === '1' ? 'DesignerAppView' : 'DefaultList';
          }
          return componentName;
      },
  },
  methods: {
      receiveRefreshList() {
          // console.log(this.$refs.AppView, 'this.$refs.AppView');
          this.$nextTick(() => {
              this.$refs.AppView.refreshList();
          })
      },
  },
};
</script>
