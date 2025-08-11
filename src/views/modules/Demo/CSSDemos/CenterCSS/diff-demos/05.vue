<template>
  <div class="page-container">
    <!-- 使用工具类 -->
    <div class="center-section">
      <h1>居中布局工具类示例</h1>
      <p>使用SCSS mixin实现的可复用居中样式</p>
    </div>
    
    <!-- 卡片网格 -->
    <div class="card-grid">
      <div 
        v-for="card in cards" 
        :key="card.id" 
        class="card"
        @click="handleCardClick(card.id)"
      >
        <h3>{{ card.title }}</h3>
        <p>{{ card.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Card {
  id: number
  title: string
  content: string
}

const cards = ref<Card[]>([
  { id: 1, title: 'Flexbox居中', content: '最灵活的居中方案' },
  { id: 2, title: 'Grid居中', content: '现代CSS布局方案' },
  { id: 3, title: '绝对定位', content: '传统居中方法' }
])

const handleCardClick = (id: number) => {
  console.log('点击了卡片:', id)
}
</script>

<style lang="scss" scoped>
@import './utils-center.scss';

.page-container {
  @include responsive-center(1200px);
  padding-top: 2rem;
  
  .center-section {
    @include center-flex;
    flex-direction: column;
    min-height: 40vh;
    text-align: center;
    margin-bottom: 3rem;
    
    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    p {
      font-size: clamp(1.1rem, 2.5vw, 1.3rem);
      color: #666;
      max-width: 600px;
    }
  }
  
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    
    .card {
      @include center-flex;
      flex-direction: column;
      padding: 2rem;
      border-radius: 16px;
      background: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
      }
      
      h3 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.5rem;
      }
      
      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .page-container {
    .card-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
}
</style>