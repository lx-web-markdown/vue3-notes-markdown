
<script>
// HSE打点定位
import { FieldBox, createDialog } from '@qycloud/lego';
// import PointDialog from '../GisMap/PointDialog.vue';
// import OnlyLookPint from '../GisMap/OnlyLookPint.vue';
// import Polygon from '../GisMap/Polygon.vue';
// import OnlyLookPolygon from '../GisMap/OnlyLookPolygon.vue';
// import OnlyLookRoute from '../GisMap/OnlyLookRoute.vue';
// import RouteDrawing from '../GisMap/RouteDrawing.vue';

export default {
  name: 'MyFieldBox',
  extends: FieldBox,
  data() {
    return {
      dialogVisible: true,
      points: '',
      poitType: '',
      typeID: '',
      code: '',
    };
  },
  mounted() {
    if (this.app === 'PuTongZuoYeXuKe') {
      const ids = this.$store.getFieldsValue().shigongzuoyeliucheng.master;
      this.typeID = ids.zuoyeleixingxiaolei.value.split('#@')[0];
      this.code = ids.zuoyebianhao.value;
    }
  },
  computed: {},
  methods: {
    renderRightSlot() {
      let res = null;
      if (
        this.id === 'zuoyebianhao'
        && this.app === 'PuTongZuoYeXuKe'
        && !this.editViewStatus
        && this.originData.StepLabel === '结束'
      ) {
        res = (
          <el-button
            on-click={this.handleClick}
            class={['lego-point-info', this.value ? 'btn-checked' : '']}
          >
            打印
          </el-button>
        );
      }
      return res;
    },
    handleClick() {
      this.$http
        .get(
          `/sdkApi/ohsms/custom/works/goprint?code=${this.code}&type=${this.typeID}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            window.open(
              `/form?module=information&app=${res.data.result.appId}&form=${res.data.result.formId}`
            );
          }
        });
    },
  },
};
</script>
