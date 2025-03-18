<script>
import Vue from 'vue';
import { DesignerFieldBox, createDialog, filePreview } from '@qycloud/lego';
import { $http } from '@commonbox/utils';
import CustomeComponent from './CustomeComponent.vue';

export default {
  data() {
    return {
    };
  },
  components: { CustomeComponent },
  name: 'MyFieldBox',
  extends: DesignerFieldBox,

  methods: {
    renderRightSlot() {
      if (this.id === 'shebeisheshibianmadi') {
        return (
          <el-button type="primary" on-click={this.handleClick}>
            生成/查看二维码
          </el-button>
        );
      }
    },
    handleClick() {
      const datass = this.$route.query;
      if (datass.form) {
        $http.get(`/sdkintelberth/qrcode/base64?id=${datass.form}`).then((res) => {
          if (res.status == 200) {
            createDialog({
              component: CustomeComponent,
              data: {
                title: '生成/查看二维码',
                form: {
                  url: res.data.result,
                },

              },
              onClose: () => {
                console.log('callBack');
              },
              width: 900,
              height: 900,
            });
          }
          console.log(res);
        });
      } else {
        this.$message.error('请保存后再生成二维码');
      }

      const data = this.$store.getFieldsValue();
      // this.$store.setFieldValue({
      //   table: 'shebeijichuxinxibiao',
      //   field: 'gongyiweihao',
      //   value: 'yukaifeng666',
      // });
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
