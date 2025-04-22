<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSudoku } from '../composables/useSudoku'

const { board, generateNewGame, isValidPlacement, isGameComplete } = useSudoku()
const selectedCell = ref<{ row: number; col: number } | null>(null)
const difficulty = ref<'easy' | 'medium' | 'hard'>('medium')
const isGameWon = ref(false)

// 选择单元格
const selectCell = (row: number, col: number) => {
  selectedCell.value = { row, col }
}

// 填入数字
const fillNumber = (num: number) => {
  if (!selectedCell.value || isGameWon.value) return
  
  const { row, col } = selectedCell.value
  if (!board.value[row][col].isFixed) {
    if (isValidPlacement(row, col, num)) {
      board.value[row][col].value = num
      
      if (isGameComplete()) {
        isGameWon.value = true
      }
    }
  }
}

// 开始新游戏
const startNewGame = () => {
  isGameWon.value = false
  generateNewGame(difficulty.value)
}

// 组件挂载时开始新游戏
onMounted(() => {
  startNewGame()
})
</script>

<template>
  <div class="sudoku-game">
    <div class="game-header">
      <h1>数独游戏</h1>
      <div class="controls">
        <select v-model="difficulty">
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
        <button @click="startNewGame" class="new-game-btn">
          新游戏
        </button>
      </div>
    </div>

    <div class="game-board">
      <div class="grid">
        <div v-for="(row, rowIndex) in board" 
             :key="rowIndex" 
             class="row">
          <div v-for="(cell, colIndex) in row" 
               :key="colIndex" 
               class="cell"
               :class="{
                 'selected': selectedCell?.row === rowIndex && selectedCell?.col === colIndex,
                 'fixed': cell.isFixed,
                 'invalid': cell.value && !isValidPlacement(rowIndex, colIndex, cell.value)
               }"
               @click="selectCell(rowIndex, colIndex)">
            {{ cell.value || '' }}
          </div>
        </div>
      </div>

      <div class="number-pad">
        <button v-for="n in 9" 
                :key="n" 
                @click="fillNumber(n)"
                :disabled="isGameWon">
          {{ n }}
        </button>
      </div>
    </div>

    <div v-if="isGameWon" class="win-message">
      🎉 恭喜！你已完成数独游戏！
    </div>
  </div>
</template>

<style scoped lang="scss">
.sudoku-game {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  select {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .new-game-btn {
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #3aa876;
    }
  }
}

.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.grid {
  display: flex;
  flex-direction: column;
  border: 2px solid #2c3e50;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  
  &:nth-child(3n) {
    border-bottom: 2px solid #2c3e50;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:nth-child(3n) {
    border-right: 2px solid #2c3e50;
  }
  
  &:last-child {
    border-right: none;
  }
  
  &.selected {
    background-color: #e3f2fd;
  }
  
  &.fixed {
    font-weight: bold;
    color: #2c3e50;
    background-color: #f8f9fa;
  }

  &.invalid {
    color: #dc3545;
    background-color: #ffe6e6;
  }
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  
  button {
    padding: 1rem;
    font-size: 1.2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background-color: #e3f2fd;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.win-message {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  font-size: 1.2rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 