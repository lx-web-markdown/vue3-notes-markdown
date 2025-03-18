import Vue from 'vue';
import '@qpaas/vue-plugin-global';
import VueRouter from 'vue-router';
import { destroyAllDialogs } from '@qycloud/lego';
import MethodsPlugin from './uitls/index';
import './install';
import { patchGlobalConfig } from './services';

import home from './page/home/home.vue';

const { globalConfig } = window;

Vue.use(VueRouter);
Vue.use(MethodsPlugin);
const router = new VueRouter({
  mode: 'history',
  base: globalConfig.router.base,
  routes: [
    {
      path: '/',
      name: 'appView',
      props: true,
      component: home,
    },
    {
      path: '/chengbaoshangzhangha', name: 'chengbaoshangzhangha', component: () => import('./page/view/chengbaoshangzhangha.vue'),
      // meta: {
      //   keepAlive: true
      // },
    },
    {
      path: '/chengbaoshangzhanghaform', name: 'chengbaoshangzhanghaform', component: () => import('./page/from/chengbaoshangzhangha/chengbaoshangzhanghaform.vue'),
      // meta: {
      //   keepAlive: false
      // },
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  console.log(to, 'to.router');
  destroyAllDialogs();
  if (to.matched.some(route => route.meta.requiresAuth === false)) {
    next();
  } else {
    const status = await patchGlobalConfig();
    const isToLoginPage = to.name === 'login';
    if (status === 401) {
      if (isToLoginPage) {
        next();
      } else {
        next('/login');
      }
    } else if (isToLoginPage) {
      next('/');
    } else {
      next();
    }
  }
});


export default router;
