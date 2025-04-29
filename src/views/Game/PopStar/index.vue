<template>
  <div class="game-page">
    <h1 class="game-title">PopStar 消除游戏</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>点击相同颜色的相邻方块进行消除</li>
        <li>消除的方块越多，得分越高</li>
        <li>每消除5个方块可获得额外奖励</li>
        <li>没有可消除的方块时游戏结束</li>
      </ul>
    </div>
    <PopStarGame 
      @score-change="handleScoreChange"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PopStarGame from './components/PopStarGame.vue'

const currentScore = ref(0)

const handleScoreChange = (score: number) => {
  currentScore.value = score
}

const handleGameOver = (score: number, bestScore: number) => {
  setTimeout(() => {
    alert(`游戏结束！\n最终得分：${score}\n最高记录：${bestScore}`)
  }, 300)
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
</style>
