<template>
  <div class="absolute-center-container">
    <div class="absolute-center-item">
      <h2>绝对定位居中</h2>
      <p>使用绝对定位实现的居中</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style lang="scss" scoped>
.absolute-center-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  
  .absolute-center-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 关键：负的50%偏移
    text-align: center;
    color: white;
    padding: 2rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.15);
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