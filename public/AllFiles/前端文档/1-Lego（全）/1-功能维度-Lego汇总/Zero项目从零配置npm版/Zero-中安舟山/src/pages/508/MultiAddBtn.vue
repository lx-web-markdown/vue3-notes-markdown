<script>
import { SlaveMultiAddBtn } from '@qycloud/lego';

export default {
  name: 'sss',
  extends: SlaveMultiAddBtn,
  methods: {
    renderSlaveMultiAdd(h) {
      return (
        <el-button on-click={ this.slaveAddCreate }>批量生成</el-button>
      );
    },
  },
};
</script>
