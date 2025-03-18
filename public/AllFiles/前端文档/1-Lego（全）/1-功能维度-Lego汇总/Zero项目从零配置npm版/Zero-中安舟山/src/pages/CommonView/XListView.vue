<script>
import { ListView } from '@qycloud/lego';

export default {
  name: 'bb',
  extends: ListView,
  computed: {
    // view列表勾选项数据按钮定制
    parseMultipleActions() {
      console.log('当前标签id:', this.labelId, '当前操作按钮:', this.actions);
      return this.actions;
    },
  },
};
</script>
