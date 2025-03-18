export default class MethodsPlugin {
  static install(Vue) {
    Vue.prototype.openAppModule = (fromObj, fromId) => {
      // 在这里拦截事件
      console.log(fromObj, fromId);
    };
  }
}
