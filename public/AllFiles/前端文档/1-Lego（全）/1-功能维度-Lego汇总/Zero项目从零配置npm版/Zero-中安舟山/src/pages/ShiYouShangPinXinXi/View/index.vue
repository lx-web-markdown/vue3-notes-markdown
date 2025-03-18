<template>
  <app-view
    :module="module"
    :appId="appId"
    :spaceId="spaceId"
    :isCurrentEnt="isCurrentEnt"
    :openFormCallback="handleOpenForm"
    :crumbClick="crumbClick"
  />
</template>

<script>
import { AppView } from '@qycloud/lego';

export default {
  data() {
    return {
      isCurrentEnt: 1,
      crumbClick: (data) => {
        console.log(data);
      },
      module: 'information',
      appId: 'ZhuCongBiao',
      spaceId: 'preCeShiQiYe',
    };
  },
  methods: {
    handleOpenForm(ctx, data) {
      this.$router.push({
        name: 'ShiYouShangPinXinXiForm',
        params: {
          spaceId: data.spaceId,
          id: data.id || null,
        },
      });
    },
  },
  components: {
    AppView,
  },
};
</script>
