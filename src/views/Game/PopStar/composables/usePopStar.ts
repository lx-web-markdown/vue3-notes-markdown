import { ref, reactive, computed } from 'vue'

// 定义方块的类型
export interface Block {
  id: number
  color: string
  isSelected: boolean
  isRemoved: boolean
  isNew?: boolean
  isFalling?: boolean
}

// 游戏配置
const COLORS = ['#FF4444', '#44FF44', '#4444FF', '#FFFF44', '#FF44FF']
const GRID_SIZE = 10
// 计算每个格子的大小：(游戏板大小 - 2*边框 - 2*内边距 - 格子总边框) / 格子数量
const BLOCK_SIZE = (500 - 2*2 - 2*2 - GRID_SIZE*2) / GRID_SIZE  // 约等于 48px

export function usePopStar() {
  // 游戏状态
  const score = ref(0)
  const bestScore = ref(parseInt(localStorage.getItem('popstar-best-score') || '0'))
  const blocks = reactive<Block[][]>(Array(GRID_SIZE).fill([]))
  const selectedBlocks = ref<Block[]>([])
  const isGameOver = ref(false)

  // 计算当前可消除的块数
  const availableBlocks = computed(() => {
    let count = 0
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!blocks[i][j].isRemoved && hasAdjacentSameColor(i, j)) {
          count++
        }
      }
    }
    return count
  })

  // 检查是否有相邻的相同颜色块
  const hasAdjacentSameColor = (row: number, col: number): boolean => {
    const color = blocks[row][col].color
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    
    return directions.some(([dx, dy]) => {
      const newRow = row + dx
      const newCol = col + dy
      return newRow >= 0 && newRow < GRID_SIZE && 
             newCol >= 0 && newCol < GRID_SIZE && 
             !blocks[newRow][newCol].isRemoved &&
             blocks[newRow][newCol].color === color
    })
  }

  // 初始化游戏
  const initGame = () => {
    isGameOver.value = false
    score.value = 0
    
    for (let i = 0; i < GRID_SIZE; i++) {
      blocks[i] = Array(GRID_SIZE).fill(null).map((_, j) => ({
        id: i * GRID_SIZE + j,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isSelected: false,
        isRemoved: false,
        isNew: true
      }))
    }
    
    // 延迟移除新块标记
    setTimeout(() => {
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          blocks[i][j].isNew = false
        }
      }
    }, 300)
  }

  // 检查相邻的相同颜色方块
  const checkAdjacent = (row: number, col: number, color: string, checked: Set<string>) => {
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return
    
    const key = `${row},${col}`
    if (checked.has(key)) return
    if (blocks[row][col].isRemoved) return
    if (blocks[row][col].color !== color) return

    checked.add(key)
    blocks[row][col].isSelected = true
    selectedBlocks.value.push(blocks[row][col])

    // 检查上下左右相邻方块
    checkAdjacent(row - 1, col, color, checked)
    checkAdjacent(row + 1, col, color, checked)
    checkAdjacent(row, col - 1, color, checked)
    checkAdjacent(row, col + 1, color, checked)
  }

  // 点击方块
  const handleBlockClick = (row: number, col: number) => {
    if (isGameOver.value) return
    
    // 清除之前的选择
    selectedBlocks.value.forEach(block => block.isSelected = false)
    selectedBlocks.value = []

    const block = blocks[row][col]
    if (block.isRemoved) return

    checkAdjacent(row, col, block.color, new Set())

    // 如果选中的方块数量大于1，允许消除
    if (selectedBlocks.value.length > 1) {
      setTimeout(() => {
        removeBlocks()
      }, 200)
    }
  }

  // 消除选中的方块
  const removeBlocks = () => {
    // 标记要移除的方块
    selectedBlocks.value.forEach(block => {
      block.isRemoved = true
    })
    
    // 计算得分 - 根据消除数量增加奖励
    const baseScore = selectedBlocks.value.length * 10
    const bonus = Math.floor(selectedBlocks.value.length / 5) * 20
    score.value += baseScore + bonus
    
    selectedBlocks.value = []
    
    // 让方块下落
    setTimeout(() => {
      dropBlocks()
    }, 300)
  }

  // 方块下落逻辑
  const dropBlocks = () => {
    for (let col = 0; col < GRID_SIZE; col++) {
      let writePos = GRID_SIZE - 1
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (!blocks[row][col].isRemoved) {
          if (writePos !== row) {
            blocks[writePos][col] = {
              ...blocks[row][col],
              isFalling: true
            }
            blocks[row][col] = {
              id: row * GRID_SIZE + col,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              isSelected: false,
              isRemoved: true
            }
          }
          writePos--
        }
      }
      
      // 填充顶部空缺
      for (let row = writePos; row >= 0; row--) {
        blocks[row][col] = {
          id: row * GRID_SIZE + col,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          isSelected: false,
          isRemoved: false,
          isNew: true
        }
      }
    }
    
    // 移除动画标记
    setTimeout(() => {
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          blocks[i][j].isFalling = false
          blocks[i][j].isNew = false
        }
      }
      
      // 检查游戏是否结束
      if (availableBlocks.value === 0) {
        gameOver()
      }
    }, 300)
  }

  // 游戏结束
  const gameOver = () => {
    isGameOver.value = true
    if (score.value > bestScore.value) {
      bestScore.value = score.value
      localStorage.setItem('popstar-best-score', score.value.toString())
    }
    return {
      score: score.value,
      bestScore: bestScore.value
    }
  }

  return {
    GRID_SIZE,
    COLORS,
    BLOCK_SIZE,
    score,
    bestScore,
    blocks,
    selectedBlocks,
    isGameOver,
    availableBlocks,
    initGame,
    handleBlockClick,
    gameOver
  }
} 