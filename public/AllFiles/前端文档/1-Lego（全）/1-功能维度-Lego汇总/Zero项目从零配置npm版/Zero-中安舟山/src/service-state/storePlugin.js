export default function plugin(Vue) {
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.parent && options.parent.$ZngcStore) {
        this.$ZngcStore = options.parent.$ZngcStore;
      } else {
        this.$ZngcStore = this.$root.$ZngcStore;
      }
    },
    destroyed() {
      this.$ZngcStore = null;
    },
  });
}
