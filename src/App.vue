<template>
  <div class="app-container">
    <h1>2048 游戏</h1>
    <Game2048 />
  </div>
</template>

<script setup lang="ts">
import Game2048 from './components/Game2048.vue'
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #776e65;
  font-size: 2.5em;
  margin-bottom: 30px;
}

body {
  background-color: #faf8ef;
  font-family: "Helvetica Neue", Arial, sans-serif;
}
</style> 