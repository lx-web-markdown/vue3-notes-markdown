<template>
  <div>
      <el-input v-model="input" @change="handleValueChange" placeholder="替换后的输入框"/>
  </div>
</template>

<script>
export default {
  name: 'sss',
  data() {
    return {
      input: '',
    };
  },
  methods: {
    handleValueChange(val) {
      this.$emit('value-change', val); // 改值时必须加上！！！
    },
  },
};
</script>
