<template>
  <form-page
    :module="module"
    :app="app"
    :spaceId="spaceId"
    :form="id"
    :edit="edit"
    :disableNav="disableNav"
    :disableCrumb="disableCrumb"
  />
</template>

<script>

import { FormPage } from '@qycloud/lego';

export default {
  props: ['spaceId', 'id'],
  components: {
    FormPage,
  },
  data() {
    return {
      disableNav: false,
      disableCrumb: true,
      app: 'ZhuCongBiao',
      module: 'information',
      form: '278886',
      node: '',
      edit: '0',
    };
  },
  methods: {

  },
};
</script>
