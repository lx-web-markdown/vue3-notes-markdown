import Vue from 'vue';
import Vuex from 'vuex';
import getDataFormLego from './getDataFormLego';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    getDataFormLego,
  },
});

export default store;
