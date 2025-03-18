<script>
import Vue from 'vue';
import { FormSlave, ComponentxPlugin } from '@qycloud/lego';
import MultiAddBtn from './MultiAddBtn.vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'xxx',
  extends: FormSlave,
  computed: {
    addButtons() {
      return [];
    },
  },
  xComponents: {
    SlaveMultiAddBtn: MultiAddBtn,
  },
};
</script>
