<template>
  <div class="tetris-game" ref="gameContainer" tabindex="0">
    <div class="game-board">
      <div v-for="(row, rowIndex) in displayBoard" :key="rowIndex" class="row">
        <div 
          v-for="(cell, colIndex) in row" 
          :key="colIndex" 
          class="cell"
          :class="{ 
            'filled': cell !== 0,
            [`color-${cell}`]: cell !== 0
          }"
        ></div>
      </div>
    </div>
    <div class="next-piece">
      <h3>下一个方块</h3>
      <div class="next-piece-board">
        <div v-for="(row, rowIndex) in nextPieceBoard" :key="rowIndex" class="row">
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex" 
            class="cell"
            :class="{ 
              'filled': cell !== 0,
              [`color-${cell}`]: cell !== 0
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const NEXT_PIECE_SIZE = 4

// 定义俄罗斯方块的形状
const SHAPES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 1
  },
  L: {
    shape: [[2, 0], [2, 0], [2, 2]],
    color: 2
  },
  J: {
    shape: [[0, 3], [0, 3], [3, 3]],
    color: 3
  },
  O: {
    shape: [[4, 4], [4, 4]],
    color: 4
  },
  S: {
    shape: [[0, 5, 5], [5, 5, 0]],
    color: 5
  },
  T: {
    shape: [[0, 6, 0], [6, 6, 6]],
    color: 6
  },
  Z: {
    shape: [[7, 7, 0], [0, 7, 7]],
    color: 7
  }
}

// 游戏状态
const gameBoard = ref<number[][]>(Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0)))
const nextPieceBoard = ref<number[][]>(Array(NEXT_PIECE_SIZE).fill(0).map(() => Array(NEXT_PIECE_SIZE).fill(0)))
const currentPiece = ref<{ shape: number[][], x: number, y: number } | null>(null)
const nextPiece = ref<{ shape: number[][], color: number } | null>(null)
const gameInterval = ref<NodeJS.Timeout | null>(null)
const score = ref(0)
const gameContainer = ref<HTMLElement | null>(null)
const displayBoard = ref<number[][]>(Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0)))

const emit = defineEmits<{
  (e: 'score-change', score: number): void
  (e: 'game-over'): void
}>()

// 生成随机方块
const getRandomPiece = () => {
  const shapes = Object.values(SHAPES)
  const piece = shapes[Math.floor(Math.random() * shapes.length)]
  return { shape: piece.shape, color: piece.color }
}

// 初始化游戏
const initGame = () => {
  gameBoard.value = Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0))
  displayBoard.value = Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0))
  nextPieceBoard.value = Array(NEXT_PIECE_SIZE).fill(0).map(() => Array(NEXT_PIECE_SIZE).fill(0))
  score.value = 0
  emit('score-change', score.value)
  nextPiece.value = getRandomPiece()
  spawnPiece()
}

// 生成新方块
const spawnPiece = () => {
  if (!nextPiece.value) {
    console.log('No next piece available, generating new one')
    nextPiece.value = getRandomPiece()
  }

  const shape = nextPiece.value.shape
  const color = nextPiece.value.color
  
  console.log('Spawning new piece:', { shape, color })
  
  currentPiece.value = {
    shape: shape.map(row => row.map(cell => cell === 0 ? 0 : color)),
    x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
    y: 0
  }

  // 生成下一个方块
  nextPiece.value = getRandomPiece()
  updateNextPieceBoard()
  updateDisplayBoard()

  // 检查游戏是否结束
  if (!isValidMove(currentPiece.value.shape, currentPiece.value.x, currentPiece.value.y)) {
    console.log('Game over - no valid moves for new piece')
    gameOver()
  }
}

// 更新预览区域
const updateNextPieceBoard = () => {
  if (!nextPiece.value) return
  
  nextPieceBoard.value = Array(NEXT_PIECE_SIZE).fill(0).map(() => Array(NEXT_PIECE_SIZE).fill(0))
  const shape = nextPiece.value.shape
  const color = nextPiece.value.color
  const offsetX = Math.floor((NEXT_PIECE_SIZE - shape[0].length) / 2)
  const offsetY = Math.floor((NEXT_PIECE_SIZE - shape.length) / 2)

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        nextPieceBoard.value[y + offsetY][x + offsetX] = color
      }
    })
  })
}

// 检查移动是否有效
const isValidMove = (shape: number[][], x: number, y: number) => {
  return shape.every((row, dy) => {
    return row.every((cell, dx) => {
      if (cell === 0) return true
      const newX = x + dx
      const newY = y + dy
      return (
        newX >= 0 &&
        newX < BOARD_WIDTH &&
        newY >= 0 &&
        newY < BOARD_HEIGHT &&
        gameBoard.value[newY][newX] === 0
      )
    })
  })
}

