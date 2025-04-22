<template>
  <div class="game-page">
    <h1 class="game-title">2048 游戏</h1>
    <div class="game-instructions">
      <h2>游戏说明：</h2>
      <ul>
        <li>使用键盘的方向键（↑↓←→）来移动方块</li>
        <li>相同数字的方块相撞时会合并成为它们的和</li>
        <li>每次移动后会在空白处随机出现一个新的数字方块（2或4）</li>
        <li>当界面中出现2048时，你就赢了！</li>
        <li>如果无法继续移动，游戏结束</li>
      </ul>
    </div>
    <Game2048 class="game-board" ref="gameRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Game2048 from './components/2048.vue'

const gameRef = ref<InstanceType<typeof Game2048> | null>(null)

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  // 阻止方向键的默认滚动行为
  if (event.key.startsWith('Arrow')) {
    event.preventDefault()
  }
  gameRef.value?.handleKeydown(event)
}

// 组件挂载时添加键盘事件监听
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

// 组件卸载时移除键盘事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
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

.game-board {
  margin: 0 auto;
}
</style>
