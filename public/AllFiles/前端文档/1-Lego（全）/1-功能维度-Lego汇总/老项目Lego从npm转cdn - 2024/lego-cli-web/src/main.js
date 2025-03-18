import Vue from 'vue';
import '@qycloud/lego/dist/lego.css';
import 'babel-polyfill';
import Element from 'element-ui';
import _ from 'lodash';
import vuescroll from 'vuescroll';
// import AYPlugin from './plugins/AYPlugin';
// import AYPlugin from './plugins/AYPlugin';
// import HttpPlugin from './plugins/HttpPlugin';
import store from './store';
import router from './router';
// import './install';
// import MethodsPlugin from './plugins/MethodsPlugin';
import './assets/styles/index.scss';
import './styles/index.scss';
import 'vuescroll/dist/vuescroll.css';

console.log('main.js');
// import './assets/fonts/iconfont.css';
// Vue.use(AYPlugin);
// Vue.use(MethodsPlugin);
// 引入vuescroll样式
Vue.use(vuescroll); // 使用

Vue.prototype._ = _;
// Vue.use(AYPlugin);
// Vue.use(HttpPlugin);
Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  template: '<router-view></router-view>',
}).$mount('#app');
