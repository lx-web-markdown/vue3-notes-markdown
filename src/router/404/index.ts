const routers = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/modules/404/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

export default routers;
