
import { openFormDialog } from '@qycloud/lego';

export default class MethodsPlugin {
  static install(Vue) {
    /**
     * 子应用内部从表详情字段值改变回调
     * @param {Object} form 从表详情上下文
     * @param {String} form 表id
     * @param {String} field 字段id
     * @param {String} value 字段值
     */
    Vue.prototype.subAppSlaveFieldValueChanged = (ctx, form, field, value) => {
      console.log(ctx, form, field, value, 'ctx, form, field, value');
    };
    Vue.prototype.openAppModule = (fromObj, fromId) => {
      console.log(fromObj, fromId);
      openFormDialog(
        {
          module: fromObj.module,
          app: fromObj.id,
          form: fromId,
        },
        {
          title: fromObj.title,
        },
      );
    };
    Vue.prototype.subAppInitCallBack = (ctx) => {
      console.log(ctx, '全局方法');
      if (ctx.$store.state.app === 'ZhuCongBiaoZiYingYon') {
        ctx.$store.setFieldValue({
          table: 'zhucongbiaoziyingyon',
          field: 'shuzi',
          value: '33',
        });
      }
    };
    Vue.prototype.subappFieldValueChange = (ctx, table, field, value) => {
      console.log(ctx, '全局方法', table, field, value);
      // ctx.$store.state.app
      // ctx.$store.setFieldValue({
      //   table: 'zhucongbiaoziyingyon',
      //   field: 'shuzi',
      //   value: '33444',
      // });
    };
    // 子应用内部详情页内部按钮事件拦截
    Vue.prototype.subAppFormOperation = (actionParams) => {
      actionParams.next();
      console.log(actionParams, 'actionParams');
      // actionParams.next();
    };
    // 子应用底部按钮事件拦截
    Vue.prototype.subAppFormActionCallback = (actionParams) => {
      actionParams.next();
      console.log(actionParams, 'actionParams');
    };
    // 子应用面包屑点击事件回调
    Vue.prototype.subappCrumbItemClickCallback = (ctx, options) => {
      console.log(ctx, options, 'actionParams');
    };
    /**
     * 子应用内部按钮呼起弹窗内部按钮事件拦截
     * @param {String} operation view列表操作按钮类型
     * @param {String} action 弹窗内部按钮类型
     * @param {Object} dialogData 弹窗内部数据
     * @param {Function} next 操作数据接口默认行为
     */
    Vue.prototype.subAppFormBeforeDialogAction = (
      ctx,
      {
        operation, action, dialogData, next,
      },
    ) => {
      console.log(
        ctx,
        operation,
        action,
        dialogData,
        next,
        'operation, action, dialogData, next',
      );
    };
  }
}
