<template>
  <div class="muliti-form">
    <form-page spaceId="shanghaidingshidaxie" :module="config.module" :app="config.app" :form="config.form"
      :node="config.node" :edit="config.edit" ref="formPage" @form-action="onFormAction" />
  </div>
</template>
<script>
import { $http } from '@commonbox/utils';
import { FormPage, FieldBox } from '@qycloud/lego';
import MyFieldBox from './btn.vue';

export default {
  components: {
    FormPage,
  },
  name: 'fieldBox',
  // extends: FieldBox,
  xComponents: {
    'DesignerFieldBox': MyFieldBox,
  },
  data() {
    return {
      config: {
        spaceId: '',
        module: '',
        app: '',
        form: '',
        node: '',
        edit: '',
      },
      tableData: [],
      show: false,
    };
  },
  created() {
    const datass = this.$route.query;
    // console.log(datass, 'datass');
    // this.openAppModule();

    this.config = datass;
  },
  mounted() { },
  methods: {
    onFormAction(ctx, { action, formData, validate, next }) {
      // console.log(window.location.href);
      // // 数据源跳转过来的，
      // if (window.location.href.match('test')) {
      //   // this.$router.push('/shebeijichuxinxi');
      // this.$router.go(-1);
      next();
      // } else {
      //   //正常打开详情页
      // data.next();
      // }

      // console.log(ctx, { action, formData, validate, next }, 'action');
    },
  },
};
</script>
<style lang="scss" scoped>
.buttons {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
