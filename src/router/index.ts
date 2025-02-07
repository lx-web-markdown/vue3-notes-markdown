import { createRouter, createWebHistory } from "vue-router";
// 各子模块的路由
import Router404 from './404/index.ts';
// 路由配置
const allRouters = [
  // 重定向
  {
    path: "/index",
    redirect: "/",
  },
  {
    path: "/",
    redirect: "/notelist/vue3",
  },
  {
    path: "/notelist",
    redirect: "/notelist/vue3",
    component: () => import("@/views/VueHome/index.vue"),
    children: [
      {
        path: "html",
        name: "HTMLHome",
        component: () => import("@/views/VueHome/MKMainView/index.vue"),
      },
      {
        path: "css",
        name: "CSSHome",
        component: () => import("@/views/VueHome/MKMainView/index.vue"),
      },
      {
        path: "js",
        name: "JSHome",
        component: () => import("@/views/VueHome/MKMainView/index.vue"),
      },
      {
        path: "vue2",
        name: "Vue2Home",
        component: () => import("@/views/VueHome/MKMainView/index.vue"),
      },
      {
        path: "vue3",
        name: "Vue3Home",
        component: () => import("@/views/VueHome/MKMainView/index.vue"),
      },
    ],
  },
  {
    path: "/java-home",
    name: "JavaHome",
    component: () => import("@/views/JavaHome/index.vue")
  },
  // ******************* 404 ********************
  ...Router404,
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
  console.log("router from: ", from);
  console.log("router to: ", to);
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
