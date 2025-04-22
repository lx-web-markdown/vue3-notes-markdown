<script setup lang="ts">
interface Card {
  id: number
  value: number
  isFlipped: boolean
  isMatched: boolean
}

defineProps<{
  card: Card
}>()
</script>

<template>
  <div 
    class="memory-card" 
    :class="{ 
      'is-flipped': card.isFlipped,
      'is-matched': card.isMatched 
    }"
  >
    <div class="card-inner">
      <div class="card-front">
        <div class="card-content">?</div>
      </div>
      <div class="card-back">
        <div class="card-content">{{ card.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.memory-card {
  aspect-ratio: 3/4;
  perspective: 1000px;
  cursor: pointer;

  &.is-flipped .card-inner {
    transform: rotateY(180deg);
  }

  &.is-matched {
    .card-back {
      background-color: #42b883;
      color: white;
    }
  }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-color: #e9ecef;
  color: #495057;
}

.card-back {
  background-color: white;
  transform: rotateY(180deg);
  color: #2c3e50;
}

.card-content {
  font-size: 2rem;
  font-weight: bold;
}
</style> 