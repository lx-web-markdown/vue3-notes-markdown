<template>
  <div class="userinfo">
    <user-info
      :hideList="hideList"
      :hideBasicInfo="hideBasicInfo"
      :hidePositionInfo="hidePositionInfo"
      :customLabel="customLabel"
      @step-validate="handleStepValidate"
    />
  </div>
</template>

<script>
import { UserInfo } from '@qycloud/lego';

export default {
  name: 'info',
  data() {
    return {
      // hideList: [
      //   'gender',
      //   'birthdayDate',
      //   'loginId',
      //   'phone',
      //   'email',
      //   'qq',
      //   'IDCard',
      //   'address',
      //   'personalSign',
      //   'personalDraw',
      //   'mainJob',
      //   'jobs',
      //   'leader',
      //   'ext',
      //   'workStart',
      //   'jobDesc',
      // ], // 需要隐藏的字段
      hideList: ['gender', 'birthdayDate', 'loginId', 'phone', 'email'],
      hideBasicInfo: false, // true:隐藏, false:显示  基本资料
      hidePositionInfo: true, // true:隐藏, false:显示 职位信息
      customLabel: '测试',
    };
  },
  methods: {
    handleStepValidate() {
      console.log('两步验证事件拦截');
    },
  },
  components: {
    UserInfo,
  },
};
</script>
