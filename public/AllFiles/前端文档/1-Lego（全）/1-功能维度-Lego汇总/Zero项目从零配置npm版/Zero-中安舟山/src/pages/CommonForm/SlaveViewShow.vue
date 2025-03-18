<template>
  <div>
    222222222
  </div>
</template>

<script>
import { FormSlave } from '@qycloud/lego';

export default {
  name: 'sssxx',
  // extends: FormSlave,
  methods: {
    // 从表类的列显示定制
    filterViewFields() {
      const currentLabelId = this.getCurrentLableId();
      console.log('当前标签id:', currentLabelId, '当前从表id:', this.id);
      return ['zuzhijiagou', 'zifuchuan'];
    },
    // 单条数据的操作按钮
    parseSingleTableButtons(buttons) {
      return buttons;
    },
    // 勾选数据的操作按钮
    parseMultipleTableButtons(buttons) {
      return buttons;
    },
  },
};
</script>
