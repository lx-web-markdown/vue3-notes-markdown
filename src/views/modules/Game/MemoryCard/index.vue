<script setup lang="ts">
import MemoryGame from './components/MemoryGame.vue'
</script>

<template>
  <div class="memory-card-container">
    <MemoryGame />
  </div>
</template>

<style scoped lang="scss">
.memory-card-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}
</style>
