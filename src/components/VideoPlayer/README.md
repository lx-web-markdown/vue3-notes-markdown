# Vue3 视频播放器组件

这是一个基于 Vue 3 和 TypeScript 开发的视频播放器组件，支持在线视频和本地视频的播放，并提供了漂亮的浮动窗口播放界面。

## 功能特点

- ✅ 支持在线视频播放
- ✅ 支持本地视频文件播放
- ✅ 响应式浮动窗口设计
- ✅ 优雅的打开/关闭动画效果
- ✅ 支持 TypeScript 类型定义
- ✅ 使用组合式 API 构建
- ✅ 使用 SCSS 进行样式管理
- ✅ 支持全屏播放

## 组件结构

```
VideoPlayer/
├── README.md                 # 本文档
├── VideoPlayerOverlay.vue    # 主视频播放器组件
├── VideoPlayerDemo.vue       # 示例展示组件
├── style.scss                # 组件样式
└── composables/
    └── useVideoPlayer.ts     # 视频播放器逻辑的组合式函数
```

## 使用方法

### 基本用法

1. 导入组件：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import VideoPlayerOverlay from '@/components/VideoPlayer/VideoPlayerOverlay.vue';

const videoRef = ref(null);
</script>
```

2. 在模板中使用：

```vue
<template>
  <!-- 播放在线视频 -->
  <button @click="videoRef.open()">播放视频</button>
  <VideoPlayerOverlay ref="videoRef" src="https://example.com/video.mp4" />
</template>
```

### 播放本地视频文件

```vue
<template>
  <div>
    <input type="file" accept="video/*" @change="handleFileUpload" />
    <button @click="playLocalVideo" :disabled="!localVideoUrl">播放本地视频</button>
    
    <VideoPlayerOverlay
      v-if="localVideoUrl"
      ref="localVideoRef"
      :src="localVideoUrl"
      :isLocalFile="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import VideoPlayerOverlay from '@/components/VideoPlayer/VideoPlayerOverlay.vue';

const localVideoRef = ref(null);
const localVideoUrl = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    // 清理之前的URL
    if (localVideoUrl.value && localVideoUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(localVideoUrl.value);
    }
    
    // 创建新的Blob URL
    localVideoUrl.value = URL.createObjectURL(file);
  }
};

const playLocalVideo = () => {
  localVideoRef.value?.open();
};

// 组件卸载时清理资源
onUnmounted(() => {
  if (localVideoUrl.value && localVideoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(localVideoUrl.value);
  }
});
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| src | string | - | 视频的URL或本地视频的blob URL |
| isLocalFile | boolean | false | 指定视频是否为本地文件 |

### 方法

| 方法名 | 参数 | 描述 |
|---|---|---|
| open | - | 打开视频播放窗口并开始播放 |
| close | - | 关闭视频播放窗口并停止播放 |
| toggle | - | 切换视频播放窗口的显示状态 |

## 示例

查看 `VideoPlayerDemo.vue` 文件获取完整的使用示例，包括：

1. 播放在线视频
2. 播放项目 public 目录下的视频
3. 上传并播放本地视频文件

## 样式定制

组件使用 SCSS 进行样式管理，在 `style.scss` 文件中定义了主要样式变量：

```scss
// 变量定义
$black: #000;
$white: white;
$overlay-bg: rgba(0, 0, 0, 0.6);
$overlay-bg-darker: rgba(0, 0, 0, 0.8);
$transition-speed: 0.3s;
$border-radius: 8px;
```

你可以通过修改这些变量来自定义组件的外观。

## 注意事项

1. 使用本地视频时，记得在组件卸载时清理 Blob URL，以避免内存泄漏。
2. 确保为组件提供正确的视频 URL。
3. 视频播放依赖于浏览器的 HTML5 视频支持。

## 兼容性

- 支持所有现代浏览器（Chrome, Firefox, Safari, Edge）
- 要求 Vue 3.0+
- 要求 TypeScript 4.0+ 