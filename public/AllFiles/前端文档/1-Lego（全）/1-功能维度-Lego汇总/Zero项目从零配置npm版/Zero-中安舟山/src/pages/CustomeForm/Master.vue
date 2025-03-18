<template>
  <div class="form-custome">
    <div class="form-custome-title">中化兴中石油转运（舟山）有限公司内部请示</div>
    <div class="form-custome-master">
      <div class="form-custome-content">
        <div class="form-custome-field" v-for="(field, index) in fieldList" :key="index">
          <div class="field-title">
            {{field.property.title || field.property.reName}}:
          </div>
          <field-box v-bind="field" @change="change"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FieldBox, FormMaster } from '@qycloud/lego';


export default {
  name: 'custome',
  extends: FormMaster,
  data() {
    return {};
  },
  created() {
    console.log(this.fields, 'fields');
  },
  computed: {
    fieldList() {
      return Object.keys(this.fields).map(key => this.fields[key]);
    },
  },
  components: {
    FieldBox,
  },
  methods: {

  },
};
</script>

<style lang="scss">
.form-custome {
  width: 100%;
  height: 100%;
  background-color: #fff;

  &-title {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 20px;
    color: red;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  &-master {
    margin: 0 auto;
    width: 80%;
    height: 100%;
  }

  &-field {
    display: flex;

    .field-title {
      margin-right: 20px;
    }
  }
}
</style>
