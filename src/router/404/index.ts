const routers = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/OtherView/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

export default routers;
