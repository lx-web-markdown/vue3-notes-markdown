<script setup lang="ts">
import HeaderView from "@/views/VueHome/HeaderView/index.vue";
//
// import { useRoute, useRouter } from 'vue-router'
// const route = useRoute()
// const router = useRouter()
// console.log('Route Info =', route, router);

</script>

<template>
  <el-container class="home-container">
    <el-header>
      <HeaderView />
    </el-header>
    <el-container class="home-container-main">
      <!-- 路由窗口 -->
      <router-view />
    </el-container>
  </el-container>

</template>

<style lang="scss" scoped>
@import url('@/assets/styles/element-plus-styles/el-header-scoped.scss');
@import url('@/assets/styles/element-plus-styles/el-main-scoped.scss');
</style>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;

  .home-container-main {
    background-color: #FFF;
  }
}
</style>
