<template>
  <app-view
    spaceId="wuliushiyebu"
    appId="XiangMuXinXi"
    module="information"
    :openFormCallback="openFormCallback" />
</template>

<script>
import { AppView } from '@qycloud/lego';

export default {
  components: {
    AppView,
  },
  data() {
    return {
      openFormCallback: (data) => {
        console.log(data);
        this.$router.push({
          name: 'WoDeJianLiForm',
          params: {
            id: data.id,
            spaceId: data.spaceId,
          },
        });
      },
    };
  },
};
</script>
