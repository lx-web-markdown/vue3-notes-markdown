<template>
  <div class="game-page">
    <h1 class="game-title">英文拼写游戏</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>根据单词的中文意思和读音，拼写出完整的英文单词</li>
        <li>不同难度模式下会隐藏不同数量的字母</li>
        <li>使用键盘输入缺失的字母</li>
        <li>可选择限时模式或无尽模式</li>
      </ul>
    </div>

    <SpellingGame
      ref="gameRef"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SpellingGame from './components/SpellingGame.vue'

const gameRef = ref<InstanceType<typeof SpellingGame> | null>(null)

const handleGameOver = () => {
  setTimeout(() => {
    alert(`游戏结束！`)
  }, 300)
}
</script>

<style scoped lang="scss">
.game-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-title {
  text-align: center;
  color: #776e65;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.game-instructions {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 2rem;

  h2 {
    color: #776e65;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      color: #776e65;
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: #bbada0;
      }
    }
  }
}
</style> 