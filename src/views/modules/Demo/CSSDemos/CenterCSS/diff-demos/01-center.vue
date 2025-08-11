<template>
  <div class="flex-center-container">
    <div class="flex-center-item">
      <h2>Flexbox居中</h2>
      <p>这是使用Flexbox实现的完美居中</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style lang="scss" scoped>
.flex-center-container {
  display: flex;
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  min-height: 100vh; // 全屏高度
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .flex-center-item {
    text-align: center;
    color: white;
    padding: 2rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    h2 {
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
      opacity: 0.9;
    }
  }
}
</style>