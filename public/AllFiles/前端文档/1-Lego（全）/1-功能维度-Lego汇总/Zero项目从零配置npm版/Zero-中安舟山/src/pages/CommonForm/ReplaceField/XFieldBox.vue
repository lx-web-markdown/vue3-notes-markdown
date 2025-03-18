<script>
import { FieldBox, createDialog } from '@qycloud/lego';
import CustomeComponent from './CustomeComponent.vue';

export default {
  name: 'XFieldBox',
  extends: FieldBox,
  methods: {
    renderRightSlot() {
      if (this.id === 'zifuchuan') {
        this.property.changeable = false;
        return <el-button on-click={this.handleClick}>定位</el-button>;
      }
      return null;
    },
    handleClick() {
      if (this.property.editable) {
        createDialog({
          component: CustomeComponent,
          data: {
            confirm: (val) => {
              console.log(val, 'val');
              this.setCurrentValue(val);
            },
          },
          onClose: () => {
            console.log('callBack');
          },
          width: 900,
          height: 900,
        });
      } else {
        alert('预览操作');
      }
    },
  },
};
</script>
