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
// images
import game2048Image from '@/assets/images/games/2048.png'
import memoryCardImage from '@/assets/images/games/memory-card.png'
import sudokuImage from '@/assets/images/games/sudoku.png'
import englishTypingImage from '@/assets/images/games/english-typing.png'
import englishSpellingImage from '@/assets/images/games/english-spelling.png'
import jumpImage from '@/assets/images/games/jump.png'
import popStarImage from '@/assets/images/games/pop-star.png'
import tetrisImage from '@/assets/images/games/tetris.png'
import snakeImage from '@/assets/images/games/snake.png'

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
    description: '滑动的趣味游戏',
    coverUrl: game2048Image,
    route: '/game/2048'
  },
  {
    id: 2,
    name: '记忆翻牌',
    description: '考验记忆力的趣味游戏',
    coverUrl: memoryCardImage,
    route: '/game/memory-card'
  },
  {
    id: 3,
    name: '数独',
    description: '经典数字益智游戏',
    coverUrl: sudokuImage,
    route: '/game/sudoku'
  },
  {
    id: 4,
    name: '跳一跳',
    description: '趣味游戏',
    coverUrl: jumpImage,
    route: '/game/jump'
  },
  {
    id: 5,
    name: 'PopStar',
    description: '消消乐',
    coverUrl: popStarImage,
    route: '/game/popstar'
  },
  {
    id: 6,
    name: '贪吃蛇',
    description: '经典贪吃蛇游戏',
    coverUrl: snakeImage,
    route: '/game/snake'
  },
  {
    id: 7,
    name: '俄罗斯方块',
    description: '经典俄罗斯方块游戏',
    coverUrl: tetrisImage,
    route: '/game/tetris'
  },
  {
    id: 8,
    name: '英文打字游戏',
    description: '提高英文打字速度和准确率',
    coverUrl: englishTypingImage,
    route: '/game/english-typing'
  },
  {
    id: 9,
    name: '英语单词记忆',
    description: '提高单词记忆',
    coverUrl: englishSpellingImage,
    route: '/game/english-spelling'
  },
  {
    id: 10,
    name: '五子棋（未完成）',
    description: '五子棋',
    coverUrl: englishSpellingImage,
    route: '/game/gobang'
  },
  {
    id: 11,
    name: '中国象棋',
    description: '中国象棋',
    coverUrl: englishSpellingImage,
    route: '/game/chinese-chess'
  },
  {
    id: 12,
    name: '聊天室',
    description: '聊天室',
    coverUrl: englishSpellingImage,
    route: '/game/chat-room'
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
