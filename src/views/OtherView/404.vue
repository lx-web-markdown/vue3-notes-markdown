<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>


<template>
  <div class="not-found">
    <div class="content">
      <h1 class="error-code">404</h1>
      <div class="error-message">
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面可能已被移动或不存在</p>
      </div>
      <button class="home-button" @click="goHome">
        返回首页
      </button>
    </div>
  </div>
</template>


<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  animation: bounce 2s ease infinite;
}

.error-message {
  margin: 30px 0;
}

.error-message h2 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.error-message p {
  font-size: 18px;
  color: #6c757d;
  margin: 0;
}

.home-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.home-button:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>