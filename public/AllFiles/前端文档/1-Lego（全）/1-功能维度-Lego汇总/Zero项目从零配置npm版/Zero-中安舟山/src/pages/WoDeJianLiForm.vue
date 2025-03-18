<template>
  <form-page
    :spaceId="spaceId"
    :module="module"
    :app="app"
    :form="form"
    :disableCrumb="true"
    :disableNav="true"
    @on-init="handleOnInit"
    @form-action="onFormAction"
/>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  props: ['id', 'spaceId'],
  components: {
    FormPage,
  },
  data() {
    return {
      module: 'information',
      app: 'XiangMuXinXi',
      form: this.id,
    };
  },
  methods: {
    handleOnInit(ctx) {
      console.log('ctx', ctx);
    },
    onFormAction(ctx, {
      action, formData, validate, next,
    }) {
      console.log('---', ctx, {
        action, formData, validate, next,
      });
    },
  },
};
</script>
