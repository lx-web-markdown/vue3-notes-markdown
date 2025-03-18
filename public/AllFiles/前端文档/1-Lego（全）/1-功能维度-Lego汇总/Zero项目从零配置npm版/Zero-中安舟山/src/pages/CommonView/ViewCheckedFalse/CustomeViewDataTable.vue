<script>
import { ViewDataTable } from '@qycloud/lego';

export default {
  name: 'CustomeViewDataTable',
  extends: ViewDataTable,
  methods: {
    /*
          仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
          row: 该条数据信息
          index: 该条数据的索引值
        */
    handleSelected(row, index) {
      if (row.zifuchuan === '字符串sssddd') {
        return false;
      }
      return true;
    },
  },
};
</script>
