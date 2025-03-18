<template>
  <component :is="componentName" v-bind="listProps" />
</template>

<script>
import { ComponentxPlugin } from '@qycloud/lego';
import Vue from 'vue';
import DefaultList from './Base.vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'main-app-list',
  props: [
    'module',
    'appId',
    'spaceId',
    'toggleLabelCallBack',
    'form',
    'labelId',
  ],
  components: {
    DefaultList,
  },
  xComponents: {},
  computed: {
    listProps() {
      return {
        module: this.module,
        appId: this.appId,
        spaceId: this.spaceId,
        form: this.form,
        labelId: this.labelId,
        toggleLabelCallBack: this.toggleLabelCallBack,
      };
    },
    componentName() {
      return this.$options.components[this.appId] ? this.appId : 'DefaultList';
    },
  },
};
</script>
