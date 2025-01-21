<script setup lang="ts">
import HeaderView from "@/views/VueHome/HeaderView/index.vue";
import LeftView from "@/views/VueHome/LeftView/index.vue";
//
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
console.log('Route Info =', route, router);

</script>

<template>
  <el-container class="home-container">
    <el-header>
      <HeaderView />
    </el-header>
    <el-container class="home-container-main">
      <el-aside class="left-aside">
        <LeftView />
      </el-aside>
      <el-main class="right-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>

</template>

<style lang="scss" scoped>
@import url('@/assets/styles/element-plus-styles/el-header-scoped.scss');
</style>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;

  .home-container-main {
    .left-aside {
      width: 250px;
      height: var(--lx-main-container-height);
      background-color: red;
    }

    .right-main {
      background-color: yellow;
    }
  }
}
</style>
