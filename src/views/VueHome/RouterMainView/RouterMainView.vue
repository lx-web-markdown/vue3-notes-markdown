<script setup lang="ts">
import { ref } from 'vue'
import { type RouteItem, routesList } from './data-router'
import router from '@/router'

const routes = ref<RouteItem[]>(routesList)

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="route-guide">
    <h1 class="title">欢迎使用</h1>
    <div class="route-container">
      <div
        v-for="route in routes"
        :key="route.path"
        class="route-card"
        @click="handleNavigate(route.path)"
      >
        <div class="card-content">
          <div class="route-icon" v-if="route.icon">{{ route.icon }}</div>
          <h2 class="route-name">{{ route.name }}</h2>
          <p class="route-description">{{ route.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.route-guide {
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fa;

  .title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .route-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .route-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
    }

    .card-content {
      padding: 1.5rem;
    }

    .route-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #3498db;
    }

    .route-name {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      color: #2c3e50;
      font-weight: 600;
    }

    .route-description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .route-guide {
    padding: 1rem;

    .title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .route-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>