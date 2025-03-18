<template>
  <div>
<!--    <el-input class="value" v-model="modelValue" v-if="editViewStatus"/>
    <div v-else>{{value}}</div>-->
    <el-button @click="handleClick" type="primary">change</el-button>
    <el-button @click="saveEvent" type="primary">saveEvent</el-button>
    <el-button @click="readToWrite" type="primary">readToWrite</el-button>

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
      renderValue: '',
    };
  },
  mixins: [CustomeFieldMixin],
  methods: {
    handleClick() {
      console.log('click');
      this.renderValue = Math.random();
      this.$emit('change', { field: 'wenben', isClearRelation: false, value: `${this.renderValue}` });
    },
    saveEvent() {
      this.$emit('blur', { value: this.renderValue });
    },
    readToWrite() {
      this.$emit('readToWrite');
    },
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
