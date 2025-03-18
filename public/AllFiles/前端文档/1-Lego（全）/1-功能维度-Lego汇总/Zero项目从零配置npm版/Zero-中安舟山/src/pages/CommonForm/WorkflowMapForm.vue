<template>
  <workflow-map
    v-if="showMap"
    :formService="formService"
    :scopedSlots="scopedSlotsList"
    @flow-diagram="flowDiagram"
  />
</template>

<script>
import { FormService } from '@qycloud/cube';
import { WorkflowMap } from '@qycloud/lego';

export default {
  name: 'map-wrap',
  components: {
    WorkflowMap,
  },
  data() {
    return {
      formInfo: {
        app: 'ZhuCongBiaoLiuCheng1',
        module: 'workflow',
        form: '',
        spaceId: 'preCeShiQiYe',
        edit: '1',
        node: '',
      },
      showMap: false,
      formService: null, // 实例化formService
    };
  },
  computed: {
    scopedSlotsList() {
      return {
        /**
         * 流程图示底部表格渲染行为自定义
         * @param {Object} ctx 流程图示上下文
         * @param {Object} data 底部表格数据
         * @param {Function} getData 获取表格数据api(可定制接口入参)
         */
        trackTable: {
          fn: ({ ctx, data, getData }) => {
            console.log(data, ctx, getData, 'data, ctx, getData');
            return (
              <div onclick={() => this.handleClick(getData)}>{'ssssss'}</div>
            );
          },
        },
      };
    },
  },
  created() {
    this.getMasterFormInfo();
  },
  methods: {
    flowDiagram(flowDiagramData) {
      console.log(flowDiagramData, 'flowDiagramData');
    },
    getMasterFormInfo() {
      const form = new FormService(this.formInfo);
      form.run().then(() => {
        this.formService = form;
        this.showMap = true;
      });
    },
    handleClick(getData) {
      const start = 0;
      const perPage = 10;
      getData(start, perPage).then((res) => {
        console.log(res, '===>>>>>');
      });
    },
  },
};
</script>

<style lang="scss"></style>
