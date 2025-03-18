<template>
  <div class="common-view">
    <!-- <field-box v-bind="obj" /> -->
    <div class="common-view-left">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :openFormCallback="openFormCallback"
      :toggleLabelCallBack="toggleLabelCallBack"
      :conditions="conditions"
    />
  </div>
</template>

<script>
import { AppView } from '@qycloud/lego';

// console.log(FieldBox, 'FieldBox');

export default {
  name: 'CommonView',
  data() {
    return {
      module: 'information',
      appId: 'ZhuCongBiao',
      spaceId: 'preCeShiQiYe',
      data: [
        {
          label: '字符串字段值包含字符串',
        },
        {
          label: '审核意见字段等于不同意',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      conditions: [],
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
    handleNodeClick(data) {
      console.log(data);
      if (data.label === '字符串字段值包含字符串') {
        this.conditions = [
          {
            table: 'zhucongbiaozhubiao', // 表id
            field: 'zifuchuan', // 条件字段id
            symbol: 'like', // 符号类型
            type: 'string', // 条件字段类型
            value: 'cccccc', // 条件赋值
            schema: {
              title: '字符串', // 条件名称
            },
          },
        ];
      }
      if (data.label === '审核意见字段等于不同意') {
        this.conditions = [
          {
            table: 'zhucongbiaozhubiao', // 表id
            field: 'shenheyijian', // 条件字段id
            symbol: 'equal', // 符号类型
            type: 'radio', // 条件字段类型
            value: '不同意', // 条件赋值
            schema: {
              title: '审核意见', // 条件名称
            },
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss">
.common {
  &-view {
    height: 100%;
    display: flex;

    &-left {
      width: 200px;
    }
  }
}
</style>
