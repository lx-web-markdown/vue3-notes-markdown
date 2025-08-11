<template>
  <div class="grid-center-container">
    <div class="grid-center-item">
      <h2>Grid 居中</h2>
      <p>通过 CSS Grid 的 place-items 实现水平与垂直完美居中</p>
    </div>
  </div>
  
</template>

<script setup lang="ts">
// no logic required
</script>

<style lang="scss" scoped>
.grid-center-container {
  display: grid;
  place-items: center; // center both axes
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #34d399 0%, #059669 60%, #065f46 100%);

  .grid-center-item {
    text-align: center;
    color: #062a24;
    padding: 2rem 2.5rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1.75rem;
      font-weight: 700;
    }

    p {
      font-size: 1rem;
      opacity: 0.9;
    }
  }
}
</style>


