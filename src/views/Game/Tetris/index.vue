# 创建俄罗斯方块游戏的主组件
<template>
  <div class="game-page">
    <h1 class="game-title">俄罗斯方块</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>使用左右方向键移动方块</li>
        <li>使用下方向键加速下落</li>
        <li>使用空格键旋转方块</li>
        <li>消除整行可得分</li>
      </ul>
    </div>
    <div class="game-header">
      <div class="scores">
        <div class="score">分数: {{ score }}</div>
        <div class="best-score">最高分: {{ bestScore }}</div>
      </div>
      <button class="new-game-button" @click="startNewGame">新游戏</button>
    </div>
    <TetrisGame 
      ref="gameRef"
      @score-change="updateScore"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TetrisGame from './components/TetrisGame.vue'

const score = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('tetris-best-score') || '0'))
const gameRef = ref<InstanceType<typeof TetrisGame> | null>(null)

const updateScore = (newScore: number) => {
  score.value = newScore
  if (newScore > bestScore.value) {
    bestScore.value = newScore
    localStorage.setItem('tetris-best-score', bestScore.value.toString())
  }
}

const handleGameOver = () => {
  setTimeout(() => {
    alert(`游戏结束！\n最终得分：${score.value}`)
  }, 300)
}

const startNewGame = () => {
  gameRef.value?.resetGame()
}
</script>

<style scoped lang="scss">
.game-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-title {
  text-align: center;
  color: #776e65;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.game-instructions {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 2rem;

  h2 {
    color: #776e65;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      color: #776e65;
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: #bbada0;
      }
    }
  }
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.scores {
  display: flex;
  gap: 2rem;
  font-size: 1.2rem;
  color: #776e65;
}

.new-game-button {
  padding: 0.8rem 1.5rem;
  background-color: #8f7a66;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #9f8a76;
  }
}
</style> 