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
import { FormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  components: {
    FormPage,
  },
  data() {
    return {
      app: 'ZhuCongBiao',
      module: 'information',
      form: '',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
      extendParams: {
        slaveCustomeOptions: [
          {
            slaveTableId: 'zhucongbiaoziyingyon',
            options: {
              sort: [
                {
                  field: 'bianhaoshujuyuan',
                  type: 'desc',
                },
              ],
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
.common-form {
  width: 100%;
  height: 100%;
}
</style>
