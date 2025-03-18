<template>
  <div class="common-form">
    <form-page
      :module="module"
      :app="app"
      :form="form"
      :node="node"
      :edit="edit"
      :spaceId="spaceId"
      :extendParams="extendParams"
    >
    </form-page>
  </div>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  data() {
    return {
      app: 'GeZhongZiDuanZhuCong',
      module: 'information',
      form: '129',
      node: '',
      edit: '0',
      spaceId: 'preCeShiQiYe',
      extendParams: {
        hideInput: ['xxxxxxxxx', 'ssssss'], // 需要隐藏搜索框的从表id集合
        exportConfirmCallBack: this.exportConfirmCallBack,
        scopedSlotsList: {
          slaveListHeader: {
            fn: (slotProps) => {
              console.log(slotProps, 'descData');
              return (
                <span onclick={() => this.handleClick(slotProps)}>
                  {'test'}
                </span>
              );
            },
            style:
              'width: 60px; height: 30px; margin-left: 10px;background-color: red; line-height: 30px;',
          },
          slaveListFoot: {
            fn: (slotProps) => {
              console.log(slotProps, 'descData');
              return (
                <span onclick={() => this.handleClick(slotProps)}>
                  {'test'}
                </span>
              );
            },
            style:
              'width: 60px; height: 30px; margin-left: 10px;background-color: red; line-height: 30px;',
          },
        },
      },
    };
  },
  methods: {
    handleClick(props) {
      props.refreshList();
    },
    exportConfirmCallBack(actionParams) {
    //   debugger;
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
