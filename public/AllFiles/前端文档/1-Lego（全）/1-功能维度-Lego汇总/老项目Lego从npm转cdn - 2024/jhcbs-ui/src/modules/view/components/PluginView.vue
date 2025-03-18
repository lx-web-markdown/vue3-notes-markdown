<template>
  <div class="app-view">
    <app-view
      ref="CustomeViewPage"
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
    />
  </div>
</template>

<script>
import { AppView } from '@qycloud/lego';
import '@qycloud/lego/dist/lego.css';

export default {
  name: 'plugin-view',
  created() {
    // module,appId,spaceId 实际项目中从props中取
  },
  components: {
    AppView,
  },
  data() {
    return {
      module: 'information',
      appId: '',
      spaceId: 'nanjinganyuankeji',
    };
  }
};
</script>
<style lang="scss" scoped>
.app-view {
  height: 100%;
}
</style>
