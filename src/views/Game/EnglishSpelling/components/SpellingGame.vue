<template>
  <div class="spelling-game">
    <div class="word-display" :class="{ 'shake-animation': showError }">
      <div class="word-container">
        <span
          v-for="(letter, index) in displayWord"
          :key="index"
          :class="{
            'hidden-letter': letter === '_',
            'correct-letter': revealedIndices.includes(index),
            'error-letter': errorIndices.includes(index)
          }"
        >
          {{ letter }}
        </span>
      </div>
      <div class="word-info">
        <div class="phonetic">[{{ currentWord.phonetic }}]</div>
        <div class="meaning">{{ currentWord.meaning }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';

interface Word {
  text: string;
  phonetic: string;
  meaning: string;
}

// 示例单词库，实际使用时应该有更大的单词库
const wordList: Word[] = [
  { text: 'apple', phonetic: 'ˈæpl', meaning: '苹果' },
  { text: 'banana', phonetic: 'bəˈnɑːnə', meaning: '香蕉' },
  { text: 'orange', phonetic: 'ˈɒrɪndʒ', meaning: '橙子' },
  { text: 'computer', phonetic: 'kəmˈpjuːtə', meaning: '计算机' },
  { text: 'language', phonetic: 'ˈlæŋɡwɪdʒ', meaning: '语言' },
  // 添加更多单词...
];

const props = defineProps<{
  difficulty: 'easy' | 'medium' | 'hard';
  gameMode: 'timed' | 'endless';
}>();

const emit = defineEmits<{
  (e: 'score-change', score: number): void;
  (e: 'time-change', time: number): void;
  (e: 'game-over'): void;
}>();

// 游戏状态
const currentWord = ref<Word>(wordList[0]);
const previousWord = ref<Word | null>(null);
const userInput = ref('');
const score = ref(0);
const totalAttempts = ref(0);
const correctAttempts = ref(0);
const gameOver = ref(false);
const showError = ref(false);
const revealedIndices = ref<number[]>([]);
const errorIndices = ref<number[]>([]);
const hiddenIndices = ref<number[]>([]);

// 计时相关
const totalTime = 120; // 限时模式总时间（秒）
const timeLeft = ref(totalTime);
let timer: NodeJS.Timeout | null = null;

// 根据难度计算要隐藏的字母数量
const getHiddenLetterCount = (word: string) => {
  const length = word.length;
  switch (props.difficulty) {
    case 'easy':
      return Math.floor(length * 0.3);
    case 'medium':
      return Math.floor(length * 0.5);
    case 'hard':
      return Math.floor(length * 0.7);
  }
};

// 生成显示的单词（带下划线）
const displayWord = computed(() => {
  const word = currentWord.value.text;
  return word
    .split('')
    .map((letter, index) => (hiddenIndices.value.includes(index) && !revealedIndices.value.includes(index) ? '_' : letter))
    .join('');
});

// 处理键盘输入
const handleKeyDown = (e: KeyboardEvent) => {
  if (gameOver.value) return;

  const letter = e.key.toLowerCase();
  if (letter.length === 1 && letter.match(/[a-z]/)) {
    const word = currentWord.value.text.toLowerCase();
    const hiddenCount = getHiddenLetterCount(word);
    
    // 找到当前需要填写的位置（第一个未填写的位置）
    let currentPosition = -1;
    const hiddenPositions = [];
    
    // 获取所有需要填写的位置
    for (let i = 0; i < word.length; i++) {
      if (displayWord.value[i] === '_' && !revealedIndices.value.includes(i)) {
        hiddenPositions.push(i);
      }
    }
    
    // 按顺序获取下一个需要填写的位置
    currentPosition = hiddenPositions[0];

    if (currentPosition !== -1) {
      if (word[currentPosition] === letter) {
        // 输入正确
        revealedIndices.value.push(currentPosition);
        errorIndices.value = errorIndices.value.filter(i => i !== currentPosition);

        // 检查是否完成当前单词
        const allLettersRevealed = word.split('').every((_, index) => 
          displayWord.value[index] !== '_' || revealedIndices.value.includes(index)
        );

        if (allLettersRevealed) {
          score.value += 10;
          ElMessage.success('回答正确！');
          emit('score-change', score.value);
          setTimeout(() => {
            loadNewWord();
          }, 1000);
        }
      } else {
        // 输入错误
        errorIndices.value = [currentPosition];
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
        }, 500);
        ElMessage.error('输入错误！');
      }
    }
  }
};

// 加载新单词
const loadNewWord = () => {
  previousWord.value = currentWord.value;
  
  // 过滤掉上一个单词，从剩余单词中随机选择
  const availableWords = wordList.filter(word => word.text !== previousWord.value?.text);
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  currentWord.value = availableWords[randomIndex];
  
  userInput.value = '';
  revealedIndices.value = [];
  errorIndices.value = [];
  
  // 重新生成固定的隐藏位置
  const word = currentWord.value.text;
  const hiddenCount = getHiddenLetterCount(word);
  const newHiddenIndices: number[] = [];
  
  while (newHiddenIndices.length < hiddenCount) {
    const randomIndex = Math.floor(Math.random() * word.length);
    if (!newHiddenIndices.includes(randomIndex)) {
      newHiddenIndices.push(randomIndex);
    }
  }
  
  hiddenIndices.value = newHiddenIndices;
};

// 重置游戏
const resetGame = () => {
  score.value = 0;
  totalAttempts.value = 0;
  correctAttempts.value = 0;
  timeLeft.value = totalTime;
  gameOver.value = false;
  loadNewWord();

  if (props.gameMode === 'timed') {
    startTimer();
  }
};

// 开始计时器
const startTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft.value--;
    emit('time-change', timeLeft.value);

    if (timeLeft.value <= 0) {
      clearInterval(timer!);
      gameOver.value = true;
      emit('game-over');
    }
  }, 1000);
};

// 监听游戏模式变化
watch(
  () => props.gameMode,
  newMode => {
    if (newMode === 'timed') {
      startTimer();
    } else {
      if (timer) clearInterval(timer);
    }
  }
);

// 添加全局键盘事件监听
onMounted(() => {
  loadNewWord();
  if (props.gameMode === 'timed') {
    startTimer();
  }
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('keydown', handleKeyDown);
});

// 暴露方法给父组件
defineExpose({
  resetGame,
});
</script>

<style scoped lang="scss">
.spelling-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: #faf8ef;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.word-display {
  text-align: center;

  &.shake-animation {
    animation: shake 0.5s;
  }
}

.word-container {
  font-size: 2.5rem;
  letter-spacing: 0.5rem;
  margin-bottom: 1rem;

  span {
    display: inline-block;
    min-width: 2rem;

    &.hidden-letter {
      color: #bbada0;
      border-bottom: 2px solid transparent;
    }

    &.correct-letter {
      color: #6aaa64;
      border-bottom: 2px solid #6aaa64;
    }

    &.error-letter {
      color: #dc3545;
      border-bottom: 2px solid #dc3545;
    }
  }
}

.word-info {
  .phonetic {
    color: #776e65;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .meaning {
    color: #776e65;
    font-size: 1.5rem;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
