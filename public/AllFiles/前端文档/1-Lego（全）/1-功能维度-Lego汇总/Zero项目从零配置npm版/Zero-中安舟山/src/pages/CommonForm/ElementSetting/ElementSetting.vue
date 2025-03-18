<template>
    <div>
        <element-config
            :appId="appId"
            :version="version"
            :type="type"
            :page="page"
            :spaceId="spaceId"
            :edit="edit"
            :instanceId="instanceId"
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
      instanceId: '',
    };
  },
  components: {
    ElementConfig,
  },
  created() {
    const {
      appId, version, spaceId, edit, instanceId,
    } = this.$dialog.params.element;
    this.appId = appId;
    this.version = version || 0;
    this.spaceId = spaceId;
    this.edit = edit;
    this.instanceId = instanceId || '';
  },
};
</script>
