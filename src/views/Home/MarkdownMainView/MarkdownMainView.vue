<script setup lang="ts">
import { ref } from "vue";
import LeftView from "./LeftView/LeftView.vue";
import RightView from "./RightView/RightView.vue";

const leftWidth = ref(250); // 左侧初始宽度
const isResizing = ref(false);
const startX = ref(0); // 鼠标起始位置

const startResizing = (event: any) => {
  isResizing.value = true;
  // 记录初始x值
  startX.value = event.clientX;
  document.addEventListener("mousemove", onResizing);
  document.addEventListener("mouseup", stopResizing);
}

const onResizing = (event: any) => {
  if (isResizing.value) {
    const deltaX = event.clientX - startX.value;
    leftWidth.value = Math.max(200, leftWidth.value + deltaX); // 最小宽度为 200px
    startX.value = event.clientX; // 更新起点
  }
}

const stopResizing = () => {
  isResizing.value = false;
  document.removeEventListener("mousemove", onResizing);
  document.removeEventListener("mouseup", stopResizing);
}

</script>

<template>
  <el-container class="home-container">
    <el-container class="home-container-main">
      <el-aside class="left-aside" :style="{ width: leftWidth + 'px' }">
        <LeftView class="left-view" />
        <!-- 拖拽线 -->
        <div class="resizer" @mousedown="startResizing"></div>
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
      display: flex;
      height: var(--lx-main-container-height);
      background-color: transparent;

      .left-view {
        width: calc(100% - 3px);
      }

      .resizer {
        top: 0;
        right: 0;
        bottom: 0;
        width: 3px;
        background-color: #ccc;
        cursor: ew-resize;
      }
    }

    .right-main {
      background-color: lightcyan;
    }
  }
}
</style>
