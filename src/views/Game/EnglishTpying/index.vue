<template>
  <div class="game-page">
    <h1 class="game-title">英文打字游戏</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>根据屏幕显示的单词/句子进行打字</li>
        <li>正确输入会增加分数</li>
        <li>错误输入会被标记为红色</li>
        <li>计时模式下需要在规定时间内完成打字</li>
      </ul>
    </div>
    <div class="game-header">
      <div class="scores">
        <div class="score">得分: {{ score }}</div>
        <div class="accuracy">准确率: {{ accuracy }}%</div>
        <div class="wpm">WPM: {{ wpm }}</div>
        <div class="best-score">最高分: {{ bestScore }}</div>
      </div>
      <button class="new-game-button" @click="startNewGame">新游戏</button>
    </div>
    <TypingGame 
      ref="gameRef"
      @score-change="updateScore"
      @accuracy-change="updateAccuracy"
      @wpm-change="updateWPM"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TypingGame from './components/TypingGame.vue'

const score = ref(0)
const accuracy = ref(100)
const wpm = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('typing-best-score') || '0'))
const gameRef = ref<InstanceType<typeof TypingGame> | null>(null)

const updateScore = (newScore: number) => {
  score.value = newScore
  if (newScore > bestScore.value) {
    bestScore.value = newScore
    localStorage.setItem('typing-best-score', bestScore.value.toString())
  }
}

const updateAccuracy = (newAccuracy: number) => {
  accuracy.value = Math.round(newAccuracy)
}

const updateWPM = (newWPM: number) => {
  wpm.value = Math.round(newWPM)
}

const handleGameOver = () => {
  setTimeout(() => {
    alert(`游戏结束！\n最终得分：${score.value}\n准确率：${accuracy.value}%\nWPM：${wpm.value}`)
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