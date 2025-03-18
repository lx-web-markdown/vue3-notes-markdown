<template>
    <div class="userinfo">
        <user-security @modify-password-success="handleModifySuccess"/>
    </div>
</template>

<script>
import { UserSecurity } from '@qycloud/lego';

export default {
  name: 'security',
  data() {
    return {

    };
  },
  methods: {
    handleModifySuccess() {
      console.log('密码修改成功');
    },
  },
  components: {
    UserSecurity,
  },
};
</script>
