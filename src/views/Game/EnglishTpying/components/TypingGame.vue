<template>
  <div class="typing-game">
    <div class="game-controls">
      <div class="timer" :class="{ 'warning': timeLeft <= 10 }">
        时间: {{ timeLeft }}s
      </div>
      <select v-model="gameMode" :disabled="isGameStarted" class="mode-select">
        <option value="words">单词模式</option>
        <option value="sentences">句子模式</option>
      </select>
      <select v-model="gameDuration" :disabled="isGameStarted" class="duration-select">
        <option :value="30">30秒</option>
        <option :value="60">60秒</option>
        <option :value="120">120秒</option>
      </select>
    </div>

    <div class="game-content">
      <div class="text-display" :class="{ 'game-over': isGameOver }">
        <template v-if="!isGameStarted && !isGameOver">
          <div class="start-prompt">按下空格键开始游戏</div>
        </template>
        <template v-else>
          <span
            v-for="(char, index) in currentText"
            :key="index"
            :class="{
              'correct': typedChars[index] === char,
              'incorrect': typedChars[index] !== undefined && typedChars[index] !== char,
              'current': currentIndex === index
            }"
          >{{ char }}</span>
        </template>
      </div>

      <input
        ref="inputRef"
        v-model="currentInput"
        class="typing-input"
        :disabled="!isGameStarted || isGameOver"
        @input="handleInput"
        @keydown.space.prevent="handleSpace"
        @keydown.enter="handleEnter"
        placeholder="在此输入..."
      />
    </div>

    <div class="stats" v-if="isGameStarted || isGameOver">
      <div class="stat-item">
        <div class="stat-label">正确字数</div>
        <div class="stat-value">{{ correctChars }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">错误字数</div>
        <div class="stat-value">{{ incorrectChars }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">当前单词</div>
        <div class="stat-value">{{ currentWordIndex + 1 }}/{{ totalWords }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// 单词库
const wordList = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what'
]

// 句子库
const sentenceList = [
  'The quick brown fox jumps over the lazy dog.',
  'All work and no play makes Jack a dull boy.',
  'Actions speak louder than words.',
  'Practice makes perfect.',
  'Where there is a will there is a way.',
  'Time flies like an arrow.',
  'Better late than never.',
  'Every cloud has a silver lining.',
  'Two heads are better than one.',
  'A journey of a thousand miles begins with a single step.'
]

// 游戏状态
const gameMode = ref<'words' | 'sentences'>('words')
const gameDuration = ref(60)
const isGameStarted = ref(false)
const isGameOver = ref(false)
const timeLeft = ref(0)
const currentText = ref('')
const currentInput = ref('')
const typedChars = ref<string[]>([])
const currentIndex = ref(0)
const currentWordIndex = ref(0)
const totalWords = ref(0)
const correctChars = ref(0)
const incorrectChars = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
let timerInterval: number | null = null

// 计算属性
const accuracy = computed(() => {
  const total = correctChars.value + incorrectChars.value
  return total === 0 ? 100 : (correctChars.value / total) * 100
})

const wpm = computed(() => {
  const minutes = (gameDuration.value - timeLeft.value) / 60
  return minutes === 0 ? 0 : Math.round(correctChars.value / 5 / minutes)
})

// 事件
const emit = defineEmits<{
  (e: 'score-change', score: number): void
  (e: 'accuracy-change', accuracy: number): void
  (e: 'wpm-change', wpm: number): void
  (e: 'game-over'): void
}>()

// 方法
const generateText = () => {
  if (gameMode.value === 'words') {
    const words = []
    for (let i = 0; i < 10; i++) {
      words.push(wordList[Math.floor(Math.random() * wordList.length)])
    }
    currentText.value = words.join(' ')
    totalWords.value = words.length
  } else {
    currentText.value = sentenceList[Math.floor(Math.random() * sentenceList.length)]
    totalWords.value = currentText.value.split(' ').length
  }
}

const startGame = () => {
  if (!isGameStarted.value && !isGameOver.value) {
    isGameStarted.value = true
    timeLeft.value = gameDuration.value
    generateText()
    currentInput.value = ''
    typedChars.value = []
    currentIndex.value = 0
    currentWordIndex.value = 0
    correctChars.value = 0
    incorrectChars.value = 0
    
    timerInterval = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
        emit('wpm-change', wpm.value)
        emit('accuracy-change', accuracy.value)
      } else {
        endGame()
      }
    }, 1000)

    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

const endGame = () => {
  isGameStarted.value = false
  isGameOver.value = true
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  emit('game-over')
}

const handleInput = () => {
  if (!isGameStarted.value || isGameOver.value) return

  const inputChar = currentInput.value[currentInput.value.length - 1]
  if (inputChar) {
    typedChars.value[currentIndex.value] = inputChar
    if (inputChar === currentText.value[currentIndex.value]) {
      correctChars.value++
    } else {
      incorrectChars.value++
    }
    currentIndex.value++
    emit('score-change', correctChars.value)
    emit('accuracy-change', accuracy.value)
  }

  // 检查是否完成当前文本
  if (currentIndex.value >= currentText.value.length) {
    generateText()
    currentInput.value = ''
    typedChars.value = []
    currentIndex.value = 0
    currentWordIndex.value++
  }
}

const handleSpace = (e: KeyboardEvent) => {
  if (!isGameStarted.value && !isGameOver.value) {
    startGame()
  }
}

const handleEnter = () => {
  if (isGameStarted.value) {
    currentInput.value = ''
    generateText()
    typedChars.value = []
    currentIndex.value = 0
    currentWordIndex.value++
  }
}

const resetGame = () => {
  isGameStarted.value = false
  isGameOver.value = false
  timeLeft.value = 0
  currentText.value = ''
  currentInput.value = ''
  typedChars.value = []
  currentIndex.value = 0
  currentWordIndex.value = 0
  correctChars.value = 0
  incorrectChars.value = 0
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleSpace)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleSpace)
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

// 暴露方法
defineExpose({
  resetGame
})
</script>

<style scoped lang="scss">
.typing-game {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .timer {
    font-size: 1.2rem;
    font-weight: bold;
    color: #776e65;

    &.warning {
      color: #f65e3b;
    }
  }

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #bbada0;
    background: white;
    color: #776e65;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.game-content {
  margin-bottom: 20px;
}

.text-display {
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 100px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  white-space: pre-wrap;

  &.game-over {
    opacity: 0.6;
  }

  .start-prompt {
    color: #776e65;
    text-align: center;
    font-size: 1.2rem;
  }

  span {
    &.correct {
      color: #6aaa64;
    }

    &.incorrect {
      color: #f65e3b;
      text-decoration: underline;
    }

    &.current {
      background-color: #c9b458;
      border-radius: 2px;
    }
  }
}

.typing-input {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  border: 2px solid #bbada0;
  border-radius: 4px;
  margin-bottom: 20px;

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: #8f7a66;
  }
}

.stats {
  display: flex;
  justify-content: space-around;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;

  .stat-item {
    text-align: center;

    .stat-label {
      color: #776e65;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .stat-value {
      color: #8f7a66;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style> 