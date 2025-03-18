/* eslint-disable guard-for-in */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
<script>
import { AppView, FormPage } from '@qycloud/lego';

export default {
  name: 'my-app-list',
  extends: AppView,
  props: ['isMixed'],
  data() {
    return {
      id: '',
      form: '',
    };
  },
  mounted() {
    // console.log(this, 'this');
  },
  methods: {
    /*
    action: 按钮类型
    next: 下一步操作
    radioProps: 选择一条数据时候的参数
    multipleProps: 选择多条数据的时候的参数
    */
    onViewAction(actionParams) {
      const {
        action, next, radioProps, multipleProps, buttonName
      } = actionParams;
      console.log(
        actionParams,
        action,
        radioProps,
        multipleProps,
        'actionParams'
      );
      if (buttonName === '问题导出') {
          const checkedIds = [];
          multipleProps.forEach(i => {
              checkedIds.push(i.sourceData.data.shenqingrentianxieji.id);
          });
          window.open(`/safetyjapi/mwa/sot/export?ids=${checkedIds.join(',')}`);
      } else {
          next();
      }
    },
    // eslint-disable-next-line consistent-return
    onOpenForm(data) {
      const nodeId = this.module === 'workflow' ? data.node || 'WorkNode_1' : '';
      this.vms = [];
      this.id = data.id;
      this.$router.push({
        path: '/FormPage',
        query: {
          module: this.module,
          app: this.appId,
          form: data.instance_id
            ? data.instance_id
            : data.recordId
              ? data.recordId
              : data.id,
          isCopy: data.isCopy,
          node: nodeId,
          spaceId: 'shangqitongyongqiche',
          edit: data.edit ? '1' : '0',
          // label: this.label.selected,
          disableCrumb: true,
        },
      });
      // this.$store.commit('setDataArea', '33');
      // console.log(this, 'this.store');
    },
    getFormComponent() {
      return FormPage;
    },
    /* eslint-disable */
    afterFormAction(ctx, { buttonType, action, dialogData, next }) {
      next();
    },
    /* eslint-disable */
    onFormAction(ctx, { action, formData, validate, next }) {
      if (
        [
          'CANCEL',
          'DATAFLOW_CANCEL',
          'WORKFLOW_CANCEL',
          'SAVE_WORKFLOW',
        ].indexOf(action) > -1
      ) {
        next();
        return;
      }
      validate().then((result) => {
        if (result) {
          next();
        }
      });
    },
    onFormOperation(ctx, { action, next }) {
      next();
    },
    onInitCallBack(ctx) { },
    onFieldValueChange(ctx, { table, field, value }) {
      console.log(ctx, table, field, value, '9777777777777777777');
    },
    onFieldPropertyChange(ctx, { table, field, property, value }) { },
    onSlaveTablePropertyChange(ctx, { table, value }) { },
    onCrumbItemClick(options, ctx) { },
    onSlaveFormAction(ctx, { formData, validate, next }) {
      validate().then((result) => {
        if (result) {
          next();
        } else {
          console.log('平台验证不通过');
        }
      });
    },
    /* eslint-enable */
    refreshList() {
      setTimeout(() => {
        this.$store.commit('refreshData');
      }, 300);
    },
  },
  created() {
    // ceshi
    this.vms = [];
    this.$root.$on('slave', (vm) => {
      this.vms.push(vm);
    });
  },
};
</script>
<style lang="scss">
.print-custom-btn {
  border: 1px solid #d8dde4;
  background: #fff;
  color: #596b89;
  min-width: 80px;
  height: 32px;
  padding: 0 15px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  float: left;
  .iconfont.icon-dayin {
    font-size: 12px;
    font-weight: normal;
    margin-right: 5px;
  }
  &:hover {
    background: #4680ff;
    color: #fff;
  }
}
</style>
