<template>
    <div class="userinfo">
        <user-group />
    </div>
</template>

<script>
import { UserGroup } from '@qycloud/lego';

export default {
  name: 'group',
  data() {
    return {

    };
  },
  components: {
    UserGroup,
  },
};
</script>
