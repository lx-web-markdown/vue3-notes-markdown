<template>
  <div class="common-form">
    <form-page
      :module="this.$route.query.module"
      :app="this.$route.query.app"
      :extendParams="extendParams"
      @field-value-changed="onFieldValueChanged"
      @on-init="handleOnInit"
    />
  </div>
</template>

<script>
import { FormPage } from '@qycloud/lego';

export default {
  name: 'CommonForm',
  computed: {
    extendParams() {
      return {
        appCall: this.$route.query.appCall,
      };
    },
  },
  components: {
    FormPage,
  },
  created() {
    console.log(this.$route, '=>>>>>');
  },
  methods: {
    /**
     * @param {Object} ctx
     * @param {String} table 表 id
     * @param {String} field 字段 id
     * @param {any} value 字段值
     * ctx.getOneFieldValue(field)  获取主表详情中某个具体字段的值
     * ctx.setFieldProperty({table, field, property, value}) 改变主表详情中某个具体字段的属性
     * ctx.setFieldValue({table, field, value}) 设置主表详情中某个具体字段的值
     */
    onFieldValueChanged(ctx, { table, field, value }) {
      if (field === 'beizhu') {
        if (value === '绅士手') {
          ctx.setFieldProperty({
            table,
            field: 'bianhao',
            property: 'displayable',
            value: false,
          });
        } else {
          ctx.setFieldProperty({
            table,
            field: 'bianhao',
            property: 'displayable',
            value: true,
          });
        }
      }
    },
    /**
     * @param {Object} ctx 上下文
     * @param {String} type 初始化类型  'init': 首次进入form初始化 'edit': 点击编辑按钮重新加载后的初始化 'refreshNode': 点击提交进入下一步处理后表单重新加载的初始化
     * @param {String} nodeId 当 type 'refreshNode'时的下一步节点id
     * ctx.getOneFieldValue({ table, field })  获取主表详情中某个具体字段的值
     * ctx.setFieldProperty({field, property, value}) 改变主表详情中某个具体字段的属性
     * ctx.setFieldValue({table, field, value}) 设置主表详情中某个具体字段的值
     */
    handleOnInit(ctx) {
      const { table } = ctx.$store.state;
      const beizhu = ctx.getOneFieldValue({
        table,
        field: 'beizhu',
      });
      if (beizhu === '绅士手') {
        ctx.setFieldProperty({
          table,
          field: 'bianhao',
          property: 'displayable',
          value: false,
        });
      } else {
        ctx.setFieldProperty({
          table,
          field: 'bianhao',
          property: 'displayable',
          value: true,
        });
      }
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
