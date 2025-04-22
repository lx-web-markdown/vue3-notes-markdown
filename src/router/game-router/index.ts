import path from 'path';

const gameRouters = [
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
  }
];

export default gameRouters;