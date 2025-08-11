<template>
  <div class="responsive-center-container">
    <div class="responsive-center-item">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="button-group">
        <button 
          v-for="btn in buttons" 
          :key="btn.id"
          @click="handleButtonClick(btn.id)"
          class="btn"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Button {
  id: string
  text: string
}

interface Props {
  title?: string
  description?: string
  buttons?: Button[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '响应式居中',
  description: '支持不同屏幕尺寸的居中布局',
  buttons: () => [
    { id: 'primary', text: '主要按钮' },
    { id: 'secondary', text: '次要按钮' }
  ]
})

const emit = defineEmits<{
  buttonClick: [buttonId: string]
}>()

const handleButtonClick = (buttonId: string) => {
  emit('buttonClick', buttonId)
}
</script>

<style lang="scss" scoped>
.responsive-center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .responsive-center-item {
    text-align: center;
    color: white;
    padding: clamp(1.5rem, 5vw, 3rem);
    border-radius: clamp(8px, 2vw, 16px);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: min(90vw, 500px);
    width: 100%;
    
    h2 {
      margin-bottom: 1rem;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 600;
    }
    
    p {
      margin-bottom: 2rem;
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      
      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: clamp(0.9rem, 2vw, 1rem);
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
}

// 响应式断点
@media (max-width: 768px) {
  .responsive-center-container {
    .responsive-center-item {
      .button-group {
        flex-direction: column;
        align-items: center;
        
        .btn {
          width: 100%;
          max-width: 200px;
        }
      }
    }
  }
}
</style>