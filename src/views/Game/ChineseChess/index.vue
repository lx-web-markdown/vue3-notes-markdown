<template>
  <div class="game-page">
    <h1 class="game-title">中国象棋</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>点击棋子后，高亮显示可移动位置</li>
        <li>再次点击目标位置即可移动棋子</li>
        <li>将死对方或无子可走即获胜</li>
        <li>按空格键悔棋（每局限3次）</li>
      </ul>
    </div>
    <div class="game-header">
      <div class="game-controls">
        <div class="difficulty-selector">
          <span>难度：</span>
          <select v-model="difficulty" @change="handleDifficultyChange">
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </div>
        <div class="stats">
          <div class="wins">胜场: {{ wins }}</div>
          <div class="total-games">总局数: {{ totalGames }}</div>
        </div>
      </div>
      <button class="new-game-button" @click="startNewGame">新游戏</button>
    </div>
    <ChineseChessGame 
      ref="gameRef"
      :difficulty="difficulty"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChineseChessGame from './components/ChineseChessGame.vue'

const difficulty = ref<'easy' | 'medium' | 'hard'>('easy')
const wins = ref(parseInt(localStorage.getItem('chess-wins') || '0'))
const totalGames = ref(parseInt(localStorage.getItem('chess-total-games') || '0'))
const gameRef = ref<InstanceType<typeof ChineseChessGame> | null>(null)

const handleDifficultyChange = () => {
  startNewGame()
}

const handleGameOver = (isWin: boolean) => {
  totalGames.value++
  if (isWin) {
    wins.value++
  }
  localStorage.setItem('chess-wins', wins.value.toString())
  localStorage.setItem('chess-total-games', totalGames.value.toString())
  
  setTimeout(() => {
    alert(isWin ? '恭喜你获胜！' : '游戏结束，再接再厉！')
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
  color: #8b4513;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.game-instructions {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 2rem;

  h2 {
    color: #8b4513;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      color: #8b4513;
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: #d2691e;
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

.game-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.difficulty-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  select {
    padding: 0.3rem;
    border-radius: 4px;
    border: 1px solid #d2691e;
    background-color: white;
    color: #8b4513;
  }
}

.stats {
  display: flex;
  gap: 1rem;
  color: #8b4513;
  font-size: 1.1rem;
}

.new-game-button {
  padding: 0.8rem 1.5rem;
  background-color: #d2691e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8b4513;
  }
}
</style> 