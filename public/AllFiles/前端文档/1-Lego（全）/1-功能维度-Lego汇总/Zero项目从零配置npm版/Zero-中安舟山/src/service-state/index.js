import Vue from 'vue';

export default class ZngcService {
  constructor(initState) {
    this.originState = initState;
    this._vm = new Vue({
      data: {
        $$state: this.buildDefaultState(),
      },
    });
    window.zngcStore = this;
  }

  buildDefaultState(extraState) {
    const initState = this.originState;
    return Object.assign(
      {
        cc: '',
        bb: '',
      },
      initState,
      extraState,
    );
  }

  get state() {
    // eslint-disable-next-line no-underscore-dangle
    return this._vm._data.$$state;
  }

  // 重置state
  resetState(extraState) {
    return this.buildDefaultState(extraState);
  }

  setA() {
    this.state.cc = 'ggg';
  }
}
