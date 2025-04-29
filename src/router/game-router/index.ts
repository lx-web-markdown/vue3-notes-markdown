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
  }
];

export default gameRouters;