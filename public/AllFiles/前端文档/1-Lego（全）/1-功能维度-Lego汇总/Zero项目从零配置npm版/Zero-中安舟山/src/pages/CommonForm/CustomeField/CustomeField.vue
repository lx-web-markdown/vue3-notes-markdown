
<script>
import { FieldBox, DesignerFieldBox } from '@qycloud/lego';
import CustomeCoordinate from './CustomeCoordinate.vue';

export default {
  name: 'MyName',
  extends: DesignerFieldBox,
  components: {
    CustomeCoordinate,
  },
  methods: {
    renderFieldComponent() {
      console.log(this.id);
      if (this.id === 'wenben') {
        return CustomeCoordinate;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
