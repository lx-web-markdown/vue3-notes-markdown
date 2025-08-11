<template>
  <div class="grid-center-container">
    <div class="grid-center-item">
      <h2>Grid居中</h2>
      <p>使用CSS Grid实现的居中布局</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style lang="scss" scoped>
.grid-center-container {
  display: grid;
  place-items: center; // 简写属性，同时实现水平和垂直居中
  min-height: 100vh;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  
  .grid-center-item {
    text-align: center;
    color: white;
    padding: 2rem;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    
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