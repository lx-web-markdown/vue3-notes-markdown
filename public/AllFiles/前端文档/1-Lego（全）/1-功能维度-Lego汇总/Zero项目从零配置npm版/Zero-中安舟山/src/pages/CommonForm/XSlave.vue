<script>
import { FormSlave } from '@qycloud/lego';

export default {
  name: 'xxx',
  extends: FormSlave,
  data() {
    return {
      highlightCurrentRow: true,
    };
  },
  methods: {
    // 列表行样式的定制
    cellStyle(rowInfo) {
    //   console.log(rowInfo, 'rowInfo');
      if (rowInfo.row.zifuchuan === '字符串') {
        return {
          background: 'red',
          color: 'blue',
        };
      }
      return {};
    },
    handleRowClick(row, event, column, index) {
      console.log('当前从表id:', this.id, '当前选中数据:', row, '当前选中索引值:', index);
      // console.log(row, index, event, column, 'row, event, column');
    },
  },
};
</script>

<style lang="scss">
// .el-table__body tr.current-row>td {
//     background-color:black;
// }
</style>
