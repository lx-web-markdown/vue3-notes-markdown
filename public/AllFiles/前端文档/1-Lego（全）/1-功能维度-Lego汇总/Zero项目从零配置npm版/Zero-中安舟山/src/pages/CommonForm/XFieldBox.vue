<script>
import { FieldBox } from '@qycloud/lego';

export default {
  name: 'fieldBox',
  extends: FieldBox,
  methods: {
    renderRightSlot() {
      // 可通过判断id来进行特定字段增加插槽
      if (this.id === 'zifuchuan') {
        return <el-button on-click={this.handleClick}>点击</el-button>;
      }
      return null;
    },
    handleClick() {
      alert('字段后加按钮的自定义事件');
      this.setCurrentValue('333');
    },
  },
};
</script>
