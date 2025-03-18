<template>
  <app-view
    module="workflow"
    appId="ZeRenShuQianDing"
    spaceId="zhonghuazhoushan"
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
      handleOpenForm: (ctx, data) => {
        console.log(ctx, data);
      },
    };
  },
  components: {
    AppView,
  },
};

</script>
