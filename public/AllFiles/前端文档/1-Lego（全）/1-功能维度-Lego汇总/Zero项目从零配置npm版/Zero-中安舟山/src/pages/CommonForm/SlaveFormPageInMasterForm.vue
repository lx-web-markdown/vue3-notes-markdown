<script>
import { FormPage, DesignerSlaveFormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  data() {
    return {
      addNumber: 0, // 字段控制增加从表条数
    };
  },
  render(h) {
    return h(FormPage, {
      props: {
        app: 'GeZhongZiDuanZhuCong',
        module: 'information',
        form: '3',
        node: '',
        edit: '0',
        spaceId: 'preCeShiQiYe',
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
  methods: {
    /**
     * @param {Object} ctx
     * @param {String} table 表 id
     * @param {String} field 字段 id
     * @param {any} value 字段值
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
        slaveTableId: 'gezhongziduancongbia', // 从表id
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
            title: '自定义top',
            buttonType: 'custom', // 加前缀 editable- 表示在可编辑状态下显示  readable- 表示在查看状态下显示 不加前缀则一直显示
            type: 'primary',
            size: '',
            style: {},
            callback: ({ service, button, ctxInfo }) => {
              console.log(service, button, ctxInfo, '===>>>');
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
            buttonType: 'custom', // 加前缀 editable- 表示在可编辑状态下显示  readable- 表示在查看状态下显示 不加前缀则一直显示
            type: 'primary',
            size: '',
            style: {},
            callback: ({ service, button, ctxInfo }) => {
              console.log(service, button, ctxInfo, '===>>>');
            },
          },
        ],
      };
    },
  },
};
</script>
