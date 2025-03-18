<template>
  <AppView
    :module="module"
    :appId="appId"
    :spaceId="spaceId"
    :openFormCallback="myopenFormCallback"
    :onViewActionCallBack="onViewActionCallBack"
  />
</template>
<script>
import { AppView } from '@qycloud/lego';

export default {
  components: {
    AppView,
  },
  data() {
    return {
      module: 'information',
      appId: 'chengbaoshangzhangha',
      spaceId: 'henanjunhuafazhanguf',
    };
  },
  created() {
    this.config = this.$route.query;
  },
  methods: {
    myopenFormCallback(ctx, data) {
      console.log(data);
      this.$router.push({
        name: 'chengbaoshangzhanghaform',
        query: {
          module: 'information',
          app: 'chengbaoshangzhangha',
          form: data.form || data.instance_id || data.id,
          node: data.node || '',
          edit: data.edit || '0',
        },
      });
    },
    // toggleLabelCallBack() { },
    afterViewOperation(ctx, radioProps) {
      radioProps.next();
      // console.log(radioProps);
    },
    // 打开详情
    onViewActionCallBack(ctx, data) {
      data.next();
    },
    // :onViewActionCallBack="onViewActionCallBack"

    // onViewActionCallBack(ctx,actionParams){
    //   if(actionParams.action=="DELETE"){
    //   console.log('DELETE',actionParams)
    //   let ids =[]
    //   let datas=actionParams.multipleProps
    //   datas.forEach(item=>{
    //     ids.push(item.recordId)
    //   })
    //   console.log(ids)
    //   }else{
    //     actionParams.next()
    //   }
    // }
  },
};
</script>
<style lang="scss"></style>
