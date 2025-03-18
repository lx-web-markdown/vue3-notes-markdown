<template>
  <div v-if="property.editable">
    <el-input v-model="modelValue" @blur="validator(false, true)" />
  </div>
  <div v-else>{{value}}</div>
</template>

<script>
import { CustomeFieldMixin, singleFieldValidator } from '@qycloud/lego';


export default {
  name: 'ccc',
  mixins: [CustomeFieldMixin],
  data() {
    return {
      modelValue: this.value,
    };
  },
  methods: {
    validator(noRequired, isBlur) {
      return singleFieldValidator(noRequired, this, isBlur);
    },
  },
  watch: {
    modelValue(val) {
      this.validator(!!val);
      this.setCurrentValue(val);
    },
  },
};
</script>
