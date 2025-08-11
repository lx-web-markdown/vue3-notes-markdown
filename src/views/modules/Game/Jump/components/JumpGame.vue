<template>
  <div class="game-container" ref="gameContainer">
    <canvas ref="gameCanvas" class="game-canvas"></canvas>
    <div v-if="isCharging" class="power-bar-container">
      <div class="power-bar" :style="{ width: `${chargePower}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { log } from 'console';
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'score-change', score: number): void
  (e: 'game-over'): void
}>()

// 游戏状态
const gameContainer = ref<HTMLDivElement | null>(null)
const gameCanvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isCharging = ref(false)
const chargePower = ref(0)
const score = ref(0)
const gameLoop = ref<number | null>(null)
const chargeInterval = ref<number | null>(null)
const isGameOver = ref(false)
const lastFrameTime = ref(0)

// 游戏配置
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const PLATFORM_WIDTH = 80
const PLATFORM_HEIGHT = 20
const PLAYER_SIZE = 20
const CHARGE_SPEED = 2
const MAX_POWER = 100
const GRAVITY = 0.5
const INITIAL_PLATFORM_COUNT = 5

// 游戏对象
interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

interface Player extends GameObject {
  velocityX: number
  velocityY: number
  isJumping: boolean
}

const player = ref<Player>({
  x: 0,
  y: 0,
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  velocityX: 0,
  velocityY: 0,
  isJumping: false
})

const platforms = ref<GameObject[]>([])

// 初始化游戏
const initGame = () => {
  if (!gameCanvas.value || !ctx.value) return

  // 设置画布大小
  gameCanvas.value.width = CANVAS_WIDTH
  gameCanvas.value.height = CANVAS_HEIGHT

  // 重置玩家位置
  player.value = {
    x: 50,
    y: CANVAS_HEIGHT - PLATFORM_HEIGHT - PLAYER_SIZE,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    velocityX: 0,
    velocityY: 0,
    isJumping: false
  }

  // 生成初始平台
  platforms.value = []
  let lastX = 0
  for (let i = 0; i < INITIAL_PLATFORM_COUNT; i++) {
    const platform = generatePlatform(lastX)
    platforms.value.push(platform)
    lastX = platform.x
  }

  // 重置分数
  score.value = 0
  emit('score-change', score.value)
}

// 生成新平台
const generatePlatform = (lastX: number): GameObject => {
  const minGap = 100
  const maxGap = 200
  const gap = Math.random() * (maxGap - minGap) + minGap
  
  return {
    x: lastX + gap,
    y: CANVAS_HEIGHT - PLATFORM_HEIGHT,
    width: PLATFORM_WIDTH,
    height: PLATFORM_HEIGHT
  }
}

// 检测碰撞
const checkCollision = (rect1: GameObject, rect2: GameObject): boolean => {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y
}

// 更新游戏状态
const update = () => {
  if (!ctx.value) return

  // 更新玩家位置
  if (player.value.isJumping) {
    // 使用帧时间差来平滑更新
    const now = performance.now()
    const deltaTime = now - (lastFrameTime.value || now)
    lastFrameTime.value = now
    const timeScale = deltaTime / (1000 / 60) // 基于60fps标准化

    player.value.x += player.value.velocityX * timeScale
    player.value.y += player.value.velocityY * timeScale
    player.value.velocityY += GRAVITY * timeScale

    // 检查游戏结束条件
    if (player.value.y > CANVAS_HEIGHT || player.value.x < 0) {
      gameOver()
      return
    }

    // 优化碰撞检测 - 只检查可能碰撞的平台
    const playerRight = player.value.x + player.value.width
    for (const platform of platforms.value) {
      if (platform.x > playerRight) continue // 平台在玩家右侧
      if (platform.x + platform.width < player.value.x) continue // 平台在玩家左侧
      
      if (checkCollision(player.value, platform)) {
        if (player.value.velocityY > 0) {
          player.value.y = platform.y - player.value.height
          player.value.isJumping = false
          player.value.velocityX = 0
          player.value.velocityY = 0

          // 计算得分
          const centerDiff = Math.abs((player.value.x + player.value.width / 2) - (platform.x + platform.width / 2))
          const points = centerDiff < 10 ? 2 : 1
          score.value += points
          emit('score-change', score.value)

          // 只在落地时生成新平台
          const lastPlatform = platforms.value[platforms.value.length - 1]
          const newPlatform = generatePlatform(lastPlatform.x)
          platforms.value.push(newPlatform)

          // 移除视野外的平台
          const viewportLeft = player.value.x - CANVAS_WIDTH
          while (platforms.value.length > INITIAL_PLATFORM_COUNT && 
                 platforms.value[0].x + platforms.value[0].width < viewportLeft) {
            platforms.value.shift()
          }
          
          break // 找到着陆平台后退出循环
        }
      }
    }
  }
}

