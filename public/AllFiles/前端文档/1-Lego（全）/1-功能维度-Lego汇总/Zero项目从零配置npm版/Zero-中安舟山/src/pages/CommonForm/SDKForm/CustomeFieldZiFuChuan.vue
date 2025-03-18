<template>
  <div>
    <el-input class="value" v-model="modelValue" v-if="editViewStatus"/>
    <div v-else>{{value}}</div>
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
    validator(noRequired) {
      return this.customeFieldValidator(noRequired); // code from CustomeFieldMixin
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
