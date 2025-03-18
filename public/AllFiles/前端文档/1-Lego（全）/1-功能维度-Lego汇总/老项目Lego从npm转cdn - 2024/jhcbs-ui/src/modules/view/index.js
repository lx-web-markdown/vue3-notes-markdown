import './public-path';
import Vue from 'vue';
import main from './components/PluginView.vue';

class AppPluginModule {
  /**
   * @param {HTMLElement} element 容器元素
   * @param {Object} header 数据
   * @param {Object} header.params 页面地址中的参数
   * @param {String} header.params.module form类型；information：数据流，workflow：工作流；数据流、工作流必需
   * @param {String} header.params.appId 应用Id；数据流、工作流必需
   * @param {String} header.params.spaceId 当前form id；数据流、工作流必需
   */
  constructor(element, header = {}) {
    this.instance = new Vue({
      el: element,
      data() {
        return {
        };
      },
      render: h => h(main, { props: header.params, ref: 'PublicView' }),
    });
  }

  get element() {
    return this.instance.$el;
  }

  static mount(element, header) {
    return new AppPluginModule(element, header);
  }
  
  active() {
    this.instance.$children[0].$refs.CustomeViewPage.$children[0].$store.commit('deactiveView', true);
    this.instance.$children[0].$refs.CustomeViewPage.$children[0].$store.commit('refreshData');
  }

  deactive() {
    this.instance.$children[0].$refs.CustomeViewPage.$children[0].$store.commit('deactiveView', false);
  }

  destroy() {
    this.instance.$destroy();
    this.instance = null;
  }
}

export function mount(element, header) {
  return AppPluginModule.mount(element, header);
}

export function unmount() {

}
