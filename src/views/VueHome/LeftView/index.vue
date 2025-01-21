<script setup lang="ts">

</script>

<template>
  <div class="left-sidebar">
    <el-scrollbar class="scrollbar-container">
      <!-- 回到顶部 -->
      <!-- <el-backtop target=".scrollbar-container" :right="50" :bottom="50" /> -->

      <div class="scrollbar-item" v-for="item in 100" :key="item">
        {{ item }}
      </div>
    </el-scrollbar>
  </div>
</template>


<style scoped lang="scss">
.left-sidebar {
  width: 100%;
  height: 100%;
  background-color: #FFF;

  .scrollbar-container {
    background-color: lightcyan;
    height: var(--lx-main-container-height);

    .scrollbar-item {
      height: 30px;
      width: 100%;
      border-bottom: 1px solid yellowgreen;
    }
  }
}
</style>