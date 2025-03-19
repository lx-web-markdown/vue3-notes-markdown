# 音频播放器组件

一个Vue3+TypeScript实现的浮层音频播放器组件，支持播放本地和远程MP3文件。

## 功能特点

- 透明浮层设计，不影响原有页面内容
- 支持播放/暂停/停止控制
- 进度条拖拽控制播放进度
- 音量控制和静音功能
- 最小化/展开视图切换
- 支持本地和远程音频文件播放
- 美观的UI界面，支持暗色主题

## 组件结构

```
AudioPlayer/
  ├── composables/         # 可组合函数目录
  │   └── useAudioPlayer.ts # 音频播放逻辑
  ├── types.ts             # 类型定义
  ├── style.scss           # 样式文件
  ├── AudioPlayerOverlay.vue # 主组件
  ├── AudioPlayerDemo.vue  # 示例组件
  ├── index.ts             # 导出文件
  └── README.md            # 说明文档
```

## 如何使用

### 1. 全局注册播放器组件

在App.vue中注册播放器组件：

```vue
<template>
  <router-view />
  
  <!-- 音频播放器浮层 -->
  <AudioPlayerOverlay 
    :visible="playerVisible" 
    :audio-info="currentAudio"
    :settings="playerSettings"
    @close="handlePlayerClose"
    @status-change="handleStatusChange"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AudioPlayerOverlay, audioService } from '@/components/AudioPlayer';
import type { PlayerSettings } from '@/components/AudioPlayer';

// 播放器设置
const playerSettings: PlayerSettings = {
  autoplay: true,
  volume: 0.6,
  showVolumeControl: true,
  loop: false
};

// 获取音频服务中的状态
const currentAudio = computed(() => audioService.getCurrentAudio().value);
const playerVisible = computed(() => audioService.getPlayerVisible().value);

// 处理播放器关闭事件
const handlePlayerClose = () => {
  audioService.closePlayer();
};

// 处理播放状态变化事件
const handleStatusChange = (status: string) => {
  console.log('播放状态变化:', status);
};
</script>
```

### 2. 在任意组件中触发音频播放

```typescript
import { audioService } from '@/components/AudioPlayer';

// 处理音频文件点击
const handleMp3Click = (filePath: string) => {
  audioService.handleMp3Click(filePath);
};

// 或者直接播放指定音频
const playAudio = () => {
  audioService.playAudio(
    'https://example.com/audio.mp3',  // 音频URL
    '音频标题',                       // 可选
    '艺术家'                         // 可选
  );
};
```

### 3. 处理文件点击

在处理文件点击时，可以检测是否为MP3文件，并交给audioService处理：

```typescript
const handleFileClick = (file: { path: string, type: string }) => {
  if (file.type === '.mp3' || file.path.endsWith('.mp3')) {
    audioService.handleMp3Click(file.path);
  } else {
    // 处理其他类型文件
  }
};
```

## 属性和事件

### AudioPlayerOverlay 组件属性

| 属性名 | 类型 | 描述 |
|-------|------|------|
| visible | boolean | 是否显示播放器 |
| audioInfo | AudioInfo \| null | 音频信息 |
| settings | PlayerSettings | 播放器设置 |

### AudioPlayerOverlay 组件事件

| 事件名 | 参数 | 描述 |
|-------|------|------|
| close | - | 播放器关闭时触发 |
| statusChange | status: string | 播放状态变化时触发 |

### audioService 方法

| 方法名 | 参数 | 描述 |
|-------|------|------|
| playAudio | src: string, title?: string, artist?: string | 播放指定音频 |
| handleMp3Click | filePath: string | 处理MP3文件点击 |
| closePlayer | - | 关闭播放器 |
| getCurrentAudio | - | 获取当前音频信息 |
| getPlayerVisible | - | 获取播放器可见性 | 