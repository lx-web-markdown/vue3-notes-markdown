<script>
import { ViewFilterCondition } from '@qycloud/lego';
import CustomeStringCondition from './CustomeStringCondition.vue';

export default {
  name: 'custome-condition',
  extends: ViewFilterCondition,
  methods: {
    renderCustomeField() {
      // 对应筛选条件的字段id
      if (this.field === 'zifuchuan') {
        return CustomeStringCondition;
      }
      return null;
    },
  },
};
</script>
