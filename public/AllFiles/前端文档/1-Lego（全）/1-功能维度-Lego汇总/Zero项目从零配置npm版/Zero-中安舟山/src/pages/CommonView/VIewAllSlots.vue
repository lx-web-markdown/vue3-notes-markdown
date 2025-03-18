<template>
  <div class="common-view">
    <app-view
      :module="module"
      :appId="appId"
      :spaceId="spaceId"
      :openFormCallback="openFormCallback"
      :toggleLabelCallBack="toggleLabelCallBack"
      :scopedSlots="scopedSlotsList"
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
      imgSrc: '//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    };
  },
  computed: {
    scopedSlotsList() {
      return {
        /**
         * 顶部标题右侧插槽
         * @param {Object} descData 子组件内部数据
         * @param {String} descData.appId 应用id
         * @param {String} descData.module 模块类型
         * @param {String} descData.appTitle 应用标题
         * @param {Arrray} descData.dataList 当前列表数据
         * @param {Object} descData.currentLabel 当前标签信息
         * @param {Object} descData.label 所有标签信息
         */
        headerDesc: {
          fn: (descData) => {
            console.log(descData, 'descData');
            return <div onclick={() => this.handleClick(descData)}>{descData.appTitle}</div>;
          },
          style: 'width: 60px; height: 30px; margin-left: 10px;background-color: red; line-height: 30px;',
        },

        /**
         * table组件右侧插槽
         * @param {Object} sideData 子组件内部数据
         * @param {String} sideData.appId 应用id
         * @param {String} sideData.module 模块类型
         * @param {String} sideData.currentSelectedData 当前选中数据
         * @param {Arrray} sideData.tableData 当前列表数据
         * @param {Object} sideData.currentPage
         * @param {Object} sideData.pageSize
         */
        tableRightSide: {
          fn: (sideData) => {
            console.log(sideData, 'sideData');
            return (
              <div>
                <img src={this.imgSrc}></img>
              </div>
            );
          },
          style: 'background-color: #fff; display: flex; justify-content: space-around; align-items: center; width: 300px;',
        },

        // table组件左侧插槽
        tableLeftSide: {
          fn: (sideData) => {
            console.log(sideData, 'sideData');
            return (
              <div>
                <img src={this.imgSrc}></img>
              </div>
            );
          },
          style: 'background-color: #fff; display: flex; justify-content: space-around; align-items: center; width: 100px;',
        },
      };
    },
  },
  components: {
    AppView,
  },
  methods: {
    // view列表所有打开form的事件,暂作拦截处理
    openFormCallback(ctx, data) {
      this.imgSrc = 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=74905589,504281877&fm=85&app=79&f=JPG?w=121&h=75&s=29D5AB4A4A05980707B2B6680300D056';
      // this.$router.push(`${data.url}`);
    },
    toggleLabelCallBack(labeId) {
      console.log(labeId, 'labeId');
    },
    handleClick(descData) {
      console.log(descData, 'data');
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