// 渲染游戏画面
const render = () => {
  if (!ctx.value || !gameCanvas.value) return

  // 清空画布 - 优化清空操作
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)
  ctx.value.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height)

  // 应用相机变换
  const targetScrollX = Math.max(0, player.value.x - 100)
  ctx.value.setTransform(1, 0, 0, 1, -targetScrollX, 0)

  // 计算可视区域范围
  const viewportLeft = targetScrollX - 50 // 左边界缓冲
  const viewportRight = targetScrollX + CANVAS_WIDTH + 50 // 右边界缓冲

  // 只渲染可视区域内的平台
  ctx.value.fillStyle = '#8f7a66'
  for (const platform of platforms.value) {
    if (platform.x + platform.width >= viewportLeft && platform.x <= viewportRight) {
      ctx.value.fillRect(platform.x, platform.y, platform.width, platform.height)
    }
  }

  // 绘制玩家
  ctx.value.fillStyle = '#776e65'
  ctx.value.fillRect(player.value.x, player.value.y, player.value.width, player.value.height)
}

// 游戏循环
const gameStep = () => {
  if (isGameOver.value) return
  
  const startTime = performance.now()
  
  update()
  render()
  
  // 计算帧处理时间
  const frameTime = performance.now() - startTime
  if (frameTime > 16) { // 如果处理时间超过16.67ms (60fps)
    console.debug(`Frame time: ${frameTime.toFixed(2)}ms`)
  }
  
  if (!isGameOver.value) {
    gameLoop.value = requestAnimationFrame(gameStep)
  }
}

// 开始蓄力
const startCharging = () => {
  if (player.value.isJumping) return
  
  isCharging.value = true
  chargePower.value = 0
  chargeInterval.value = window.setInterval(() => {
    chargePower.value = Math.min(chargePower.value + CHARGE_SPEED, MAX_POWER)
  }, 16)
}

// 跳跃
const jump = () => {
  if (!player.value.isJumping && isCharging.value) {
    const power = chargePower.value
    const angle = Math.PI / 4 // 45度角跳跃
    const velocity = power * 0.2 // 将蓄力转换为速度

    player.value.velocityX = Math.cos(angle) * velocity
    player.value.velocityY = -Math.sin(angle) * velocity
    player.value.isJumping = true
  }

  isCharging.value = false
  chargePower.value = 0
  if (chargeInterval.value) {
    clearInterval(chargeInterval.value)
    chargeInterval.value = null
  }
}

// 游戏结束
const gameOver = () => {
  isGameOver.value = true
  
  // 确保在游戏结束前清理所有状态
  if (chargeInterval.value) {
    clearInterval(chargeInterval.value)
    chargeInterval.value = null
  }
  
  if (gameLoop.value) {
    cancelAnimationFrame(gameLoop.value)
    gameLoop.value = null
  }

  isCharging.value = false
  chargePower.value = 0
  
  emit('game-over')
}

// 重置游戏
const resetGame = () => {
  isGameOver.value = false
  
  if (gameLoop.value) {
    cancelAnimationFrame(gameLoop.value)
    gameLoop.value = null
  }
  
  initGame()
  gameLoop.value = requestAnimationFrame(gameStep)
}

// 组件挂载
onMounted(() => {
  if (!gameCanvas.value) return
  ctx.value = gameCanvas.value.getContext('2d')
  if (!ctx.value) return

  resetGame()
})

// 组件卸载
onUnmounted(() => {
  if (gameLoop.value) {
    cancelAnimationFrame(gameLoop.value)
  }
  if (chargeInterval.value) {
    clearInterval(chargeInterval.value)
  }
})

defineExpose({
  startCharging,
  jump,
  resetGame
})
</script>

<style scoped lang="scss">
.game-container {
  position: relative;
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: #faf8ef;
  border-radius: 8px;
  overflow: hidden;
}

.game-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.power-bar-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.power-bar {
  height: 100%;
  background: #f65e3b;
  transition: width 0.016s linear;
}
</style> 