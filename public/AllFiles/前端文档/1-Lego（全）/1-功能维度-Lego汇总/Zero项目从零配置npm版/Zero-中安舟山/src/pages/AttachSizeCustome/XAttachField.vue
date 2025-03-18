<script>
import { FieldBox } from '@qycloud/lego';

export default {
  name: 'ssxx',
  extends: FieldBox,
  methods: {
    /**
         * @param {Object} fieldChangeParams
         * @param {Array} fieldChangeParams.files 附件信息
         * @param {Array} fieldChangeParams.fieldId 字段id
         * @param {String} fieldChangeParams.type 字段类型
         * @param {Function} fieldChangeParams.defaultMethods 当出现多个附件字段的时候，判断是否是需要定制的附件字段，如果是走定制逻辑，如果不是请执行该平台默认行为
         * @param {Function} fieldChangeParams.next 对上传文件进行自定义验证通过后需执行的方法
         * @param {Function} fieldChangeParams.errNext 对上传文件进行自定义验证不通过后需执行的方法
        */
    beforeChange(fieldChangeParams) {
      const {
        files, fieldId, type, defaultMethods, next, errNext,
      } = fieldChangeParams;
      console.log(files, fieldId, type, defaultMethods, next, errNext);
    },
  },
};
</script>
