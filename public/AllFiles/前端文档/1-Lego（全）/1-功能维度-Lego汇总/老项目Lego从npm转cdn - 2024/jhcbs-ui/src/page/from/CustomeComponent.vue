<template>
  <div class="imgbox">
    <img :src="'data:image/jpeg;base64,' + url" />
    <el-button type="primary" size="mini" @click="save">保存图片</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      base: 'data:image/jpeg;base64,',
      url: '',
      formParams: null,
      base64String:
        '',
    };
  },
  mounted() {
    console.log('datass1123');
  },
  created() {
    this.formParams = this.$dialog.params.form;
    this.url = this.formParams.url;

    console.log(this.formParams, 'this.formParams');

    // $http.get(`/sdkintelberth/qrcode/base64?id=${datass.form}`).then((res) => {
    //   if (res.status == 200) {
    //     this.base64String=res.data.result
    //   }
    // });
  },
  methods: {
    save() {
      const link = document.createElement('a');
      link.download = 'image.jpeg';
      link.href = `data:image/jpeg;base64,${this.formParams.url}`;
      link.click();
    },
  },
};
</script>

<style lang="scss">
.imgbox {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    height: 100%;
  }
}
</style>
