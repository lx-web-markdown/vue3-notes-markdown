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
    redirect: "/vue-home",
  },
  {
    path: "/",
    component: () => import("@/views/VueHome/index.vue"),
    children: [
      {
        path: "/vue-home",
        name: "vueHome",
        component: () => import("@/views/VueHome/RightView/index.vue"),
      },
      // {
      //   path: "/vue3-home",
      //   name: "vue3Home",
      //   component: () => import("@/views/Vue3Home/Section1-Demos/index.vue"),
      //   children: [
      //     {
      //       path: "/index",
      //       name: "md",
      //       component: () => import("@/views/Section1-Demos/MarkdownView/MarkdownComp111.vue"),
      //     },
      //   ]
      // },
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
