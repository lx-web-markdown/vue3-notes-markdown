<template>
    <div>关于字符串字段的定制</div>
</template>

<script>
import { CustomeFieldMixin } from '@qycloud/lego'; // 引入该文件后，可通过this获取字段的value，property，type

export default {
  name: 'ssxx',
  mixins: [CustomeFieldMixin],
};
</script>
