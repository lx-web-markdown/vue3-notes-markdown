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
    />
  </div>
</template>

<script>
import { FormPage, createDialog } from '@qycloud/lego';
import ElementSetting from './ElementSetting/ElementSetting.vue';

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  data() {
    return {
      app: 'HSEZhuanJiaKuChengYu',
      module: 'workflow',
      form: '14149',
      node: 'WorkNode_2',
      edit: '1',
      spaceId: 'zhonghuazhoushan',
      extendParams: {
        handleElementSet: this.handleElementSet,
      },
    };
  },
  methods: {
    handleElementSet(data) {
      const {
        appId, edit, instanceId,
      } = data;
      createDialog({
        component: ElementSetting,
        data: {
          element: {
            appId,
            edit,
            instanceId,
            spaceId: 'zhonghuazhoushan',
          },
          title: '关联要素',
        },
        onClose: () => {
          console.log('callBack');
        },
        width: 900,
        height: 900,
      });
      console.log(data, 'datasss');
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
