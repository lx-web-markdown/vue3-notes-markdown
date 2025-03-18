<script>
import { ViewTableHeaderSlot } from '@qycloud/lego';

export default {
  name: 'header-slot',
  extends: ViewTableHeaderSlot,
  render(h) {
    return (
      <div class="slot-wrap">
                自定义内容区域
      </div>
    );
  },
  methods: {
    // 该方法为列表数据初始化以及变化时触发, tableData为当前列表数据
    componentMount(tableData) {
      console.log('tableData:', tableData);
    },

    // 该方法为勾选列表数据时触发, rows为勾选数据
    tableRowChecked(rows) {
      console.log('rows:', rows);
    },
  },
  created() {
    // 相关参数
    console.log(this.$attrs, '$attrs');
  },
};
</script>


<style lang="scss" scoped>
.slot-wrap {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: red;
}
</style>
