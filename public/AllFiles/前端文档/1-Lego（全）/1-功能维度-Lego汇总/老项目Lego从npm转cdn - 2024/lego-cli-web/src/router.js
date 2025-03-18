import Vue from 'vue';
import VueRouter from 'vue-router';
import { GlobalPlugin } from '@qpaas/vue-plugin-global';
// import { destroyAllDialogs } from '@qycloud/lego';
import { openFormDialog } from '@qycloud/lego';
import PointEdit from '@/pages/sqty/point/edit.vue';
import PointShow from '@/pages/sqty/point/show.vue';
import projectManagement from '@/pages/sqty/projectManagement/app.vue';
import yirenyidang from '@/pages/sqty/yirenyidang/app.vue';
import workApplication from '@/pages/sqty/workApplication/app.vue';
import { patchGlobalConfig } from './services';
import {
  Calendar,
  CheckSpecial,
  HiddenBase,
  SafeShare,
  SpecialTask,
  Dashboard,
  NewCalendar,
} from './pages';

const { server: { www }, dev: { https } } = require('../config/server');

const { globalConfig } = window;

Vue.use(VueRouter);
Vue.use(GlobalPlugin);

Vue.prototype.openAppModule = (fromObj, fromId) => {
  console.log(fromObj, fromId);
  openFormDialog(
    {
      module: fromObj.module,
      app: fromObj.id,
      form: fromId,
    },
    {
      title: fromObj.title,
    },
  );
};

const router = new VueRouter({
  mode: 'history',
  base: globalConfig.router.base,
  routes: [
    {
      path: '/calendar',
      name: 'calendar',
      props: true, // route => route.query,
      component: Calendar,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/CheckSpecial', // 检查执行情况报表
      name: 'checkSpecial',
      props: true, // route => route.query,
      component: CheckSpecial,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/HiddenBase', // 隐患关闭率及超期率
      name: 'hiddenBase',
      props: true, // route => route.query,
      component: HiddenBase,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/SafeShare', // 安全经验分享报表
      name: 'safeShare',
      props: true, // route => route.query,
      component: SafeShare,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/SpecialTask', // 专项任务报表
      name: 'specialTask',
      props: true, // route => route.query,
      component: SpecialTask,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/Dashboard', // 上汽通用大屏
      name: 'dashboard',
      meta: {
        requiresAuth: false,
      },
      props: true, // route => route.query,
      component: Dashboard,
    },
    {
      path: '/newcalendar', // 上汽通用大屏
      name: 'Main',
      props: true, // route => route.query,
      component: NewCalendar,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/pointedit/:pointId', // 厂区图风险点编辑
      props: true, // route => route.query,
      component: PointEdit,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/pointshow/:pointId', // 厂区图风险点展示
      props: true, // route => route.query,
      component: PointShow,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/projectManagement',
      component: projectManagement,
      meta: {
        requiresAuth: true,
      },      
    },
    {
      path: '/yirenyidang',
      component: yirenyidang,
      meta: {
        requiresAuth: true,
      },      
    },
    {
      path: '/workApplication',
      component: workApplication,
      meta: {
        requiresAuth: true,
      },      
    },   
    {
      path: '/FormPage',
      name: 'MyFormPage',
      meta: {
        name: '详情页',
        requiresAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: (resolve) => require(['./pages/AppList/FormPage/FormMain.vue'], resolve),
    },
    {
      path: '/lego/:module/:appId',
      component: (resolve) => require(['./pages/FromComponents/Index.vue'], resolve),
      meta: {
        keepAlive: true, // 需要被缓存的组件
        requiresAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      // name: 'ViewList'
    },
    {
      path: '/trainLego', // 培训计划
      component: (resolve) => require(['./pages/trainLego/app.vue'], resolve),
      redirect: '/trainLego/list',
      children: [
          {
              path: 'list',
              name: 'trainList',
              // component: () => import('./pages/TrainLego/TrainList.vue'),
              component: (resolve) => require(['./pages/trainLego/trainList.vue'], resolve),
              meta: {
                requiresAuth: true,
              },
      
          },
          {
              path: 'detail',
              name: 'trainDetail',
              // component: () => import('./pages/TrainLego/TrainDetail.vue'),
              component: (resolve) => require(['./pages/trainLego/trainDetail.vue'], resolve),
              meta: {
                requiresAuth: true,
              },
      
          },
      ],
  },
  ],
});

const toWorkbench = () => {
  const NODE_ENV = process.env.NODE_ENV === 'production';
  const baseUrl = NODE_ENV ? window.location.origin : `${https ? 'https://' : 'http://'}${www}`;
  window.open(`${baseUrl}/user/workbench`, NODE_ENV ? '_self' : '_blank');
};

router.beforeEach(async (to, _, next) => {
  const { requiresAuth } = to.meta;
  if (!requiresAuth) next();
  else {
    const status = await patchGlobalConfig();
    if (status !== 200) toWorkbench();
    else next();
  }
});


window.routerInstance = router;

export default router;
