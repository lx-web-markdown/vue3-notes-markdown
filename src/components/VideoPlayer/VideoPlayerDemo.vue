<template>
  <div class="video-section">
    <h2>视频播放器示例</h2>

    <!-- 按钮触发在线视频播放 -->
    <div class="demo-block">
      <h3>在线视频</h3>
      <button class="play-button" @click="openOnlineVideo">播放在线视频</button>
      <!-- <VideoPlayerOverlay ref="onlineVideoRef" src="http://vjs.zencdn.net/v/oceans.mp4" /> -->
      <VideoPlayerOverlay
        ref="onlineVideoRef"
        :video-info="{
          // 'https://gitee.com/xishanlin/assets-repo/raw/master/family-party/2021/9001.mp4',
          // 'http://vjs.zencdn.net/v/oceans.mp4',
          // '/video/BV1GWojYDEo3/?share_source=copy_web&vd_source=04fb61a4554e1825b30291198c2e11ab',
          videoSrc: 'http://vjs.zencdn.net/v/oceans.mp4',
          author: '',
          title: '',
          duration: 0,
          isLocal: false,
        }"
      />
    </div>

    <!-- 按钮触发在线视频播放 -->
    <div class="demo-block">
      <h3>项目public目录下的视频</h3>
      <button class="play-button" @click="openLocalVideo_public">播放视频</button>
      <!-- <VideoPlayerOverlay ref="localVideoRef_public" src="/AllFiles/所有文件类型/1692945402485.mp4" /> -->
      <VideoPlayerOverlay
        ref="localVideoRef_public"
        :video-info="{
          videoSrc: '/AllFiles/所有文件类型/1692945402485.mp4',
          author: '',
          title: '',
          duration: 0,
          isLocal: false,
        }"
      />
    </div>

    <!-- 本地视频示例 -->
    <div class="demo-block">
      <h3>本地视频</h3>
      <div class="file-upload">
        <input type="file" accept="video/*" @change="handleFileUpload" id="file-upload" />
        <label for="file-upload" class="upload-label">选择视频文件</label>
      </div>
      <button class="play-button" @click="openLocalVideo" :disabled="!localVideoUrl">
        播放本地视频
      </button>
      <!-- <VideoPlayerOverlay v-if="localVideoUrl" ref="localVideoRef" :src="localVideoUrl" /> -->
      <VideoPlayerOverlay
        v-if="localVideoUrl"
        ref="localVideoRef"
        :visible="true"
        :video-info="{ videoSrc: localVideoUrl, author: '', title: '', duration: 0, isLocal: true }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import VideoPlayerOverlay from './VideoPlayerOverlay.vue';

const onlineVideoRef = ref<InstanceType<typeof VideoPlayerOverlay> | null>(null);
const localVideoRef_public = ref<InstanceType<typeof VideoPlayerOverlay> | null>(null);
const localVideoRef = ref<InstanceType<typeof VideoPlayerOverlay> | null>(null);
const localVideoUrl = ref('');

// 打开在线视频
const openOnlineVideo = () => {
  onlineVideoRef.value?.openVideo();
};

// 打开本地视频
const openLocalVideo = () => {
  localVideoRef.value?.openVideo();
};

// 打开本地视频
const openLocalVideo_public = () => {
  localVideoRef_public.value?.openVideo();
};

const handleFileUpload = (event: any) => {
  const file = event.target.files?.[0];
  console.log('handleFileUpload', event, file);
  if (file) {
    console.log('handleFileUpload', localVideoUrl.value);
    // 如果已有本地视频 URL，先释放它
    if (localVideoUrl.value && localVideoUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(localVideoUrl.value);
    }

    // 创建新的 Blob URL
    localVideoUrl.value = URL.createObjectURL(file);
    console.log('handleFileUpload', localVideoUrl.value);
  }
};

// 组件卸载时清理资源
onUnmounted(() => {
  if (localVideoUrl.value && localVideoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(localVideoUrl.value);
  }
});
</script>

<style scoped lang="scss">
.video-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-block {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

h3 {
  color: #555;
  margin-bottom: 15px;
}

.play-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.play-button:hover {
  background-color: #45a049;
}

.play-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.file-upload {
  margin-bottom: 15px;
}

#file-upload {
  display: none;
}

.upload-label {
  display: inline-block;
  padding: 8px 12px;
  background-color: #2196f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-label:hover {
  background-color: #0b7dda;
}
</style>
