<template>
  <div class="chess-game" @click="handleBoardClick">
    <div class="chess-board" ref="boardRef">
      <!-- 棋盘背景 -->
      <div class="board-grid">
        <div v-for="i in 9" :key="`v-${i}`" class="vertical-line"></div>
        <div v-for="i in 10" :key="`h-${i}`" class="horizontal-line"></div>
        
        <!-- 九宫格斜线 -->
        <div class="palace-lines red"></div>
        <div class="palace-lines black"></div>
        
        <!-- 星位标记 -->
        <div class="star-points">
          <!-- 炮位 -->
          <div class="point" style="left: 12.5%; top: 22.22%"></div>
          <div class="point" style="left: 87.5%; top: 22.22%"></div>
          <div class="point" style="left: 12.5%; top: 77.78%"></div>
          <div class="point" style="left: 87.5%; top: 77.78%"></div>
          <!-- 马位 -->
          <div class="point" style="left: 25%; top: 33.33%"></div>
          <div class="point" style="left: 75%; top: 33.33%"></div>
          <div class="point" style="left: 25%; top: 66.67%"></div>
          <div class="point" style="left: 75%; top: 66.67%"></div>
          <!-- 兵位 -->
          <div class="point" style="left: 12.5%; top: 33.33%"></div>
          <div class="point" style="left: 37.5%; top: 33.33%"></div>
          <div class="point" style="left: 62.5%; top: 33.33%"></div>
          <div class="point" style="left: 87.5%; top: 33.33%"></div>
          <div class="point" style="left: 12.5%; top: 66.67%"></div>
          <div class="point" style="left: 37.5%; top: 66.67%"></div>
          <div class="point" style="left: 62.5%; top: 66.67%"></div>
          <div class="point" style="left: 87.5%; top: 66.67%"></div>
        </div>

        <div class="river">
          <span>楚河</span>
          <span>汉界</span>
        </div>
      </div>
      
      <!-- 棋子 -->
      <div 
        v-for="piece in pieces" 
        :key="piece.id"
        class="chess-piece"
        :class="[
          piece.color,
          { selected: selectedPiece?.id === piece.id },
          { 'possible-move': isPossibleMove(piece.position) }
        ]"
        :style="getPieceStyle(piece)"
      >
        {{ piece.name }}
      </div>

      <!-- 可移动位置提示 -->
      <div 
        v-for="pos in possibleMoves"
        :key="`${pos.x}-${pos.y}`"
        class="move-hint"
        :style="getPositionStyle(pos)"
      ></div>
    </div>

    <!-- 游戏控制 -->
    <div class="game-controls">
      <div class="turn-indicator">
        {{ isRedTurn ? '红方走棋' : '黑方走棋' }}
      </div>
      <div class="undo-count" v-if="undoCount > 0">
        剩余悔棋次数：{{ undoCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ChessPiece, Position, PieceType, PieceColor } from '../composables/types'
import { initializeBoard, getPossibleMoves, makeMove, evaluatePosition } from '../composables/gameLogic'
import { getAIMove } from '../composables/aiLogic'

const props = defineProps<{
  difficulty: 'easy' | 'medium' | 'hard'
}>()

const emit = defineEmits<{
  (e: 'game-over', isWin: boolean): void
}>()

// 游戏状态
const pieces = ref<ChessPiece[]>(initializeBoard())
const selectedPiece = ref<ChessPiece | null>(null)
const possibleMoves = ref<Position[]>([])
const isRedTurn = ref(true)
const undoCount = ref(3)
const moveHistory = ref<{piece: ChessPiece, from: Position, to: Position}[]>([])
const boardRef = ref<HTMLElement | null>(null)

// 计算属性和方法
const isPossibleMove = (pos: Position) => {
  return possibleMoves.value.some(p => p.x === pos.x && p.y === pos.y)
}

const getPieceStyle = (piece: ChessPiece) => {
  const boardWidth = 500 // 实际棋盘宽度（不包含padding）
  const boardHeight = 560 // 实际棋盘高度（不包含padding）
  const x = (piece.position.x * boardWidth / 8) + 20 // +20是padding
  const y = (piece.position.y * boardHeight / 9) + 20 // +20是padding
  return {
    left: `${x}px`,
    top: `${y}px`
  }
}

const getPositionStyle = (pos: Position) => {
  const boardWidth = 500 // 实际棋盘宽度（不包含padding）
  const boardHeight = 560 // 实际棋盘高度（不包含padding）
  const x = (pos.x * boardWidth / 8) + 20 // +20是padding
  const y = (pos.y * boardHeight / 9) + 20 // +20是padding
  return {
    left: `${x}px`,
    top: `${y}px`
  }
}

// 游戏逻辑
const handleBoardClick = (event: MouseEvent) => {
  if (!isRedTurn.value) return // 电脑思考时不允许操作
  
  const boardRect = boardRef.value!.getBoundingClientRect()
  const boardWidth = boardRect.width - 40 // 减去padding
  const boardHeight = boardRect.height - 40 // 减去padding
  const x = Math.floor(((event.clientX - boardRect.left - 20) / boardWidth) * 8)
  const y = Math.floor(((event.clientY - boardRect.top - 20) / boardHeight) * 9)
  
  const clickedPiece = pieces.value.find(p => 
    p.position.x === x && p.position.y === y
  )

  if (selectedPiece.value) {
    if (isPossibleMove({ x, y })) {
      // 移动棋子
      const move = makeMove(pieces.value, selectedPiece.value, { x, y })
      if (move) {
        moveHistory.value.push(move)
        isRedTurn.value = false
        selectedPiece.value = null
        possibleMoves.value = []
        
        // 检查游戏是否结束
        if (checkGameOver()) {
          emit('game-over', true)
          return
        }
        
        // AI走棋
        setTimeout(makeAIMove, 500)
      }
    } else if (clickedPiece?.color === 'red') {
      // 选择新的己方棋子
      selectedPiece.value = clickedPiece
      possibleMoves.value = getPossibleMoves(pieces.value, clickedPiece)
    } else {
      // 取消选择
      selectedPiece.value = null
      possibleMoves.value = []
    }
  } else if (clickedPiece?.color === 'red') {
    // 选择己方棋子
    selectedPiece.value = clickedPiece
    possibleMoves.value = getPossibleMoves(pieces.value, clickedPiece)
  }
}

const makeAIMove = async () => {
  const difficulty = {
    easy: 2,
    medium: 3,
    hard: 4
  }[props.difficulty]
  
  const aiMove = await getAIMove(pieces.value, difficulty)
  if (aiMove) {
    const { piece, to } = aiMove
    const move = makeMove(pieces.value, piece, to)
    if (move) {
      moveHistory.value.push(move)
      isRedTurn.value = true
      
      // 检查游戏是否结束
      if (checkGameOver()) {
        emit('game-over', false)
      }
    }
  }
}

const checkGameOver = () => {
  const redKing = pieces.value.find(p => p.type === 'king' && p.color === 'red')
  const blackKing = pieces.value.find(p => p.type === 'king' && p.color === 'black')
  return !redKing || !blackKing
}

// 悔棋功能
const handleUndo = (e: KeyboardEvent) => {
  if (e.code === 'Space' && undoCount.value > 0 && moveHistory.value.length >= 2) {
    const aiMove = moveHistory.value.pop()!
    const playerMove = moveHistory.value.pop()!
    
    // 恢复棋子位置
    pieces.value = pieces.value.map(p => {
      if (p.id === aiMove.piece.id) {
        return { ...p, position: aiMove.from }
      }
      if (p.id === playerMove.piece.id) {
        return { ...p, position: playerMove.from }
      }
      return p
    })
    
    undoCount.value--
    isRedTurn.value = true
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleUndo)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleUndo)
})

