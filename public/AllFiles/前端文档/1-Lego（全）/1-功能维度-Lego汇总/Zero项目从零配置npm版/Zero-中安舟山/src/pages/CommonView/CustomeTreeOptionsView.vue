<template>
  <div class="common-view">
    <app-view :module="module" :appId="appId" :spaceId="spaceId" :reSetTreeOptions="reSetTreeOptions"/>
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
    // 传参可直接参考element-ui tree组件传参数格式
    // 注意节点id是字符串还是数字类型
    reSetTreeOptions(data) {
      return {
        'default-expand-all': false,
        'default-checked-keys': ['11', '12'],
        'default-expanded-keys': ['11', '12'],
        data,
      };
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
