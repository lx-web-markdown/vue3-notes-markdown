<template>
  <div class="game-container">
    <div class="game-header">
      <div class="scores">
        <div class="score">分数: {{ score }}</div>
        <div class="best-score">最高分: {{ bestScore }}</div>
      </div>
      <button class="new-game-button" @click="startNewGame">新游戏</button>
    </div>

    <div class="game-board">
      <div class="grid-container">
        <div v-for="row in 4" :key="'row-' + row" class="grid-row">
          <div v-for="col in 4" :key="'cell-' + row + '-' + col" class="grid-cell"></div>
        </div>
      </div>
      <div class="tile-container">
        <div
          v-for="tile in tiles"
          :key="tile.id"
          class="tile"
          :class="[`tile-${tile.value}`, { 'tile-new': tile.isNew, 'tile-merged': tile.isMerged }]"
          :style="getTileStyle(tile)"
        >
          {{ tile.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const score = ref(0);
const bestScore = ref(parseInt(localStorage.getItem('2048-best-score') || '0'));
const tiles = ref<Tile[]>([]);
let nextTileId = 0;

// 初始化游戏
const startNewGame = () => {
  tiles.value = [];
  score.value = 0;
  addNewTile();
  addNewTile();
};

// 生成新的数字块
const addNewTile = () => {
  const emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!tiles.value.some(tile => tile.row === row && tile.col === col)) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    tiles.value.push({
      id: nextTileId++,
      value,
      row,
      col,
      isNew: true,
    });
  }
};

// 计算 tile 的样式
const getTileStyle = (tile: Tile) => {
  const gap = 15; // 网格间隔为 15px
  const position = {
    transform: `translate(
      calc(${tile.col} * (100% + ${gap}px)),
      calc(${tile.row} * (100% + ${gap}px))
    )`,
  };
  return position;
};

// 移动数字块
const moveTiles = (direction: 'up' | 'down' | 'left' | 'right') => {
  const oldTiles = JSON.stringify(tiles.value);
  let newTiles: Tile[] = [];
  const mergedPositions = new Set(); // 记录已经合并的位置

  // 定义方向向量
  const vectors = {
    up: { row: -1, col: 0 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
  };

  // 根据方向获取遍历顺序
  const getTraversalOrder = () => {
    const positions = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        positions.push({ row, col });
      }
    }

    // 确保正确的合并顺序
    if (direction === 'right') positions.reverse();
    if (direction === 'down') positions.sort((a, b) => b.row - a.row);

    return positions;
  };

  // 获取给定位置的下一个位置和可能的目标方块
  const getNextPosition = (row: number, col: number) => {
    const vector = vectors[direction];
    let currentRow = row;
    let currentCol = col;
    let nextRow = row + vector.row;
    let nextCol = col + vector.col;
    let foundTile = null;

    // 找到最远的空位置或第一个遇到的方块
    while (nextRow >= 0 && nextRow < 4 && nextCol >= 0 && nextCol < 4) {
      const targetTile = tiles.value.find(t => t.row === nextRow && t.col === nextCol);
      if (targetTile) {
        foundTile = targetTile;
        break;
      }
      currentRow = nextRow;
      currentCol = nextCol;
      nextRow += vector.row;
      nextCol += vector.col;
    }

    return {
      farthestRow: currentRow,
      farthestCol: currentCol,
      nextTile: foundTile,
    };
  };

  // 执行移动
  const positions = getTraversalOrder();
  positions.forEach(pos => {
    const tile = tiles.value.find(t => t.row === pos.row && t.col === pos.col);
    if (!tile) return;

    const { farthestRow, farthestCol, nextTile } = getNextPosition(tile.row, tile.col);

    // 生成位置键，用于检查是否已合并
    const currentPosKey = `${farthestRow},${farthestCol}`;
    const nextPosKey = nextTile ? `${nextTile.row},${nextTile.col}` : null;

    if (nextTile && nextTile.value === tile.value && !mergedPositions.has(nextPosKey)) {
      // 合并相同数值的块
      mergedPositions.add(nextPosKey);
      newTiles.push({
        id: nextTileId++,
        value: tile.value * 2,
        row: nextTile.row,
        col: nextTile.col,
        isMerged: true,
      });
      score.value += tile.value * 2;
    } else {
      // 移动到最远位置
      newTiles.push({
        ...tile,
        row: farthestRow,
        col: farthestCol,
        isMerged: false,
        isNew: false,
      });
    }
  });

  // 更新游戏状态
  tiles.value = newTiles;

  // 如果有变化，添加新的数字块
  if (JSON.stringify(tiles.value) !== oldTiles) {
    addNewTile();
  }

  // 检查游戏是否结束
  if (checkGameOver()) {
    setTimeout(() => {
      alert(`游戏结束！最终得分：${score.value}`);
    }, 300);
  }
};

