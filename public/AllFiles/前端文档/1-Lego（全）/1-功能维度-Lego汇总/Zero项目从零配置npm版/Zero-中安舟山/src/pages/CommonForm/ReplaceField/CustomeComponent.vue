<template>
  <div>
    <el-button @click="cancel">取消</el-button>
    <el-button type="primary" @click="confirm">点击确定将给表单字段(字符串)赋值为"安元科技"</el-button>
  </div>
</template>

<script>
export default {
  name: 'CustomeComponent',
  methods: {
    cancel() {
      this.$dialog.close();
    },
    confirm() {
      this.$dialog.close();
      if (this.$dialog.params.confirm && typeof this.$dialog.params.confirm === 'function') {
        this.$dialog.params.confirm('666');
      }
    },
  },
};
</script>
