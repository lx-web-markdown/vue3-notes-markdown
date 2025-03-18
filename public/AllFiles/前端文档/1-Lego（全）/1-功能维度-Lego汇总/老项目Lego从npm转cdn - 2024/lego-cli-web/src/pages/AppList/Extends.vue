<script>
import BaseFormPage from './FormPage/BaseFormPage.vue';
import MyFieldBox from './MyFieldBox.vue';

export default {
  name: 'Extends',
  extends: BaseFormPage,
  xComponents: { 'field-field-box': MyFieldBox },
};
</script>
