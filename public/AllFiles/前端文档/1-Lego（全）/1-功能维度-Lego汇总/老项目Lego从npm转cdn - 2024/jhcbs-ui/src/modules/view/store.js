import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const State = {
  count: 0,
};
const getters = {
  count(state) {
    return state.count;
  },
};
const mutations = {
  addCount(state) {
    state.count += 1;
  },
};

const store = new Vuex.Store({
  state: State,
  getters,
  mutations,
  action: {},
});

export default store;
