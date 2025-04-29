<template>
  <div class="game-page">
    <h1 class="game-title">英文拼写游戏</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>根据单词的中文意思和读音，拼写出完整的英文单词</li>
        <li>不同难度模式下会隐藏不同数量的字母</li>
        <li>使用键盘输入缺失的字母</li>
        <li>可选择限时模式或无尽模式</li>
      </ul>
    </div>

    <div class="game-settings">
      <div class="difficulty-selector">
        <span class="label">难度：</span>
        <el-radio-group v-model="difficulty">
          <el-radio-button label="easy">简单</el-radio-button>
          <el-radio-button label="medium">中等</el-radio-button>
          <el-radio-button label="hard">困难</el-radio-button>
        </el-radio-group>
      </div>
      <div class="mode-selector">
        <span class="label">模式：</span>
        <el-radio-group v-model="gameMode">
          <el-radio-button label="timed">限时模式</el-radio-button>
          <el-radio-button label="endless">无尽模式</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="game-header">
      <div class="scores">
        <div class="score">得分: {{ score }}</div>
        <div class="accuracy">正确率: {{ accuracy }}%</div>
        <div v-if="gameMode === 'timed'" class="time-left">剩余时间: {{ timeLeft }}s</div>
        <div class="best-score">最高分: {{ bestScore }}</div>
      </div>
      <button class="new-game-button" @click="startNewGame">新游戏</button>
    </div>

    <SpellingGame
      ref="gameRef"
      :difficulty="difficulty"
      :game-mode="gameMode"
      @score-change="updateScore"
      @accuracy-change="updateAccuracy"
      @time-change="updateTime"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SpellingGame from './components/SpellingGame.vue'

const difficulty = ref<'easy' | 'medium' | 'hard'>('easy')
const gameMode = ref<'timed' | 'endless'>('endless')
const score = ref(0)
const accuracy = ref(100)
const timeLeft = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('spelling-best-score') || '0'))
const gameRef = ref<InstanceType<typeof SpellingGame> | null>(null)

const updateScore = (newScore: number) => {
  score.value = newScore
  if (newScore > bestScore.value) {
    bestScore.value = newScore
    localStorage.setItem('spelling-best-score', bestScore.value.toString())
  }
}

const updateAccuracy = (newAccuracy: number) => {
  accuracy.value = Math.round(newAccuracy)
}

const updateTime = (newTime: number) => {
  timeLeft.value = newTime
}

const handleGameOver = () => {
  setTimeout(() => {
    alert(`游戏结束！\n最终得分：${score.value}\n正确率：${accuracy.value}%`)
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

.game-settings {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;

  .label {
    color: #776e65;
    margin-right: 1rem;
  }

  .difficulty-selector,
  .mode-selector {
    display: flex;
    align-items: center;
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