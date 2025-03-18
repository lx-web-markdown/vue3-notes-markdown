<script>
import { FieldBox } from '@qycloud/lego';
import CustomeFieldZiFuChuan from './CustomeFieldZiFuChuan.vue';
import CustomeFieldShuZi from './CustomeFieldShuZi.vue';

export default {
  name: 'field-components',
  extends: FieldBox,
  components: {
    CustomeFieldZiFuChuan,
    CustomeFieldShuZi,
  },
  methods: {
    renderFieldComponent() {
      // 主表字段
      if (this.id === 'zifuchuan') {
        return CustomeFieldZiFuChuan;
      }
      if (this.id === 'shuzi') {
        return CustomeFieldShuZi;
      }
      // 从表列表字段
      return null;
    },
  },

};
</script>
