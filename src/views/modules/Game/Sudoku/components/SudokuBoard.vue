<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'

interface Cell {
  value: number | null
  isFixed: boolean
  notes: number[]
}

// 初始化9x9的数独板
const board = reactive<Cell[][]>(
  Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      isFixed: false,
      notes: []
    }))
  )
)

const selectedCell: Ref<{ row: number; col: number } | null> = ref(null)

// 选择单元格
const selectCell = (row: number, col: number) => {
  selectedCell.value = { row, col }
}

// 填入数字
const fillNumber = (num: number) => {
  if (!selectedCell.value) return
  const { row, col } = selectedCell.value
  if (!board[row][col].isFixed) {
    board[row][col].value = num
  }
}

// 检查是否有效的数字放置
const isValidPlacement = (row: number, col: number, num: number): boolean => {
  // 检查行
  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x].value === num) return false
  }
  
  // 检查列
  for (let x = 0; x < 9; x++) {
    if (x !== row && board[x][col].value === num) return false
  }
  
  // 检查3x3方格
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boxRow + i !== row && boxCol + j !== col && 
          board[boxRow + i][boxCol + j].value === num) {
        return false
      }
    }
  }
  
  return true
}
</script>

<template>
  <div class="sudoku-board">
    <div class="grid">
      <div v-for="(row, rowIndex) in board" 
           :key="rowIndex" 
           class="row">
        <div v-for="(cell, colIndex) in row" 
             :key="colIndex" 
             class="cell"
             :class="{
               'selected': selectedCell?.row === rowIndex && selectedCell?.col === colIndex,
               'fixed': cell.isFixed
             }"
             @click="selectCell(rowIndex, colIndex)">
          {{ cell.value || '' }}
        </div>
      </div>
    </div>
    <div class="number-pad">
      <button v-for="n in 9" 
              :key="n" 
              @click="fillNumber(n)">
        {{ n }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sudoku-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.grid {
  display: flex;
  flex-direction: column;
  border: 2px solid #333;
}

.row {
  display: flex;
  
  &:nth-child(3n) {
    border-bottom: 2px solid #333;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:nth-child(3n) {
    border-right: 2px solid #333;
  }
  
  &:last-child {
    border-right: none;
  }
  
  &.selected {
    background-color: #e3f2fd;
  }
  
  &.fixed {
    font-weight: bold;
    background-color: #f5f5f5;
  }
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  
  button {
    padding: 1rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style> 