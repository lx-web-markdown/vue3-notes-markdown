<template>
  <div v-if="isShow" class="AppList_Main">
    <my-app-list
      :module="module"
      :appId="appId"
      :labelId="labelId"
      spaceId="shangqitongyongqiche"
      :toggleLabelCallBack="toggleLabelCallBack"
    />
  </div>
</template>
<script>
// import Vue from 'vue';
import MyAppList from '../AppList/Main.vue';

// Vue.component('my-app-list', MyAppList);
export default {
  name: 'AppList',
  data() {
    return {
      showBack: true,
      isShow: false,
      showSideBar: false,
      showCrumbs: false,
      isCustomShowCrumb: 0,
      appId: this.$route.params.appId,
      module: this.$route.params.module,
      labelId: this.$route.query.module,
    };
  },
  components: {
    MyAppList,
  },
  activated() {
    this.isShow = true;
  },
  computed: {
    currentToken() {
      return `${this.spaceId}@${this.appId}`;
    },
  },
  created() {
    // console.log(this, '4444444444444444');
  },
  mounted() {
    this.isShow = true;
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    toggleLabelCallBack(labelId) {
      console.log(labelId, 'labelId');
    },
  },
};
</script>
<style lang="scss" scoped>
.AppList_Main {
  width: 100%;
  height: 100%;
  .backToMenu {
    width: 4vw;
    position: fixed;
    right: 50px;
    font-size: 1rem;
    top: 8.5vh;
  }
}
</style>
<style lang="scss">
// 面包屑样式
.AppList_Main {
  .view-crumbs .icon {
    margin: 0 0px 0 5px !important;
    color: #596b89;
    font-size: 15px !important;
  }
  .view-crumbs {
    :nth-child(3) {
      line-height: 22px !important;
    }
  }
}
</style>