// 检查游戏是否结束
const checkGameOver = () => {
  // 检查是否还有空格
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!tiles.value.some(tile => tile.row === row && tile.col === col)) {
        return false;
      }
    }
  }

  // 检查是否还能合并
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const currentTile = tiles.value.find(tile => tile.row === row && tile.col === col);
      if (currentTile) {
        const adjacentPositions = [
          { row: row - 1, col },
          { row: row + 1, col },
          { row, col: col - 1 },
          { row, col: col + 1 },
        ];

        for (const pos of adjacentPositions) {
          const adjacentTile = tiles.value.find(
            tile => tile.row === pos.row && tile.col === pos.col
          );
          if (adjacentTile && adjacentTile.value === currentTile.value) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

// 监听最高分变化
watch(score, (newScore: number) => {
  if (newScore > bestScore.value) {
    bestScore.value = newScore;
    localStorage.setItem('2048-best-score', newScore.toString());
  }
});

onMounted(() => {
  startNewGame();
});

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      moveTiles('up');
      break;
    case 'ArrowDown':
      moveTiles('down');
      break;
    case 'ArrowLeft':
      moveTiles('left');
      break;
    case 'ArrowRight':
      moveTiles('right');
      break;
  }
};

// 暴露 handleKeydown 方法给父组件
defineExpose({
  handleKeydown
});
</script>

<style scoped lang="scss">
.game-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.scores {
  display: flex;
  gap: 20px;
}

.score,
.best-score {
  background: #bbada0;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
}

.new-game-button {
  background: #8f7a66;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #7f6a56;
  }
}

.game-board {
  background: #bbada0;
  border-radius: 6px;
  padding: 15px;
  position: relative;
  outline: none;
}

.grid-container {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.grid-cell {
  background: rgba(238, 228, 218, 0.35);
  aspect-ratio: 1;
  border-radius: 3px;
}

.tile-container {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  z-index: 1;
}

.tile {
  position: absolute;
  width: calc((100% - 45px) / 4);
  height: calc((100% - 45px) / 4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 3px;
  transition: all 0.15s ease-in-out;

  &.tile-new {
    animation: tile-appear 0.2s ease-in-out;
  }

  &.tile-merged {
    animation: tile-merge 0.2s ease-in-out;
  }
}

@keyframes tile-appear {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes tile-merge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// 不同数值的颜色
.tile-2 {
  background: #eee4da;
}
.tile-4 {
  background: #ede0c8;
}
.tile-8 {
  background: #f2b179;
  color: white;
}
.tile-16 {
  background: #f59563;
  color: white;
}
.tile-32 {
  background: #f67c5f;
  color: white;
}
.tile-64 {
  background: #f65e3b;
  color: white;
}
.tile-128 {
  background: #edcf72;
  color: white;
}
.tile-256 {
  background: #edcc61;
  color: white;
}
.tile-512 {
  background: #edc850;
  color: white;
}
.tile-1024 {
  background: #edc53f;
  color: white;
}
.tile-2048 {
  background: #edc22e;
  color: white;
}
</style>
