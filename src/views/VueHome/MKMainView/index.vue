<script setup lang="ts">
import LeftView from "./LeftView/index.vue";
import RightView from "./RightView/index.vue";
</script>

<template>
  <el-container class="home-container">
    <el-container class="home-container-main">
      <el-aside class="left-aside">
        <LeftView />
      </el-aside>
      <el-main class="right-main">
        <RightView />
      </el-main>
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
    .left-aside {
      width: 250px;
      height: var(--lx-main-container-height);
      background-color: red;
    }

    .right-main {
      background-color: lightcyan;
    }
  }
}
</style>