// 导出方法
defineExpose({
  resetGame: () => {
    pieces.value = initializeBoard()
    selectedPiece.value = null
    possibleMoves.value = []
    isRedTurn.value = true
    undoCount.value = 3
    moveHistory.value = []
  }
})
</script>

<style scoped lang="scss">
.chess-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.chess-board {
  position: relative;
  width: 540px;
  height: 600px;
  background: #f3d0a7;
  border: 2px solid #8b4513;
  border-radius: 4px;
  padding: 20px;
}

.board-grid {
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  
  .vertical-line {
    position: absolute;
    width: 2px;
    height: 100%;
    background: #8b4513;
    
    @for $i from 0 through 8 {
      &:nth-child(#{$i + 1}) {
        left: calc(#{$i} * (100% / 8));
      }
    }
  }
  
  .horizontal-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: #8b4513;
    
    @for $i from 0 through 9 {
      &:nth-child(#{$i + 10}) {
        top: calc(#{$i} * (100% / 9));
      }
    }
  }

  .star-points {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .point {
      position: absolute;
      width: 10px;
      height: 10px;
      transform: translate(-50%, -50%);

      &::before,
      &::after {
        content: '';
        position: absolute;
        background: #8b4513;
      }

      &::before {
        width: 2px;
        height: 10px;
        left: 4px;
        top: 0;
      }

      &::after {
        width: 10px;
        height: 2px;
        left: 0;
        top: 4px;
      }
    }
  }
  
  .palace-lines {
    position: absolute;
    width: calc(25% * 2);
    height: calc(100% / 3);
    pointer-events: none;
    
    &.red {
      bottom: 0;
      left: calc(50% - 25%);
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 141.4%;  // √2 * 100%
        height: 2px;
        background: #8b4513;
        transform-origin: 0 0;
      }
      
      &::before {
        transform: rotate(45deg);
      }
      
      &::after {
        left: 100%;
        transform-origin: 0 0;
        transform: rotate(-45deg);
      }
    }
    
    &.black {
      top: 0;
      left: calc(50% - 25%);
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 141.4%;  // √2 * 100%
        height: 2px;
        background: #8b4513;
        transform-origin: 0 0;
      }
      
      &::before {
        transform: rotate(45deg);
      }
      
      &::after {
        left: 100%;
        transform-origin: 0 0;
        transform: rotate(-45deg);
      }
    }
  }
  
  .river {
    position: absolute;
    width: 100%;
    top: 45%;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20%;
    font-size: 32px;
    color: #8b4513;
    pointer-events: none;
  }
}

.chess-piece {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #8b4513;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s;
  user-select: none;
  transform: translate(-50%, -50%);
  
  &.red {
    background: #f44336;
    color: #fff;
  }
  
  &.black {
    background: #2f2f2f;
    color: #fff;
  }
  
  &.selected {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  &.possible-move {
    opacity: 0.7;
  }
}

.move-hint {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.5);
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.game-controls {
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
  color: #8b4513;
  
  .turn-indicator {
    font-weight: bold;
  }
}
</style> 