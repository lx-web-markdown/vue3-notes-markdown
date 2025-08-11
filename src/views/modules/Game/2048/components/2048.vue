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
  const cellSize = 'calc((100% - 45px) / 4)';
  const position = {
    top: `calc(${tile.row} * (${cellSize} + 15px))`,
    left: `calc(${tile.col} * (${cellSize} + 15px))`,
    width: cellSize,
    height: cellSize,
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
    if (direction === 'right') {
      positions.sort((a, b) => b.col - a.col);
    } else if (direction === 'down') {
      positions.sort((a, b) => b.row - a.row);
    }

    return positions;
  };

  // 检查位置是否在边界内
  const isWithinBounds = (row: number, col: number) => {
    return row >= 0 && row < 4 && col >= 0 && col < 4;
  };

  // 获取给定位置的最远可移动位置
  const getFarthestPosition = (row: number, col: number) => {
    let currentRow = row;
    let currentCol = col;
    const vector = vectors[direction];

    do {
      row = currentRow;
      col = currentCol;
      currentRow += vector.row;
      currentCol += vector.col;
    } while (
      isWithinBounds(currentRow, currentCol) &&
      !newTiles.some(t => t.row === currentRow && t.col === currentCol)
    );

    return { row, col };
  };

  // 执行移动
  const positions = getTraversalOrder();
  
  // 首先移动所有方块到最远位置
  positions.forEach(pos => {
    const tile = tiles.value.find(t => t.row === pos.row && t.col === pos.col);
    if (!tile) return;

    const { row: farthestRow, col: farthestCol } = getFarthestPosition(tile.row, tile.col);
    
    newTiles.push({
      ...tile,
      row: farthestRow,
      col: farthestCol,
      isMerged: false,
      isNew: false,
    });
  });

  // 然后处理合并
  const tilesToMerge: Tile[] = [];
  newTiles.forEach(tile => {
    const vector = vectors[direction];
    const nextRow = tile.row + vector.row;
    const nextCol = tile.col + vector.col;
    
    if (!isWithinBounds(nextRow, nextCol)) return;

    const nextTile = newTiles.find(t => t.row === nextRow && t.col === nextCol);
    if (nextTile && 
        nextTile.value === tile.value && 
        !tilesToMerge.includes(nextTile) && 
        !tilesToMerge.includes(tile)) {
      tilesToMerge.push(tile, nextTile);
    }
  });

  // 执行合并
  for (let i = 0; i < tilesToMerge.length; i += 2) {
    const tile1 = tilesToMerge[i];
    const tile2 = tilesToMerge[i + 1];
    
    newTiles = newTiles.filter(t => t !== tile1 && t !== tile2);
    newTiles.push({
      id: nextTileId++,
      value: tile1.value * 2,
      row: tile2.row,
      col: tile2.col,
      isMerged: true,
    });
    score.value += tile1.value * 2;
  }

  // 更新游戏状态
  tiles.value = newTiles;

  // 如果有变化，等待动画完成后添加新的数字块
  if (JSON.stringify(tiles.value) !== oldTiles) {
    setTimeout(() => {
      addNewTile();
    }, 250); // 等待移动(150ms)和合并(200ms)动画完成
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 3px;
  transition: top 0.15s ease-in-out, left 0.15s ease-in-out;

  &.tile-new {
    animation: tile-appear 0.2s ease-in-out;
  }

  &.tile-merged {
    animation: tile-merge 0.2s ease-in-out;
  }
}

@keyframes tile-appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
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
