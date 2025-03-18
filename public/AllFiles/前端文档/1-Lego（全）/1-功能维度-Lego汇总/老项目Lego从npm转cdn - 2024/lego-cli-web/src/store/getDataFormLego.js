const getDataFormLego = {
  state: {
    dataArea: '',
    startTime: '',
    endTime: '',
  },
  mutations: {
    setDataArea(state, data) {
     state.dataArea = data;
    },

    setStartTime(state, time) {
      state.startTime = time;
    },
    setEndTime(state, time) {
      state.endTime = time;
    },
  },
  actions: {
  },
};

export default getDataFormLego;
