<script>
import { ViewColumnOperate } from '@qycloud/lego';

export default {
  name: 'xxx',
  extends: ViewColumnOperate,
  methods: {
    filterColumn() {
      console.log(this.currentLabel, '========');
      this.columnFields.forEach((field) => {
        if (field.field === 'zifuchuan') {
          field.visible = false;
        }
      });
    },
  },
};
</script>
