const MarkdownMainView = () => import('@/views/Home/MarkdownMainView/MarkdownMainView.vue');
import type { RouteLocationNormalized } from 'vue-router';

const notelistRouter = [
  {
    path: '/notelist',
    component: () => import('@/views/Home/Home.vue'),
    children: [
      {
        path: ':id',
        name: 'NoteListContent',
        component: MarkdownMainView,
        props: (route: RouteLocationNormalized) => ({
          id: route.params.id as string
        })
      }
    ],
  },
];

export default notelistRouter;
