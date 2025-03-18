import Vue from 'vue';
// import '@qycloud/lego/dist/lego.css';

import router from './router';
import './plugins/font/iconfont.css';
import './plugins/font/iconfont.js';
import './styles/index.scss';

Vue.config.productionTip = false;
// document.cookie = 'PHPSESSID'+"="+'24eea80c-2ca5-4cc0-8db7-763724ad76a0'+"; path=/";
new Vue({
  router,
  // template: '<router-view></router-view>',
  // template: '<keep-alive ><router-view></router-view></keep-alive>',
  template: '<div><keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive><router-view v-if="!$route.meta.keepAlive"/></div>'
}).$mount('#app');
