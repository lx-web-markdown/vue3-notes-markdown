<template>
  <div class="common-form">
    <form-page
      :app="$route.query.app"
      :module="$route.query.module"
      :form="$route.query.form"
      :node="$route.query.node"
      :edit="$route.query.edit"
      :spaceId="spaceId"
      @crumb-item-click="onCrumbItemClick"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import MultiSlave from './MultiSlave.vue';

Vue.use(ComponentxPlugin);


export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  xComponents: {
    'slave': MultiSlave,
  },
  data() {
    return {
      spaceId: this.$route.params.spaceUri
        ? window.AY.getSpaceIdByUri(this.$route.params.spaceUri)
        : window.AY.getSpaceId(),
    };
  },
  methods: {
    onCrumbItemClick(args, ctx) {
      console.log('crumb item click:', args, ctx);
    },
  },
};
</script>

<style lang="scss">
.common-form {
  width: 100%;
  height: 100%;
}
</style>
