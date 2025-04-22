const gameRouters = [
  {
    path: '/game',
    name: 'GameIndex',
    component: () => import('@/views/Game/GameIndex.vue'),
  },
  {
    path: '/game/2048',
    name: 'Game2048',
    component: () => import('@/views/Game/2048/2048.vue'),
    meta: {
      title: '2048游戏',
      keepAlive: true
    }
  }
];

export default gameRouters;