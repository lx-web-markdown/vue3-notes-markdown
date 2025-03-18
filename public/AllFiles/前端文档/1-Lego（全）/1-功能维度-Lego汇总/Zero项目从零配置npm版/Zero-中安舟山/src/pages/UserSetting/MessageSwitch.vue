<template>
    <div class="userinfo">
        <message-switch />
    </div>
</template>

<script>
import { MessageSwitch } from '@qycloud/lego';

export default {
  name: 'user-switch',
  data() {
    return {

    };
  },
  components: {
    MessageSwitch,
  },
};
</script>
