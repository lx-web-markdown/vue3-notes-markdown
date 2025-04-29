<template>
  <div class="snake-game" ref="gameContainer" tabindex="0">
    <canvas ref="gameCanvas" class="game-canvas"></canvas>
    <div v-if="isPaused" class="pause-overlay">
      <div class="pause-content">
        <h2>游戏暂停</h2>
        <p>按空格键继续</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'score-change', score: number): void;
  (e: 'game-over'): void;
}>();

// 游戏配置
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const GRID_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED = 150;
const FOOD_COLOR = '#e74c3c';
const SNAKE_COLOR = '#2ecc71';
const SNAKE_HEAD_COLOR = '#27ae60';

// 游戏状态
const gameContainer = ref<HTMLDivElement | null>(null);
const gameCanvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const gameLoop = ref<NodeJS.Timeout | null>(null);
const isPaused = ref(false);
const score = ref(0);
const direction = ref<'up' | 'down' | 'left' | 'right'>('right');
const nextDirection = ref<'up' | 'down' | 'left' | 'right'>('right');
const isGameOver = ref(false);

// 蛇的身体部分，每个部分包含 x, y 坐标
interface SnakePart {
  x: number;
  y: number;
}

const snake = ref<SnakePart[]>([]);
const food = ref<SnakePart>({ x: 0, y: 0 });

// 初始化游戏
const initGame = () => {
  if (!gameCanvas.value || !ctx.value) return;

  // 设置画布大小
  gameCanvas.value.width = CANVAS_WIDTH;
  gameCanvas.value.height = CANVAS_HEIGHT;

  // 初始化蛇的位置
  const startX = Math.floor(CANVAS_WIDTH / GRID_SIZE / 4) * GRID_SIZE;
  const startY = Math.floor(CANVAS_HEIGHT / GRID_SIZE / 2) * GRID_SIZE;
  snake.value = [];
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.value.push({ x: startX - i * GRID_SIZE, y: startY });
  }

  // 生成第一个食物
  generateFood();

  // 重置游戏状态
  score.value = 0;
  direction.value = 'right';
  nextDirection.value = 'right';
  isPaused.value = false;
  isGameOver.value = false;
  emit('score-change', score.value);

  // 开始游戏循环
  if (gameLoop.value) {
    clearTimeout(gameLoop.value);
  }
  gameStep();
};

// 生成食物
const generateFood = () => {
  const gridWidth = CANVAS_WIDTH / GRID_SIZE;
  const gridHeight = CANVAS_HEIGHT / GRID_SIZE;

  let newFood: SnakePart;
  do {
    newFood = {
      x: Math.floor(Math.random() * gridWidth) * GRID_SIZE,
      y: Math.floor(Math.random() * gridHeight) * GRID_SIZE,
    };
  } while (snake.value.some(part => part.x === newFood.x && part.y === newFood.y));

  food.value = newFood;
};

// 检查碰撞
const checkCollision = (head: SnakePart): boolean => {
  // 检查是否撞墙
  if (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT) {
    return true;
  }

  // 检查是否撞到自己
  return snake.value.slice(1).some(part => part.x === head.x && part.y === head.y);
};

// 移动蛇
const moveSnake = () => {
  // 更新方向
  direction.value = nextDirection.value;

  // 计算新的头部位置
  const head = { ...snake.value[0] };
  switch (direction.value) {
    case 'up':
      head.y -= GRID_SIZE;
      break;
    case 'down':
      head.y += GRID_SIZE;
      break;
    case 'left':
      head.x -= GRID_SIZE;
      break;
    case 'right':
      head.x += GRID_SIZE;
      break;
  }

  // 检查碰撞
  if (checkCollision(head)) {
    gameOver();
    return;
  }

  // 添加新的头部
  snake.value.unshift(head);

  // 检查是否吃到食物
  if (head.x === food.value.x && head.y === food.value.y) {
    score.value += 10;
    emit('score-change', score.value);
    generateFood();
  } else {
    // 如果没有吃到食物，移除尾部
    snake.value.pop();
  }
};

// 游戏步骤
const gameStep = () => {
  if (isGameOver.value) return;

  if (!isPaused.value) {
    moveSnake();
    render();
  }
  gameLoop.value = setTimeout(() => {
    if (!isPaused.value && !isGameOver.value) {
      requestAnimationFrame(gameStep);
    }
  }, GAME_SPEED);
};

// 渲染游戏画面
const render = () => {
  if (!ctx.value || !gameCanvas.value) return;

  // 清空画布
  ctx.value.fillStyle = '#faf8ef';
  ctx.value.fillRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  // 绘制食物
  ctx.value.fillStyle = FOOD_COLOR;
  ctx.value.fillRect(food.value.x, food.value.y, GRID_SIZE - 2, GRID_SIZE - 2);

  // 绘制蛇
  snake.value.forEach((part, index) => {
    ctx.value!.fillStyle = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
    ctx.value!.fillRect(part.x, part.y, GRID_SIZE - 2, GRID_SIZE - 2);
  });
};

// 游戏结束
const gameOver = () => {
  isGameOver.value = true;
  if (gameLoop.value) {
    clearTimeout(gameLoop.value);
    gameLoop.value = null;
  }
  emit('game-over');
};

// 处理键盘输入
const handleKeydown = (event: KeyboardEvent) => {
  if (!gameContainer.value?.contains(document.activeElement) || isGameOver.value) return;

  // 阻止方向键的默认滚动行为
  if (event.key.startsWith('Arrow')) {
    event.preventDefault();
  }

  switch (event.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      if (direction.value !== 'down') {
        nextDirection.value = 'up';
      }
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      if (direction.value !== 'up') {
        nextDirection.value = 'down';
      }
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      if (direction.value !== 'right') {
        nextDirection.value = 'left';
      }
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      if (direction.value !== 'left') {
        nextDirection.value = 'right';
      }
      break;
    case ' ':
      event.preventDefault();
      if (!isGameOver.value) {
        isPaused.value = !isPaused.value;
        if (!isPaused.value && !gameLoop.value) {
          gameStep();
        }
      }
      break;
  }
};

// 重置游戏
const resetGame = () => {
  initGame();
};

// 组件挂载
onMounted(() => {
  if (!gameCanvas.value) return;
  ctx.value = gameCanvas.value.getContext('2d');
  if (!ctx.value) return;

  gameContainer.value?.focus();
  initGame();

  window.addEventListener('keydown', handleKeydown);
});

// 组件卸载
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (gameLoop.value) {
    clearTimeout(gameLoop.value);
  }
});

defineExpose({
  resetGame,
});
</script>

<style scoped lang="scss">
.snake-game {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  outline: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-canvas {
  background-color: #faf8ef;
  border-radius: 8px;
}

.pause-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .pause-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;

    h2 {
      color: #776e65;
      margin-bottom: 1rem;
    }

    p {
      color: #776e65;
    }
  }
}
</style>
