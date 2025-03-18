<script>
import { FormPage, DesignerSlaveFormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  components: {
    FormPage,
    DesignerSlaveFormPage,
  },
  render(h) {
    return h(FormPage, {
      props: {
        app: 'ZhuCongBiaoLiuCheng1',
        module: 'workflow',
        form: '635094',
        node: 'WorkNode_1',
        edit: '1',
        spaceId: 'preCeShiQiYe',
        addNumber: 0,
      },
      on: {
        'field-value-changed': this.onFieldValueChanged,
      },
      scopedSlots: {
        slave: store => (
          <DesignerSlaveFormPage
            {...{ props: this.params }}
            addNumber={this.addNumber}
            formDetail={store}
          />
        ),
      },
    });
  },
  data() {
    return {
      app: 'ZhuCongBiaoLiuCheng1',
      module: 'workflow',
      form: '635094',
      node: '',
      edit: '1',
      spaceId: 'preCeShiQiYe',
      addNumber: 0,
    };
  },
  methods: {
    /**
     * @param {Object} ctx
     * @param {String} table 表 id
     * @param {String} field 字段 id
     * @param {any} value 字段值
     * ctx.getOneFieldValue(field)  获取主表详情中某个具体字段的值
     * ctx.setFieldProperty({field, property, value}) 改变主表详情中某个具体字段的属性
     * ctx.setFieldValue({table, field, value}) 设置主表详情中某个具体字段的值
     */
    onFieldValueChanged(ctx, { table, field, value }) {
      if (field === 'shuzi') {
        this.addNumber = value;
      }
      console.log('field value changed:', ctx, table, field, value);
    },
  },
  computed: {
    params() {
      return {
        slaveTableId: 'zhucongbiaocongbiao', // 从表id
        designer: true, // 区分新老设计器
        addSort: 'bottom', // top
        firstShowAdd: true, // 初始化是否默认打开一个新的从表详情页
        // 从表全局按钮布局
        slaveTopStyle: {},
        // 从表单条记录顶部操作按钮布局
        slaveHeadStyle: {
          position: 'absolute',
          right: '20px',
        },
        // 从表单条记录底部操作按钮布局
        slaveBottomStyle: {},
        // 从表本身布局
        slaveBodyStyle: {
          paddTop: '40px',
        },
        // 从表全局操作按钮配置
        topButtons: [
          {
            title: '添加',
            buttonType: 'add',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
          {
            title: '自定义',
            buttonType: 'custom',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
        ],
        // 从表单条记录底部操作按钮配置
        bottomButtons: [
          // {
          //   title: '编辑',
          //   buttonType: 'edit',
          //   type: 'primary',
          //   size: '',
          //   style: {},
          //   callback: ({ service, button, next, ctxInfo }) => {
          //     next();
          //     console.log(service, button, next, ctxInfo, '===>>>');
          //   },
          // },
        ],
        // 从表单条记录顶部操作按钮配置
        headButtons: [
          {
            title: '编辑',
            buttonType: 'edit',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
          {
            title: '取消',
            buttonType: 'cancel',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
          {
            title: '保存',
            buttonType: 'save',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
          {
            title: '删除',
            buttonType: 'delete',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
          {
            title: '自定义',
            buttonType: 'custom',
            type: 'primary',
            size: '',
            style: {},
            callback: ({
              service, button, next, ctxInfo,
            }) => {
              next();
              console.log(service, button, next, ctxInfo, '===>>>');
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss">
.common-form {
  width: 100%;
  height: 100%;
}
</style>
