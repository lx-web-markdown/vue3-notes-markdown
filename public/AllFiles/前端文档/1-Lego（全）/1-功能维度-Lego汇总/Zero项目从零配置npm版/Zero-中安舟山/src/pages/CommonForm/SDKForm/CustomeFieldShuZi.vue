<template>
  <div>
    <!-- blur事件针对从表行编辑处理失焦点验证保存逻辑 -->
    <el-input
      class="value"
      v-model="modelValue"
      v-if="editViewStatus"
      v-on:blur="validator(false, true)"
    />
    <div v-else>{{ value }}</div>
    <!-- 该处逻辑为行编辑时使用 -->
    <div class="box-lineEdit-icon" @click="readToWrite()" v-if="showEdit">
      <i class="iconfont icon-xiugai" />
    </div>
  </div>
</template>

<script>
import { CustomeFieldMixin } from '@qycloud/lego'; // 必须

export default {
  name: 'custome-coordinate',
  data() {
    return {
      // modelValue 绑定值的变量不可更改，便于内部逻辑处理， this.value为数据库中存储的字段的值
      modelValue: this.value,
    };
  },
  mixins: [CustomeFieldMixin],
  methods: {
    // 方法名不可更改
    validator(noRequired, isBlur) {
      return this.customeFieldValidator(noRequired, isBlur); // code from CustomeFieldMixin
    },
    // 当处于行编辑
    readToWrite() {
      this.$emit('readToWrite');
    },
  },
  watch: {
    modelValue(value) {
      const result = this.validator(!!value);
      if (result) {
        this.setCurrentValue(value); // code from CustomeFieldMixin 给字段赋值并且与表单建立关系
      }
    },
  },
};
</script>

<style scoped lang="scss">
.value {
  margin-right: 30px;
}
</style>
