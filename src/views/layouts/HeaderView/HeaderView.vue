<script lang="ts">
export default {
  name: 'HeaderView',
};
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// router
import { useRoute, useRouter } from 'vue-router';
// hooks
import useHooks from './hooks/useHooks';
// language
import useLanguage from '@/language/hooks/useLanguage';
// 引入主题切换组件
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher.vue';
import { Tools, Grid, Orange } from '@element-plus/icons-vue'

interface OriginInfo {
  id: string;
  name: string;
  desc: string;
  path: string;
  routerPath: string;
  fileListTxtPath: string;
}

const { handleDropdownCommand } = useHooks();
const { currentLocale } = useLanguage();

// router
const router = useRouter();
const menuItems = ref<OriginInfo[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/OriginInfo.json');
    const data = await response.json();
    menuItems.value = data.originInfo;
  } catch (error) {
    console.error('Failed to load menu items:', error);
  }
});

const currentLanguageName = ref('中文');
watch(currentLocale, (newValue: any) => {
  newValue === 'zh'
    ? (currentLanguageName.value = '中文')
    : (currentLanguageName.value = 'English');
});

const showLinks = () => {
  router.push('/demo');
};

const showTools = () => {
  router.push('/tools');
};

// NEED TO DO
const openMKViewr = (command: OriginInfo) => {
  router.push({
    name: 'NoteListContent',
    params: {
      id: command.id
    }
  });
};
</script>

<template>
  <div class="main-view">
    <div class="left-view">
      <img src="@/assets/images/common/favicon.jpeg" alt="" @click="router.push('/')" style="cursor: pointer;" />
      <div class="title">
        {{ $t('appTitle') }}
      </div>
    </div>
    <div class="right-view">
      <!-- 笔记 -->
      <el-dropdown class="el-dropdown-cls" @command="openMKViewr">
        <span class="el-dropdown-link">
          <!-- {{ $t('navi.books') }} -->
          更多文档
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="item in menuItems" 
              :key="item.id" 
              :command="item"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- DEMO -->
      <el-button @click="showLinks" :icon="Orange" link>DEMO</el-button>

      <!-- Game -->
      <el-button @click="router.push('/game')" :icon="Orange" link>Game</el-button>
      
      <!-- 工具集合 -->
      <el-button @click="showTools" :icon="Grid" link>工具集合</el-button>

      <!-- language -->
      <el-dropdown class="el-dropdown-cls" @command="handleDropdownCommand">
        <span class="el-dropdown-link">
          {{ currentLanguageName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 主题切换器 -->
      <ThemeSwitcher />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/element-plus-styles/el-button-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-dropdown-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-switch-scoped.scss';
</style>

<style scoped lang="scss">
:deep(.el-button) {
  margin-left: 0px;
}

.main-view {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--lx-header-height);
  background-color: var(--bg-tertiary);

  .left-view {
    display: flex;
    align-items: center;
    margin-left: 20px;

    img {
      height: 80%;
      aspect-ratio: 1 / 1;
      background-color: rebeccapurple;
      border-radius: 50%;
      margin-top: calc(var(--header-height) * 0.1);
    }

    .title {
      line-height: var(--header-height);
      margin-left: 15px;
      background-color: transparent;
    }
  }

  .right-view {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 15px;
    margin-right: 20px;

    .el-dropdown-cls {
      :hover {
        cursor: pointer;
      }

      .el-dropdown-link {
        color: #000;
        font-weight: 900;
      }
    }
  }
}
</style>
