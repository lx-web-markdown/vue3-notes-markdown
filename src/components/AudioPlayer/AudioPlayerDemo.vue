<!--
  音频播放器示例组件
  
  展示如何点击MP3文件触发音频播放
-->
<script setup lang="ts">
import { ref } from 'vue';
import { audioService } from './index';

// 示例音频文件列表
const audioFiles = ref([
  {
    name: '远程示例 - 音频1.mp3',
    path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    isRemote: true
  },
  {
    name: '远程示例 - 音频2.mp3',
    path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    isRemote: true
  },
  {
    name: '远程示例 - 音频3.mp3',
    path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    isRemote: true
  },
  {
    name: '本地示例 - 周传雄黄昏.mp3',
    path: '周传雄黄昏.mp3',
    isRemote: false
  }
]);

// 处理音频文件点击
const handleAudioClick = (file: { path: string, name: string }) => {
  audioService.playAudio(file.path, file.name);
};
</script>

<template>
  <div class="audio-player-demo">
    <h2>音频播放器示例</h2>
    <p>点击下面的音频文件进行播放：</p>
    
    <ul class="audio-list">
      <li v-for="(file, index) in audioFiles" :key="index" class="audio-item">
        <button class="audio-button" @click="handleAudioClick(file)">
          <span class="audio-icon">🎵</span>
          <span class="audio-name">{{ file.name }}</span>
          <span class="audio-type">{{ file.isRemote ? '(远程)' : '(本地)' }}</span>
        </button>
      </li>
    </ul>
    
    <div class="demo-info">
      <h3>使用说明</h3>
      <p>1. 点击音频文件名称播放音频</p>
      <p>2. 使用播放器控制栏控制播放</p>
      <p>3. 可以最小化或关闭播放器</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.audio-player-demo {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: #333;
  }
  
  p {
    margin-bottom: 16px;
    color: #666;
  }
  
  .audio-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    
    .audio-item {
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
      
      .audio-button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px 16px;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: #f5f5f5;
        }
        
        .audio-icon {
          margin-right: 12px;
          font-size: 20px;
        }
        
        .audio-name {
          flex-grow: 1;
          font-weight: 500;
        }
        
        .audio-type {
          font-size: 0.8rem;
          color: #999;
          margin-left: 8px;
        }
      }
    }
  }
  
  .demo-info {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 16px;
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 12px;
      color: #333;
    }
    
    p {
      margin-bottom: 8px;
      font-size: 0.9rem;
    }
  }
}
</style> 