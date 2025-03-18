<template>
    <div>
        <element-config
            :appId="appId"
            :version="version"
            :type="type"
            :page="page"
            :spaceId="spaceId"
            :edit="edit"
            :versionName="versionName"
            :saveBack="saveBack"
            :cancelBack="cancelBack"
        />
    </div>
</template>

<script>
import { ElementConfig } from '@qycloud/lego';

export default {
  name: 'ElementSetting',
  data() {
    return {
      appId: '',
      version: 0,
      type: 'workflow',
      page: 'mapLink',
      spaceId: '',
      edit: '',
      versionName: '',
    };
  },
  components: {
    ElementConfig,
  },
  methods: {
    saveBack() {
      this.$dialog.close();
    },
    cancelBack() {
      this.$dialog.close();
    },
  },
  created() {
    const {
      appId, spaceId, edit, versionName,
    } = this.$dialog.params.element;
    this.appId = appId;
    this.spaceId = spaceId;
    this.edit = edit;
    this.versionName = versionName;
  },
};
</script>
