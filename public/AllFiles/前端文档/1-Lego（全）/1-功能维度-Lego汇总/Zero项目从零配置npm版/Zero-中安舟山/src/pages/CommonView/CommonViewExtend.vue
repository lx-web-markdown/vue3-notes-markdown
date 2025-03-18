<script>
import { AppView } from '@qycloud/lego';

export default {
  data() {
    return {

    };
  },
  extends: AppView,
  methods: {
    handleGlobalBtn(param) {
      console.log(param, 'param');
      param.next();
    },

  },
};
</script>
