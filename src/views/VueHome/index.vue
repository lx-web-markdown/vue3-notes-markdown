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
    <el-header class="fixed-header">
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

.home-container {
  width: 100%;
  height: 100%;

  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--bg-tertiary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .home-container-main {
    background-color: #FFF;
    margin-top: var(--lx-header-height);
  }
}
</style>
