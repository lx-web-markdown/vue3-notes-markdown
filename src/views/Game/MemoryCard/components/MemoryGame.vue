<script setup lang="ts">
import { ref, computed } from 'vue'
import MemoryCard from './MemoryCard.vue'

interface Card {
  id: number
  value: number
  isFlipped: boolean
  isMatched: boolean
}

const cards = ref<Card[]>([])
const flippedCards = ref<Card[]>([])
const moves = ref(0)
const matchedPairs = ref(0)
const isGameComplete = computed(() => matchedPairs.value === 8)

// 初始化卡片
const initializeCards = () => {
  const values = Array.from({ length: 8 }, (_, i) => i + 1)
  const pairs = [...values, ...values]
  
  // 随机打乱卡片
  cards.value = pairs
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }))
    
  flippedCards.value = []
  moves.value = 0
  matchedPairs.value = 0
}

// 处理卡片点击
const handleCardClick = (card: Card) => {
  if (
    card.isMatched || 
    card.isFlipped || 
    flippedCards.value.length >= 2
  ) return

  // 翻转卡片
  card.isFlipped = true
  flippedCards.value.push(card)

  // 检查是否匹配
  if (flippedCards.value.length === 2) {
    moves.value++
    const [firstCard, secondCard] = flippedCards.value

    if (firstCard.value === secondCard.value) {
      // 匹配成功
      firstCard.isMatched = true
      secondCard.isMatched = true
      matchedPairs.value++
      flippedCards.value = []
    } else {
      // 不匹配，延迟翻回
      setTimeout(() => {
        firstCard.isFlipped = false
        secondCard.isFlipped = false
        flippedCards.value = []
      }, 1000)
    }
  }
}

// 重新开始游戏
const restartGame = () => {
  initializeCards()
}

// 初始化游戏
initializeCards()
</script>

<template>
  <div class="memory-game">
    <div class="game-header">
      <h2 class="game-title">记忆翻牌</h2>
      <div class="game-stats">
        <span>步数: {{ moves }}</span>
        <span>配对: {{ matchedPairs }}/8</span>
      </div>
      <button class="restart-btn" @click="restartGame">重新开始</button>
    </div>
    
    <div class="cards-grid">
      <MemoryCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @click="handleCardClick(card)"
      />
    </div>

    <div v-if="isGameComplete" class="game-complete">
      <h3>恭喜完成！</h3>
      <p>总步数：{{ moves }}</p>
      <button class="restart-btn" @click="restartGame">再玩一次</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.memory-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;

  .game-title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .game-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.restart-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3aa876;
  }
}

.game-complete {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    color: #42b883;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
}
</style> 