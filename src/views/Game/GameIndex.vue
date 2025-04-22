<template>
  <div class="game-index">
    <h1 class="game-index__title">游戏中心</h1>
    <div class="game-index__list">
      <div v-for="game in games" :key="game.id" class="game-index__item" @click="navigateToGame(game)">
        <div class="game-index__item-cover">
          <img :src="game.coverUrl" :alt="game.name">
        </div>
        <div class="game-index__item-info">
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Game {
  id: number
  name: string
  description: string
  coverUrl: string
  route: string
}

const router = useRouter()

const games = ref<Game[]>([
  {
    id: 1,
    name: '2048',
    description: '考验记忆力的趣味游戏',
    coverUrl: '/images/games/2048.png',
    route: '/game/2048'
  },
  {
    id: 2,
    name: '记忆翻牌',
    description: '考验记忆力的趣味游戏',
    coverUrl: '/images/games/memory-card.png',
    route: '/game/memory-card'
  },
  {
    id: 3,
    name: '数独',
    description: '经典数字益智游戏',
    coverUrl: '/images/games/sudoku.png',
    route: '/game/sudoku'
  }
])

const navigateToGame = (game: Game) => {
  router.push(game.route)
}
</script>

<style scoped lang="scss">
.game-index {
  padding: 20px;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--el-text-color-primary);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  &__item {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &-cover {
      width: 100%;
      height: 160px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-info {
      padding: 16px;

      h3 {
        margin: 0 0 8px;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      p {
        margin: 0;
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