// 合并方块到游戏板
const mergePiece = () => {
  if (!currentPiece.value) return

  currentPiece.value.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        const boardY = y + currentPiece.value!.y
        const boardX = x + currentPiece.value!.x
        if (boardY >= 0 && boardY < BOARD_HEIGHT) {
          gameBoard.value[boardY][boardX] = cell
        }
      }
    })
  })

  updateDisplayBoard()
  // 检查并清除完整的行
  clearLines()
  spawnPiece()
}

// 清除完整的行
const clearLines = () => {
  let linesCleared = 0
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (gameBoard.value[y].every(cell => cell !== 0)) {
      // 移除该行并在顶部添加新行
      gameBoard.value.splice(y, 1)
      gameBoard.value.unshift(Array(BOARD_WIDTH).fill(0))
      linesCleared++
      y++ // 重新检查当前行，因为上面的行已经下移
    }
  }

  if (linesCleared > 0) {
    // 计算得分：一次消除的行数越多，得分越高
    const points = [40, 100, 300, 1200][linesCleared - 1] || 0
    score.value += points
    emit('score-change', score.value)
  }
}

// 旋转方块
const rotatePiece = () => {
  if (!currentPiece.value) return

  const shape = currentPiece.value.shape
  const newShape = Array(shape[0].length).fill(0).map(() => Array(shape.length).fill(0))

  // 顺时针旋转90度
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      newShape[x][shape.length - 1 - y] = shape[y][x]
    }
  }

  if (isValidMove(newShape, currentPiece.value.x, currentPiece.value.y)) {
    currentPiece.value.shape = newShape
    updateDisplayBoard()
  }
}

// 移动方块
const movePiece = (dx: number, dy: number) => {
  if (!currentPiece.value) return false

  const newX = currentPiece.value.x + dx
  const newY = currentPiece.value.y + dy

  if (isValidMove(currentPiece.value.shape, newX, newY)) {
    currentPiece.value.x = newX
    currentPiece.value.y = newY
    updateDisplayBoard()
    return true
  }
  return false
}

// 处理按键事件
const handleKeydown = (event: KeyboardEvent) => {
  if (!currentPiece.value) return

  switch (event.code) {
    case 'ArrowLeft':
      event.preventDefault()
      movePiece(-1, 0)
      break
    case 'ArrowRight':
      event.preventDefault()
      movePiece(1, 0)
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!movePiece(0, 1)) {
        mergePiece()
      }
      break
    case 'Space':
      event.preventDefault()
      rotatePiece()
      break
  }
}

// 游戏主循环
const gameLoop = () => {
  if (!currentPiece.value) {
    console.log('No current piece, spawning new one')
    spawnPiece()
    return
  }
  
  if (!movePiece(0, 1)) {
    console.log('Piece cannot move down, merging')
    mergePiece()
  }
}

// 游戏结束
const gameOver = () => {
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
    gameInterval.value = null
  }
  emit('game-over')
}

// 重置游戏
const resetGame = () => {
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
  }
  initGame()
  // 将间隔时间从1000ms改为500ms，使游戏更流畅
  gameInterval.value = setInterval(gameLoop, 500)
}

// 更新显示的游戏板
const updateDisplayBoard = () => {
  // 首先复制当前的游戏板
  displayBoard.value = gameBoard.value.map(row => [...row])
  
  // 如果有当前方块，将其添加到显示板上
  if (currentPiece.value) {
    const { shape, x, y } = currentPiece.value
    shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell !== 0) {
          const boardY = y + dy
          const boardX = x + dx
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard.value[boardY][boardX] = cell
          }
        }
      })
    })
  }
}

// 组件挂载时初始化
onMounted(() => {
  if (gameContainer.value) {
    gameContainer.value.focus()
  }
  window.addEventListener('keydown', handleKeydown)
  resetGame()
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
  }
})

defineExpose({
  resetGame
})
</script>

<style scoped lang="scss">
.tetris-game {
  display: flex;
  gap: 2rem;
  justify-content: center;
  outline: none;
}

.game-board {
  border: 2px solid #bbada0;
  border-radius: 4px;
  background: #cdc1b4;
  padding: 4px;
}

.next-piece {
  h3 {
    color: #776e65;
    margin-bottom: 1rem;
    text-align: center;
  }

  .next-piece-board {
    border: 2px solid #bbada0;
    border-radius: 4px;
    background: #cdc1b4;
    padding: 4px;
  }
}

.row {
  display: flex;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #bbada0;
  background: #ccc;

  &.filled {
    border-color: rgba(0, 0, 0, 0.1);
  }

  &.color-1 { background-color: #00f0f0; } // I
  &.color-2 { background-color: #f0a000; } // L
  &.color-3 { background-color: #0000f0; } // J
  &.color-4 { background-color: #f0f000; } // O
  &.color-5 { background-color: #00f000; } // S
  &.color-6 { background-color: #a000f0; } // T
  &.color-7 { background-color: #f00000; } // Z
}
</style> 