<script setup lang="ts">
import SudokuGame from './components/SudokuGame.vue'
</script>

<template>
  <div class="sudoku-container">
    <SudokuGame />
  </div>
</template>

<style scoped lang="scss">
.sudoku-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}
</style> 