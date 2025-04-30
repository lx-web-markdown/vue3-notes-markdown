import path from 'path';
import type { RouteRecordRaw } from 'vue-router';

const gameRouters: RouteRecordRaw[] = [
  {
    path: '/game',
    name: 'GameIndex',
    component: () => import('@/views/Game/GameIndex.vue'),
  },
  {
    path: '/game/2048',
    name: 'Game2048',
    component: () => import('@/views/Game/2048/index.vue'),
    meta: {
      title: '2048游戏',
      keepAlive: true
    }
  },
  {
    path: '/game/sudoku',
    name: 'Sudoku',
    component: () => import('@/views/Game/Sudoku/index.vue'),
  },
  {
    path: '/game/memory-card',
    name: 'MemoryCard',
    component: () => import('@/views/Game/MemoryCard/index.vue'),
  },
  {
    path: '/game/jump',
    name: 'Jump',
    component: () => import('@/views/Game/Jump/index.vue'),
  },
  {
    path: '/game/popstar',
    name: 'PopStar',
    component: () => import('@/views/Game/PopStar/index.vue'),
  },
  {
    path: '/game/snake',
    name: 'Snake',
    component: () => import('@/views/Game/Snake/index.vue'),
  },
  {
    path: '/game/tetris',
    name: 'Tetris',
    component: () => import('@/views/Game/Tetris/index.vue'),
  },
  {
    path: '/game/english-typing',
    name: 'EnglishTyping',
    component: () => import('@/views/Game/EnglishTyping/index.vue'),
    meta: {
      title: '英文打字游戏',
      keepAlive: true
    }
  },
  {
    path: '/game/english-spelling',
    name: 'EnglishSpelling',
    component: () => import('@/views/Game/EnglishSpelling/index.vue'),
    meta: {
      title: '英文打字游戏',
      keepAlive: true
    }
  },
  {
    path: '/game/gobang',
    name: 'GoBang',
    component: () => import('@/views/Game/GoBang/index.vue'),
    meta: {
      title: '五子棋对战',
      keepAlive: true
    }
  },
  {
    path: '/game/chinese-chess',
    name: 'ChineseChess',
    component: () => import('@/views/Game/ChineseChess/index.vue'),
    meta: {
      title: '中国象棋',
      keepAlive: true
    }
  }
];

export default gameRouters;