
<script>
import { FieldBox } from '@qycloud/lego';
import CustomeString from './CustomeString.vue';

export default {
  name: 'SlaveLineEdit',
  extends: FieldBox,
  components: {
    CustomeString,
  },
  methods: {
    renderFieldComponent() {
      if (this.id === 'xianshiziduan' && this.property.editable) {
        return CustomeString;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
