<template>
  <div class="pop-star-game">
    <div class="game-header">
      <div class="scores">
        <div class="score">得分: {{ score }}</div>
        <div class="best-score">最高分: {{ bestScore }}</div>
      </div>
      <button @click="restartGame" class="restart-btn">重新开始</button>
    </div>
    
    <div class="game-board">
      <div v-for="(row, rowIndex) in blocks" 
           :key="rowIndex" 
           class="game-row">
        <div v-for="(block, colIndex) in row" 
             :key="block.id"
             :class="{
               'game-block': true,
               'selected': block.isSelected,
               'removed': block.isRemoved,
               'new': block.isNew,
               'falling': block.isFalling
             }"
             :style="{
               backgroundColor: block.isRemoved ? 'transparent' : block.color
             }"
             @click="handleBlockClick(rowIndex, colIndex)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { usePopStar } from '../composables/usePopStar'

const emit = defineEmits<{
  (e: 'score-change', score: number): void
  (e: 'game-over', score: number, bestScore: number): void
}>()

const {
  GRID_SIZE,
  BLOCK_SIZE,
  COLORS,
  score,
  bestScore,
  blocks,
  selectedBlocks,
  isGameOver,
  availableBlocks,
  initGame,
  handleBlockClick,
  gameOver
} = usePopStar()

// 重新开始游戏
const restartGame = () => {
  initGame()
}

// 监听分数变化
watch(score, (newScore) => {
  emit('score-change', newScore)
})

// 监听游戏结束
watch(isGameOver, (newIsGameOver) => {
  if (newIsGameOver) {
    const result = gameOver()
    emit('game-over', result.score, result.bestScore)
  }
})

// 组件挂载时初始化游戏
onMounted(() => {
  initGame()
})
</script>

<style scoped lang="scss">
.pop-star-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  
  .game-header {
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    
    .scores {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 15px;
      
      .score,
      .best-score {
        background: #bbada0;
        padding: 10px 20px;
        border-radius: 6px;
        color: white;
        font-weight: bold;
        font-size: 1.2em;
      }
    }
    
    .restart-btn {
      padding: 10px 20px;
      background-color: #8f7a66;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.1em;
      font-weight: bold;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: #7f6a56;
      }
    }
  }
  
  .game-board {
    width: 500px;
    height: 500px;
    border: 2px solid #bbada0;
    padding: 2px;
    background-color: #faf8ef;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    .game-row {
      display: flex;
      
      .game-block {
        $board-size: 500px;
        $border-width: 2px;
        $padding: 2px;
        $grid-size: 10;
        $block-gap: 2px;
        
        width: calc(($board-size - 2 * $border-width - 2 * $padding - ($grid-size - 1) * $block-gap) / $grid-size);
        height: calc(($board-size - 2 * $border-width - 2 * $padding - ($grid-size - 1) * $block-gap) / $grid-size);
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        margin: 1px;
        
        &:hover:not(.removed) {
          transform: scale(0.95);
        }
        
        &.selected {
          opacity: 0.6;
          transform: scale(0.9);
        }
        
        &.removed {
          opacity: 0;
          transform: scale(0);
        }
        
        &.new {
          animation: appear 0.3s ease-out;
        }
        
        &.falling {
          animation: fall 0.3s ease-in;
        }
      }
    }
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fall {
  0% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}
</style> 