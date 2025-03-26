import { defineStore } from 'pinia'

// 主题模式枚举
export enum ThemeMode {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 当前主题模式
    themeMode: ThemeMode.SYSTEM,
    // 当前是否为暗黑模式
    isDarkMode: false,
    // 系统主题媒体查询
    mediaQueryList: null as MediaQueryList | null,
    // 系统主题变化监听器
    mediaQueryListener: null as ((event: MediaQueryListEvent) => void) | null,
  }),
  actions: {
    // 初始化主题
    initTheme() {
      // 从本地存储加载主题设置
      const savedThemeMode = localStorage.getItem('themeMode');
      if (savedThemeMode && Object.values(ThemeMode).includes(savedThemeMode as ThemeMode)) {
        this.themeMode = savedThemeMode as ThemeMode;
      }
      
      // 应用主题
      this.applyTheme();
      
      // 如果是系统主题，添加系统主题变化的监听器
      if (this.themeMode === ThemeMode.SYSTEM) {
        this.setupSystemThemeListener();
      }
    },
    
    // 设置主题模式
    setThemeMode(mode: ThemeMode) {
      this.themeMode = mode;
      localStorage.setItem('themeMode', mode);
      
      // 移除之前的系统主题监听器
      this.removeSystemThemeListener();
      
      // 如果是系统主题，添加系统主题变化的监听器
      if (mode === ThemeMode.SYSTEM) {
        this.setupSystemThemeListener();
      }
      
      // 应用主题
      this.applyTheme();
    },
    
    // 应用主题
    applyTheme() {
      if (this.themeMode === ThemeMode.DARK) {
        this.isDarkMode = true;
      } else if (this.themeMode === ThemeMode.LIGHT) {
        this.isDarkMode = false;
      } else {
        // 系统主题，检查系统偏好
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // 更新文档根元素类名
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    
    // 设置系统主题变化的监听器
    setupSystemThemeListener() {
      this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryListener = (event: MediaQueryListEvent) => {
        if (this.themeMode === ThemeMode.SYSTEM) {
          this.isDarkMode = event.matches;
          document.documentElement.classList.toggle('dark', this.isDarkMode);
        }
      };
      
      // 添加监听器
      if (this.mediaQueryList.addEventListener) {
        this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
      } else {
        // 兼容旧版浏览器
        this.mediaQueryList.addListener(this.mediaQueryListener);
      }
    },
    
    // 移除系统主题变化的监听器
    removeSystemThemeListener() {
      if (this.mediaQueryList && this.mediaQueryListener) {
        if (this.mediaQueryList.removeEventListener) {
          this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
        } else {
          // 兼容旧版浏览器
          this.mediaQueryList.removeListener(this.mediaQueryListener);
        }
      }
    }
  }
});