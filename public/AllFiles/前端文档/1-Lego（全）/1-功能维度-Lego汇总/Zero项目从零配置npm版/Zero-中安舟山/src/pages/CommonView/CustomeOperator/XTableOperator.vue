<script>
import Vue from 'vue';
import { ViewTableOperator } from '@qycloud/lego';
import Vuex, { mapState } from 'vuex';

Vue.use(Vuex);


export default {
  name: 'xxxx',
  extends: ViewTableOperator,
  computed: {
    ...mapState([
      'label', // 当前标签id的信息
    ]),
    showMore() {
      return this.actions.length > 3; // this.actions为所有可选项， showMore 为是否显示更多按钮
    },

    outerOpt() {
      return this.showMore ? this.actions.slice(0, 2) : this.actions;
    },

    innerOpt() {
      return this.showMore ? this.actions.slice(2, this.actions.length) : [];
    },
  },
};
</script>
