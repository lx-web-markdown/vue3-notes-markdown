const notelistRouter = [
  {
    path: '/notelist',
    redirect: '/notelist/work-doc',
    component: () => import('@/views/VueHome/index.vue'),
    children: [
      // NEED TO DO
      {
        path: 'book-how-to-write-high-quality-front-end-code',
        name: 'BookHowToWriteHighQualityFrontEndCodeHome',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'html',
        name: 'HTMLHome',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'css',
        name: 'CSSHome',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'js',
        name: 'JSHome',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'vue2',
        name: 'Vue2Home',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'vue3',
        name: 'Vue3Home',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
      {
        path: 'work-doc',
        component: () => import('@/views/VueHome/MarkdownMainView/MarkdownMainView.vue'),
      },
    ],
  },
];

export default notelistRouter;
