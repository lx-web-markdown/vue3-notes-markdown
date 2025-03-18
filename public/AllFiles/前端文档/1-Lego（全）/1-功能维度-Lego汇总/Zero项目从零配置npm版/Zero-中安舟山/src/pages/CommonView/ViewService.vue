<template>
  <GlobalBtn
    v-if="getgbtn"
    v-bind="baseinfo"
    @tool-btn-click="handleToolBtnClick"
  />
</template>
<script>
import { GlobalBtn, BaseOperate } from '@qycloud/lego';

import { ViewService } from '@qycloud/cube';

export default {
  data() {
    return {
      baseinfo: {},
      getgbtn: false,
      spaceId: 'preCeShiQiYe',
      module: 'information',
      appId: 'ZiYuanYingYongDF',
      versionId: 0,
    };
  },
  extends: BaseOperate,
  components: {
    GlobalBtn,
  },
  computed: {
    defaultParams() {
      return {
        condition: [],
        searchText: '',
      };
    },
  },
  created() {
    this.initGlobalBtn();
  },
  methods: {
    // 初始化lego组件
    async initGlobalBtn() {
      const service = new ViewService(this.spaceId, this.module, this.appId);
      const initservice = await service.init();
      this.baseinfo = {
        'spaceId': this.spaceId || 'preCeShiQiYe',
        'module': this.module,
        'appId': this.appId,
        'global-btn-name': 'lego-global-btn',
        'versionId': this.versionId || 0,
        'showSwitchButton': false,
        'currentLabel': {
          operations: initservice.expend.globalButton.filter(btn => ['EXPORT', 'IMPORT'].includes(btn.type)),
        },
      };
      Object.assign(this, initservice, this.baseinfo); // 扩展组件配置参数注入
      this.getgbtn = true;
    },

    // 传递lego页面存放的标签条件内容，用于全局按钮读取
    changeParmas() {
      this.ctxParams = {
        labelId: this.labelId || '13416',
        condition: this.condition || [],
      };
    },

    // 数据变动后的处理
    refreshView() {
      console.log('数据刷新');
    },

    // openform cb
    openFormCallback(ctx, data) {
      console.log(ctx, data, 'openForm');
    //   openFormDialog();
    },
  },
};
</script>
