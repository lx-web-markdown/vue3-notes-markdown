<script setup lang="ts">
import HeaderView from "@/views/VueHome/HeaderView/index.vue";
import LeftView from "@/views/VueHome/LeftView/index.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <HeaderView />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 左侧菜单 -->
          <LeftView />
        </el-aside>
        <el-main>
          <!-- 主体 -->
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
