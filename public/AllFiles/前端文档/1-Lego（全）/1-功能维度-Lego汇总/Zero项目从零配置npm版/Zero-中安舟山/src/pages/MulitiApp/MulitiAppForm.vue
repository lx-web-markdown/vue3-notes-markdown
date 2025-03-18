<template>
  <div class="muliti-form">
    <form-page
      class="ZhuCongShuJuYuanBiao"
      ref="formPage1"
      :key="cacheKey + 1"
      :spaceId="spaceId"
      app="ZhuCongShuJuYuanBiao"
      module="information"
      form="2"
      label="436"
      :edit="edit"
      disableCrumb
      disableNav
      disableTopButton
      @field-value-changed="onFieldValueChanged"
    />
    <form-page
      class="ZhuCongShuJuYuanBiao"
      ref="formPage3"
      :key="cacheKey + 3"
      :spaceId="spaceId"
      app="ZhuCongShuJuYuanBiao"
      module="information"
      form="1"
      label="436"
      :edit="edit"
      disableCrumb
      disableNav
      disableTopButton
      @field-value-changed="onFieldValueChanged"
    />
    <div class="custome-bottom-action">
      <div class="buttons">
        <button class="btn cancel" @click="cancel('cancelDataflow')">取消</button>
        <button class="btn edit" @click="editCick" v-if="edit === '0'">编辑</button>
        <button class="btn submit" @click="submit('saveDataflow')" v-if="edit === '1'">保存</button>
        <!-- <button class="btn getfields" @click="getFieldsValue">获取字段值</button> -->
      </div>
    </div>
  </div>
</template>


<script>
import { FormPage } from '@qycloud/lego';
import { getSpaceIdByUri } from '@qycloud/cube';

export default {
  name: 'mulitiAppForm',
  data() {
    return {
      edit: '0',
      spaceId: '',
      cacheKey: null,
    };
  },

  components: {
    FormPage,
  },

  created() {
    this.spaceId = this.$route.params.spaceUri
      ? getSpaceIdByUri(this.$route.params.spaceUri)
      : '';
    console.log(this.spaceId, 'spaceId');
  },

  methods: {
    onFieldValueChanged(args) {
      console.log('field value changed:', args);
    },

    editCick() {
      this.edit = '1';
      this.cacheKey = new Date().getTime();
    },

    submit(buttonType) {
      this.validator(buttonType);
    },

    cancel(buttonType) {
      Promise.all([
        this.$refs.formPage1.formSave(buttonType),
        this.$refs.formPage3.formSave(buttonType),
      ]).then(() => {
        this.$router.back(-1);
        // this.cacheKey = new Date().getTime();
      });
    },

    validator(buttonType) {
      Promise.all([
        this.$refs.formPage1.formValidate(),
        this.$refs.formPage3.formValidate(),
      ]).then((results) => {
        console.log(results, 'results');
        const validatorResult = results.every(result => result);
        if (validatorResult) {
          this.formSave(buttonType);
        }
      });
    },

    formSave(buttonType) {
      Promise.all([
        this.$refs.formPage1.formSave(buttonType),
        this.$refs.formPage3.formSave(buttonType),
      ]).then(() => {
        this.edit = '0';
        this.cacheKey = new Date().getTime();
      });
    },

    // getFieldsValue() {
    //   this.$refs.formPage1.getFieldsValue();
    //   this.$refs.formPage2.getFieldsValue();
    //   this.$refs.formPage3.getFieldsValue();
    // },
  },
};
</script>

<style lang="scss">
.muliti-form {
  min-width: 900px;

  .custome-bottom-action {
    bottom: 0;
    width: 100%;
    height: 60px;
    text-align: center;

    .buttons {
      width: 100%;
      height: 60px;
      position: fixed;
      line-height: 60px;
      bottom: 0;
      min-width: 500px;
      background-color: #fff;
      border-top: 1px solid #ddd;
      z-index: 999;

      .btn {
        min-width: 80px;
        padding: 0 5px;
        height: 32px;
        border: 0;
        border-radius: 2px;
        color: #fff;
        background: #4680ff;
        line-height: 32px;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
