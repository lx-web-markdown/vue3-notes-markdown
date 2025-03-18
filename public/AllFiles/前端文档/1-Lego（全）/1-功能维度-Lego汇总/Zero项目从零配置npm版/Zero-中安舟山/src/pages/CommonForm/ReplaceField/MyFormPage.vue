<script>
import Vue from 'vue';
import { FormPage, ComponentxPlugin } from '@qycloud/lego';
import XFieldBox from './XFieldBox.vue';

Vue.use(ComponentxPlugin);

export default {
  name: 'MyFormPage',
  extends: FormPage,
  xComponents: {
    'field-field-box': XFieldBox,
  },
};
</script>
