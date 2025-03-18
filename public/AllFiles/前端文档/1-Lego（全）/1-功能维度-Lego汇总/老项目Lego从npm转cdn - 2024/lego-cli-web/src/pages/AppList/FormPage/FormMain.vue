<template>
  <component :is="componentName"
             v-bind="formProps" />
</template>

<script>
import Extends from '../Extends.vue';

export default {
  name: 'FormMain',
  components: {
    Extends,
  },

  computed: {
    formProps() {
      return {
        module: this.$route.query.module,
        app: this.$route.query.app,
        form: this.$route.query.form,
        isCopy: this.$route.query.isCopy,
        spaceId: this.$route.query.spaceId,
        label: this.$route.query.label,
        edit: this.$route.query.edit,
        node: this.$route.query.node,
        callBack: this.$route.query.callBack,
      };
    },
    componentName() {
      return Extends;
    },
  },

};
</script>
