<template>
  <div class="muliti-form">
    <form-page
      spaceId="henanjunhuafazhanguf"
      :module="$route.query.module"
      :app="$route.query.app"
      :form="$route.query.form"
      :node="$route.query.node"
      :edit="$route.query.edit"
      @form-action="onFormAction"
      ref="formPage"
    />
    <!-- @form-action="onFormAction" -->
  </div>
</template>
<script>
// import { CustomeFieldMixin } from '@qycloud/lego'; // 必须
import { $http } from '@commonbox/utils';
import { FormPage, FieldBox } from '@qycloud/lego';
// import bus from '../../../uitls/bus';

export default {
  components: {
    FormPage,
  },
  name: 'fieldBox',
  extends: FieldBox,
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
    this.config = datass;
  },
  mounted() {
  },
  methods: {
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      // console.log('this.$refs.formPage', this.$refs.formPage);
      console.log('onFormAction', ctx, {
        action, formData, validate, next,
      });
      const id = ctx.getOneFieldValue({
        table: 'xiangguanfangzhangha',
        field: 'id',
      });
      // 负责人手机号
      const fuzerenshoujihao = ctx.getOneFieldValue({
        table: 'xiangguanfangzhangha',
        field: 'fuzerenshoujihao',
      });
        // 承包商负责人
      const xiangguanfangfuzeren = ctx.getOneFieldValue({
        table: 'xiangguanfangzhangha',
        field: 'xiangguanfangfuzeren',
      });
        // 承包商名称
      const xiangguanfangmingche = ctx.getOneFieldValue({
        table: 'xiangguanfangzhangha',
        field: 'xiangguanfangmingche',
      });
      // const guanliyuanzhanghao = ctx.getOneFieldValue({
      //   table: 'xiangguanfangzhangha',
      //   field: 'guanliyuanzhanghao',
      // });
      const guanliyonghuid = ctx.getOneFieldValue({
        table: 'xiangguanfangzhangha',
        field: 'guanliyonghuid',
      });
      const obj = {
        'userName': xiangguanfangfuzeren,
        'id': 0,
        'entName': xiangguanfangmingche,
        'phone': fuzerenshoujihao,
      };
      // 如果是新增，检查手机号是否存在
      if (action === 'DATAFLOW_SAVE' && id === '') {
        $http.post('/safetyjapi/eduinp/contractor/createInpAdminUser', obj, { headers: { 'Content-Type': 'application/json; charset=utf-8' } }).then((res) => {
          if (res.status === 200) {
            if (res.data.success) {
              ctx.setFieldValue({
                table: 'xiangguanfangzhangha',
                field: 'guanliyuanzhanghao',
                value: res.data.result.guanliyuanzhanghao,
              });
              ctx.setFieldValue({
                table: 'xiangguanfangzhangha',
                field: 'guanliyuanmima',
                value: res.data.result.guanliyuanmima,
              });
              ctx.setFieldValue({
                table: 'xiangguanfangzhangha',
                field: 'guanliyonghuid',
                value: res.data.result.guanliyonghuid,
              });
              next();
            } else {
              this.$message({
                message: res.data.message,
                type: 'error',
              });
            }
          }
        });
      } else if (action === 'DATAFLOW_SAVE' && id !== '') {
        $http.get(`/safetyjapi/eduinp/contractor/updateEnterprise?userId=${guanliyonghuid}&entName=${xiangguanfangmingche}&userName=${xiangguanfangfuzeren}&newPhone=${fuzerenshoujihao}&passWord=11111111`).then((res) => {
          if (res.status === 200) {
            if (res.data.success) {
              next();
            } else {
              this.$message({
                message: res.data.message,
                type: 'error',
              });
            }
          }
        });
      } else {
        next();
      }
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
