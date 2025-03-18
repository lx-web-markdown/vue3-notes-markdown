import Vue from 'vue';
import '@qpaas/vue-plugin-global';
import storePlugin from './service-state/storePlugin';
import '@qycloud/lego/dist/lego.css';
import router from './router';

import './styles/index.scss';
import ZngcService from './service-state/index';

Vue.config.productionTip = false;
Vue.use(storePlugin);


new Vue({
  router,
  template: '<router-view></router-view>',
  created() {
    this.$ZngcStore = new ZngcService({ aa: 'init' });
  },
}).$mount('#app');
