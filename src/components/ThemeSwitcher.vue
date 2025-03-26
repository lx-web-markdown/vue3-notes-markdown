<template>
  <div class="theme-switcher">
    <el-dropdown @command="handleThemeChange">
      <el-button type="primary" size="small">
        <el-icon v-if="store.themeMode === ThemeMode.SYSTEM"><Monitor /></el-icon>
        <el-icon v-else-if="store.themeMode === ThemeMode.LIGHT"><Sunny /></el-icon>
        <el-icon v-else><Moon /></el-icon>
        <span>{{ getThemeLabel }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="ThemeMode.SYSTEM" :class="{ active: store.themeMode === ThemeMode.SYSTEM }">
            <el-icon><Monitor /></el-icon> {{ $t('theme.system') }}
          </el-dropdown-item>
          <el-dropdown-item :command="ThemeMode.LIGHT" :class="{ active: store.themeMode === ThemeMode.LIGHT }">
            <el-icon><Sunny /></el-icon> {{ $t('theme.light') }}
          </el-dropdown-item>
          <el-dropdown-item :command="ThemeMode.DARK" :class="{ active: store.themeMode === ThemeMode.DARK }">
            <el-icon><Moon /></el-icon> {{ $t('theme.dark') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useThemeStore, ThemeMode } from '@/stores/themeStore';
import { Monitor, Sunny, Moon, ArrowDown } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useThemeStore();

// 初始化主题
onMounted(() => {
  store.initTheme();
});

// 获取当前主题模式显示文本
const getThemeLabel = computed(() => {
  switch (store.themeMode) {
    case ThemeMode.SYSTEM:
      return t('theme.system');
    case ThemeMode.LIGHT:
      return t('theme.light');
    case ThemeMode.DARK:
      return t('theme.dark');
    default:
      return '';
  }
});

// 处理主题切换
const handleThemeChange = (themeMode: ThemeMode) => {
  store.setThemeMode(themeMode);
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: inline-block;
  
  .el-dropdown {
    cursor: pointer;
  }
  
  .el-button {
    display: flex;
    align-items: center;
    
    .el-icon {
      margin-right: 4px;
    }
  }
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  
  .el-icon {
    margin-right: 8px;
  }
  
  &.active {
    color: var(--primary-color);
    font-weight: bold;
  }
}
</style> 