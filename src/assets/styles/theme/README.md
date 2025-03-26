# 主题系统使用指南

本项目使用CSS变量实现了一套灵活的主题系统，支持亮色/暗色模式的无缝切换。以下是如何在项目中正确使用主题的指导。

## 核心原则

1. **永远使用变量，避免硬编码颜色值**
2. **所有组件都应响应主题切换**
3. **使用提供的mixins来简化开发**

## CSS变量使用

直接在CSS/SCSS中使用定义好的变量：

```scss
.my-component {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
}
```

## 主要变量分类

| 类别 | 变量示例 | 用途 |
|------|----------|------|
| 背景色 | `--bg-primary`, `--bg-secondary`, `--bg-tertiary` | 用于各级UI元素的背景 |
| 文字色 | `--text-primary`, `--text-secondary`, `--text-tertiary` | 用于文本、标签等 |
| 边框色 | `--border-color`, `--divider-color` | 用于边框、分隔线等 |
| 主题色 | `--primary-color`, `--primary-color-hover` | 品牌色、强调色 |
| 功能色 | `--danger-color`, `--success-color`, `--warning-color` | 表示不同状态和提示 |
| 阴影 | `--shadow-sm`, `--shadow-md`, `--shadow-lg` | 添加立体感和层次 |

## 使用SCSS Mixins

项目提供了一系列有用的mixins来简化主题样式开发：

```scss
// 引入mixins
@use '@/assets/styles/mixins';

.my-card {
  // 使用卡片mixin
  @include mixins.card-style;
}

.my-button {
  // 使用按钮mixin
  @include mixins.primary-button;
}

.custom-element {
  // 使用主题切换mixin
  @include mixins.theme-switch(background-color, #f5f5f5, #333);
}
```

## 自定义组件开发建议

1. **组件内样式**

```vue
<style lang="scss" scoped>
.component {
  color: var(--text-primary);
  background-color: var(--bg-primary);
  
  .title {
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .content {
    border-top: 1px solid var(--divider-color);
  }
}
</style>
```

2. **暗色模式特殊处理**

对于特殊需要暗色模式单独处理的情况：

```scss
.special-component {
  background-image: url('/light-image.png');
  
  html.dark & {
    background-image: url('/dark-image.png');
  }
}
```

## Element Plus 主题适配

Element Plus的组件已经在`theme.scss`中进行了暗色模式适配。如果需要添加更多Element组件的适配，请在`theme.scss`文件底部的暗黑模式适配区域添加。

## 主题切换测试

开发新组件时，请务必在亮色和暗色模式下都进行测试，确保在切换主题时视觉效果正常。

## 辅助工具

- 主题切换器组件: `ThemeSwitcher.vue`
- 主题存储: `themeStore.ts`

使用这些工具可以方便地实现和测试主题切换功能。 