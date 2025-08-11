import { createRouter, createWebHistory } from 'vue-router';
// 各子模块的路由
import Router404 from './404/index.ts';
import DemoRouter from './demo-router/index.ts';
import ToolsRouter from './tools-router/index.ts';
import NotelistRouter from './notelist-router/index.ts';
import InterviewRouter from './interview-router/index.ts';
import GameRouters from './game-router/index.ts';
import path from 'path';

// 路由配置
const allRouters = [
  // 重定向
  {
    path: '/index',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/layouts/Home.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/modules/Home/RouterMainView/RouterMainView.vue'),
      },
      {
        path: '/css',
        component: () => import("@/views/modules/Home/CSSMainView/index.vue")
      }
    ],
  },
  {
    path: '/java-home',
    name: 'JavaHome',
    component: () => import('@/views/modules/JavaHome/index.vue'),
  },
  ...Router404,
  ...DemoRouter,
  ...ToolsRouter,
  ...NotelistRouter,
  ...InterviewRouter,
  ...GameRouters,
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...allRouters],
});

/**
 * 全局路由守卫，路由跳转前的拦截
 */
router.beforeEach((to, from, next) => {
  console.log('router from: ', from);
  console.log('router to: ', to);
  next();
  /**
  // 登录校验
  if (to.name !== "login" && !localStorage.getItem("token")) {
    next({
      name: "login",
    });
  } else {
    next();
  }
    */
});

export default router;
