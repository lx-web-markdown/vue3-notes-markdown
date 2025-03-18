<script>
import { DesignerSlaveView } from '@qycloud/lego';
// console.log(designerSlaveView, 'designerSlaveView');

export default {
  name: 'ss',
  extends: DesignerSlaveView,
  created() {
    console.log(this, '=====');
    //   debugger;
  },
  computed: {
    commonButtons() {
      console.log(this.property, 'this.property');
      if (this.property.commonButtons && this.id === 'gezhongziduancongbia') {
        return [
          {
            title: '自定义按钮',
            type: 'default',
            isMulti: false,
            isSolo: false,
            icon: 'saoma',
          },
          ...this.property.commonButtons,
        ];
      }
      return this.property.commonButtons;
    },
  },
};
</script>
