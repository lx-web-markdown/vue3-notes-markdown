import { ref } from 'vue'
import type { Ref } from 'vue'

interface Cell {
  value: number | null
  isFixed: boolean
  notes: number[]
}

export function useSudoku() {
  const board: Ref<Cell[][]> = ref(
    Array(9).fill(null).map(() =>
      Array(9).fill(null).map(() => ({
        value: null,
        isFixed: false,
        notes: []
      }))
    )
  )

  // 生成新游戏
  const generateNewGame = (difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
    const solution = generateSolution()
    const puzzle = generatePuzzle(solution, difficulty)
    
    // 更新棋盘
    board.value = puzzle.map(row =>
      row.map(value => ({
        value: value,
        isFixed: value !== null,
        notes: []
      }))
    )
  }

  // 生成完整的数独解决方案
  const generateSolution = (): number[][] => {
    const grid: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null))
    fillGrid(grid)
    return grid as number[][]
  }

  // 递归填充数独网格
  const fillGrid = (grid: (number | null)[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === null) {
          const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
          for (const num of numbers) {
            if (isValidPlacement(grid, row, col, num)) {
              grid[row][col] = num
              if (fillGrid(grid)) {
                return true
              }
              grid[row][col] = null
            }
          }
          return false
        }
      }
    }
    return true
  }

  // 生成谜题（通过移除一些数字）
  const generatePuzzle = (solution: number[][], difficulty: 'easy' | 'medium' | 'hard'): (number | null)[][] => {
    const cellsToRemove = {
      easy: 30,
      medium: 45,
      hard: 55
    }[difficulty]

    const puzzle = solution.map(row => [...row])
    const positions = shuffle(Array.from({ length: 81 }, (_, i) => ({
      row: Math.floor(i / 9),
      col: i % 9
    })))

    for (let i = 0; i < cellsToRemove; i++) {
      const { row, col } = positions[i]
      puzzle[row][col] = null
    }

    return puzzle
  }

  // 检查数字放置是否有效
  const isValidPlacement = (grid: (number | null)[][], row: number, col: number, num: number): boolean => {
    // 检查行
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false
    }

    // 检查列
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false
    }

    // 检查3x3方格
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false
      }
    }

    return true
  }

  // 检查游戏是否完成
  const isGameComplete = (): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!board.value[row][col].value) return false
      }
    }
    return true
  }

  // 辅助函数：随机打乱数组
  const shuffle = <T>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  return {
    board,
    generateNewGame,
    isValidPlacement: (row: number, col: number, num: number) => 
      isValidPlacement(board.value.map(r => r.map(c => c.value)), row, col, num),
    isGameComplete
  }
} 