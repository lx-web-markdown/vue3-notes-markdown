<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :highlightCurrentRow="true"
      @row-click="handleRowClick"
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
      appId: 'ZhuCongBiao',
      spaceId: 'preCeShiQiYe',
    };
  },
  components: {
    AppView,
  },
  methods: {
    handleRowClick(ctx, rowData, index) {
      console.log(ctx, rowData, index, 'ctx, rowData, index');
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
// view列表点击当前列高亮背景色自定义
.el-table__body tr.current-row > td {
  background-color: blue;
}
</style>
