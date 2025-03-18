<script>
import { FieldBox } from '@qycloud/lego';
import ViewFieldBox from './ViewFieldBox.vue';

export default {
  name: 'aaa',
  extends: FieldBox,
  methods: {
    renderFieldComponent() {
      if (this.id === 'zifuchuan') {
        return ViewFieldBox;
      }
      return null;
    },
  },
};
</script>
