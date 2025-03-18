<script>
import { ViewDataTable } from '@qycloud/lego';

export default {
  name: 'gpl',
  extends: ViewDataTable,
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
    // 前端字段值的转换
    formatter(fieldObject) {
    //   console.log(fieldObject, 'fieldObject');
      if (fieldObject.id === 'zifuchuan' && fieldObject.value === '安元科技') {
        return '前端数值转换';
      }
      return fieldObject.value || '';
    },
  },
};
</script>
