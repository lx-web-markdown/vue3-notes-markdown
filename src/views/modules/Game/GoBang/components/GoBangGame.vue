<template>
  <div class="gobang-game">
    <div class="game-info">
      <div class="player-info">
        <div :class="['player', { active: currentPlayer === 'black' }]">
          黑方{{ playerColor === 'black' ? '(你)' : '' }}
        </div>
        <div :class="['player', { active: currentPlayer === 'white' }]">
          白方{{ playerColor === 'white' ? '(你)' : '' }}
        </div>
      </div>
      <div class="game-status">
        <template v-if="connectionError">{{ connectionError }}</template>
        <template v-else>{{ gameStatus }}</template>
      </div>
    </div>
    
    <div class="board" ref="boardRef">
      <canvas ref="canvasRef" @click="handleClick"></canvas>
    </div>

    <div class="controls">
      <el-button 
        type="primary" 
        @click="startGame" 
        :disabled="!isConnected || gameStarted"
      >
        {{ playerColor === 'black' ? '开始游戏' : '等待房主开始' }}
      </el-button>
      <el-button 
        type="warning" 
        @click="surrender" 
        :disabled="!gameStarted"
      >
        认输
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useGoBang } from '../composables/useGoBang'
import type { Position } from '../types'

const props = defineProps<{
  peerId: string
  playerColor: 'black' | 'white'
}>()

const emit = defineEmits<{
  (e: 'game-end'): void
}>()

const boardRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

const {
  currentPlayer,
  gameStarted,
  gameStatus,
  isCurrentPlayer,
  isConnected,
  connectionError,
  board,
  initGame,
  makeMove,
  startGame,
  surrender,
  cleanup,
  connectToPeer
} = useGoBang(props.peerId, props.playerColor)

// 棋盘绘制相关变量
const BOARD_SIZE = 15
const CELL_SIZE = 40
const PIECE_RADIUS = 18

// 处理点击事件
const handleClick = (e: MouseEvent) => {
  if (!gameStarted.value || !isCurrentPlayer.value) {
    console.log('Invalid click:', { 
      gameStarted: gameStarted.value, 
      isCurrentPlayer: isCurrentPlayer.value 
    })
    return
  }

  const rect = canvasRef.value!.getBoundingClientRect()
  const x = Math.floor((e.clientX - rect.left) / CELL_SIZE)
  const y = Math.floor((e.clientY - rect.top) / CELL_SIZE)

  if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
    console.log('Making move:', { x, y })
    makeMove({ x, y })
  }
}

// 绘制棋盘
const drawBoard = () => {
  const ctx = canvasRef.value!.getContext('2d')!
  const width = CELL_SIZE * BOARD_SIZE
  const height = CELL_SIZE * BOARD_SIZE

  // 设置画布大小
  canvasRef.value!.width = width
  canvasRef.value!.height = height

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制背景
  ctx.fillStyle = '#f0c78a'
  ctx.fillRect(0, 0, width, height)

  // 绘制网格
  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 1

  for (let i = 0; i <= BOARD_SIZE; i++) {
    ctx.moveTo(i * CELL_SIZE, 0)
    ctx.lineTo(i * CELL_SIZE, height)
    ctx.moveTo(0, i * CELL_SIZE)
    ctx.lineTo(width, i * CELL_SIZE)
  }
  ctx.stroke()

  // 绘制棋子
  board.value.forEach((row, y) => {
    row.forEach((piece, x) => {
      if (piece) {
        ctx.beginPath()
        ctx.fillStyle = piece === 'black' ? '#000' : '#fff'
        ctx.arc(
          x * CELL_SIZE + CELL_SIZE / 2,
          y * CELL_SIZE + CELL_SIZE / 2,
          PIECE_RADIUS,
          0,
          Math.PI * 2
        )
        ctx.fill()
        if (piece === 'white') {
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    })
  })
}

// 监听棋盘变化重新绘制
watch(() => board.value, drawBoard, { deep: true })

// 监听连接状态变化
watch([isConnected, connectionError], ([newConnected, newError], [oldConnected]) => {
  console.log('Connection status changed:', { 
    connected: newConnected, 
    error: newError,
    playerColor: props.playerColor 
  })
  
  // 如果连接断开且没有错误，尝试重新连接
  if (!newConnected && !newError && oldConnected && props.playerColor === 'white') {
    console.log('Connection lost, attempting to reconnect...')
    connectToPeer(props.peerId)
  }
})

// 监听游戏状态变化
watch(gameStarted, (newVal, oldVal) => {
  console.log('Game started changed:', { 
    newVal, 
    oldVal,
    playerColor: props.playerColor,
    isConnected: isConnected.value
  })
  if (!newVal && oldVal) {
    emit('game-end')
  }
})

onMounted(() => {
  console.log('GoBangGame mounted:', { 
    peerId: props.peerId, 
    playerColor: props.playerColor,
    isConnected: isConnected.value
  })
  
  drawBoard()
  initGame()
  
  // 建立连接
  if (props.playerColor === 'black') {
    console.log('Host waiting for connection...')
  } else if (props.peerId) {
    console.log('Peer connecting to host:', props.peerId)
    // 立即尝试连接
    connectToPeer(props.peerId)
  }
})

onUnmounted(() => {
  console.log('GoBangGame unmounting, cleaning up...')
  cleanup()
})
</script>

<style scoped lang="scss">
.gobang-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .game-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .player-info {
      display: flex;
      gap: 20px;

      .player {
        padding: 8px 16px;
        border-radius: 4px;
        background: #f5f5f5;

        &.active {
          background: #409eff;
          color: white;
        }
      }
    }

    .game-status {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .board {
    border: 2px solid #666;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .controls {
    display: flex;
    gap: 10px;
  }
}
</style> 