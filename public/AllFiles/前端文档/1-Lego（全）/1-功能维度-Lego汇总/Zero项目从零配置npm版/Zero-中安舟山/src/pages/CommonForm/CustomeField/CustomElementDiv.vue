<script>
import { FieldBox } from '@qycloud/lego';
import CustomeCoordinateDivComponent from './CustomeCoordinateDivComponent.vue';

export default {
  name: 'MyName',
  extends: FieldBox,
  components: { CustomeCoordinateDivComponent },
  methods: {
    renderFieldComponent() {
      if (this.id === 'zifuchuan05') {
        return CustomeCoordinateDivComponent;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
