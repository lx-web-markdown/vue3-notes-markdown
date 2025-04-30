<template>
  <div class="spelling-game">
    <div class="game-settings">
      <div class="word-level-selector">
        <span class="label">词库：</span>
        <el-radio-group v-model="wordLevel">
          <el-radio-button value="primary">小学</el-radio-button>
          <el-radio-button value="junior">初中</el-radio-button>
          <el-radio-button value="senior">高中</el-radio-button>
          <el-radio-button value="college">大学</el-radio-button>
          <el-radio-button value="graduate">研究生</el-radio-button>
        </el-radio-group>
      </div>
      <div class="difficulty-selector">
        <span class="label">难度：</span>
        <el-radio-group v-model="difficulty">
          <el-radio-button value="easy">简单</el-radio-button>
          <el-radio-button value="medium">中等</el-radio-button>
          <el-radio-button value="hard">困难</el-radio-button>
        </el-radio-group>
      </div>
      <div class="mode-selector">
        <span class="label">模式：</span>
        <el-radio-group v-model="gameMode">
          <el-radio-button value="timed">限时模式</el-radio-button>
          <el-radio-button value="endless">无尽模式</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="game-header">
      <div class="scores">
        <div class="completed-words">已完成: {{ gameState.completedWords }}</div>
        <div class="accuracy">正确率: {{ accuracy }}%</div>
        <div v-if="gameMode === 'timed'" class="time-left">剩余时间: {{ timeLeft }}s</div>
        <div class="best-score">最高完成: {{ bestScore }}</div>
      </div>
      <button class="new-game-button" @click="resetGame">新游戏</button>
    </div>

    <div class="word-display" :class="{ 'shake-animation': showError }">
      <div class="word-container">
        <span
          v-for="(letter, index) in displayWord"
          :key="index"
          :class="{
            'hidden-letter': letter === '_',
            'correct-letter': revealedIndices.includes(index),
            'error-letter': errorIndices.includes(index),
          }"
        >
          {{ letter }}
        </span>
      </div>
      <div class="word-info">
        <div class="phonetic">[{{ currentWord.phonetic }}]</div>
        <div class="meaning">{{ currentWord.meaning }}</div>
      </div>

      <div class="game-controls">
        <button class="hint-button" @click="showHint" :disabled="!hasHiddenLetters">提示</button>
        <button class="skip-button" @click="skipWord">换一个</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, reactive } from 'vue';
// 引入不同学习阶段的单词数据源
import primaryWordList from '../dataSources/101'; // 小学阶段词汇
import juniorWordList from '../dataSources/102'; // 初中阶段词汇
import seniorWordList from '../dataSources/103'; // 高中阶段词汇
import collegeWordList from '../dataSources/104'; // 大学阶段词汇
import graduateWordList from '../dataSources/105'; // 研究生阶段词汇

interface Word {
  text: string;
  phonetic: string;
  meaning: string;
}

// 游戏设置和状态
const difficulty = ref<'easy' | 'medium' | 'hard'>('easy');
const gameMode = ref<'timed' | 'endless'>('endless');
const wordLevel = ref<'primary' | 'junior' | 'senior' | 'college' | 'graduate'>('primary');
const accuracy = ref(100);

// 计时相关
const totalTime = 120; // 限时模式总时间（秒）
let timer: NodeJS.Timeout | null = null;
const timeLeft = ref(gameMode.value === 'timed' ? totalTime : 0);

const gameState = reactive({
  completedWords: 0,
  bestScores: {
    timed: parseInt(localStorage.getItem('spelling-best-score-timed') || '0'),
    endless: parseInt(localStorage.getItem('spelling-best-score-endless') || '0'),
  },
});

const bestScore = computed(
  () => gameState.bestScores[gameMode.value === 'timed' ? 'timed' : 'endless']
);

// 根据难度和词库级别选择单词列表
const wordList = computed<Word[]>(() => {
  // 首先根据词库级别选择基础词库
  let baseWordList: Word[];
  switch (wordLevel.value) {
    case 'primary':
      baseWordList = primaryWordList;
      break;
    case 'junior':
      baseWordList = juniorWordList;
      break;
    case 'senior':
      baseWordList = seniorWordList;
      break;
    case 'college':
      baseWordList = collegeWordList;
      break;
    case 'graduate':
      baseWordList = graduateWordList;
      break;
    default:
      baseWordList = primaryWordList;
  }

  // 根据难度级别过滤或处理词库
  switch (difficulty.value) {
    case 'easy':
      return baseWordList.slice(0, Math.floor(baseWordList.length * 0.3));
    case 'medium':
      return baseWordList.slice(0, Math.floor(baseWordList.length * 0.6));
    case 'hard':
      return baseWordList;
    default:
      return baseWordList;
  }
});

const emit = defineEmits<{
  (e: 'score-change', score: number): void;
  (e: 'accuracy-change', accuracy: number): void;
  (e: 'time-change', time: number): void;
  (e: 'game-over'): void;
}>();

// 游戏状态
const currentWord = ref<Word>(wordList.value[0]);
const previousWord = ref<Word | null>(null);
const totalAttempts = ref(0);
const correctAttempts = ref(0);
const gameOver = ref(false);
const showError = ref(false);
const revealedIndices = ref<number[]>([]);
const errorIndices = ref<number[]>([]);
const hiddenIndices = ref<number[]>([]);

// 根据难度计算要隐藏的字母数量
const getHiddenLetterCount = (word: string) => {
  const length = word.length;
  let count = 0;

  switch (difficulty.value) {
    case 'easy':
      count = Math.max(1, Math.floor(length * 0.3));
      break;
    case 'medium':
      count = Math.max(1, Math.floor(length * 0.5));
      break;
    case 'hard':
      count = Math.max(1, Math.floor(length * 0.7));
      break;
  }

  // 确保隐藏的字母数不超过单词长度减1（至少保留一个字母显示）
  return Math.min(count, length - 1);
};

// 生成显示的单词（带下划线）
const displayWord = computed(() => {
  const word = currentWord.value.text;
  return word
    .split('')
    .map((letter, index) =>
      hiddenIndices.value.includes(index) && !revealedIndices.value.includes(index) ? '_' : letter
    )
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
        correctAttempts.value++;
        totalAttempts.value++;
        // 更新正确率
        const newAccuracy = (correctAttempts.value / totalAttempts.value) * 100;
        updateAccuracy(newAccuracy);

        // 检查是否完成当前单词
        const allLettersRevealed = word
          .split('')
          .every(
            (_, index) => displayWord.value[index] !== '_' || revealedIndices.value.includes(index)
          );

        if (allLettersRevealed) {
          gameState.completedWords++;
          // 更新最高分（实际是最多完成单词数）
          const currentMode = gameMode.value === 'timed' ? 'timed' : 'endless';
          if (gameState.completedWords > gameState.bestScores[currentMode]) {
            gameState.bestScores[currentMode] = gameState.completedWords;
            localStorage.setItem(
              `spelling-best-score-${currentMode}`,
              gameState.completedWords.toString()
            );
          }
          emit('score-change', gameState.completedWords);
          setTimeout(() => {
            loadNewWord();
          }, 1000);
        }
      } else {
        // 输入错误
        errorIndices.value = [currentPosition];
        showError.value = true;
        totalAttempts.value++;
        // 更新正确率
        const newAccuracy = (correctAttempts.value / totalAttempts.value) * 100;
        updateAccuracy(newAccuracy);
        setTimeout(() => {
          showError.value = false;
        }, 500);
        // ElMessage.error('输入错误！');
      }
    }
  }
};

// 加载新单词
const loadNewWord = () => {
  previousWord.value = currentWord.value;

  // 过滤掉上一个单词，从剩余单词中随机选择
  const availableWords = wordList.value.filter(word => word.text !== previousWord.value?.text);
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  currentWord.value = availableWords[randomIndex];

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
  gameState.completedWords = 0;
  totalAttempts.value = 0;
  correctAttempts.value = 0;
  updateAccuracy(100);
  timeLeft.value = gameMode.value === 'timed' ? totalTime : 0;
  gameOver.value = false;
  loadNewWord();

  if (gameMode.value === 'timed') {
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
  () => gameMode.value,
  newMode => {
    if (newMode === 'timed') {
      timeLeft.value = totalTime;
      startTimer();
    } else {
      if (timer) clearInterval(timer);
      timeLeft.value = 0;
    }
  }
);

// 监听难度变化
watch(
  () => difficulty.value,
  () => {
    loadNewWord();
  }
);

// 监听词库变化
watch(
  () => wordLevel.value,
  () => {
    loadNewWord();
  }
);

// 添加全局键盘事件监听
onMounted(() => {
  loadNewWord();
  if (gameMode.value === 'timed') {
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

// 更新分数
const updateScore = (newScore: number) => {
  gameState.completedWords = newScore;
  const currentMode = gameMode.value === 'timed' ? 'timed' : 'endless';
  if (newScore > gameState.bestScores[currentMode]) {
    gameState.bestScores[currentMode] = newScore;
    localStorage.setItem(`spelling-best-score-${currentMode}`, newScore.toString());
  }
  emit('score-change', newScore);
};

// 更新准确率
const updateAccuracy = (newAccuracy: number) => {
  accuracy.value = Math.round(newAccuracy);
  emit('accuracy-change', newAccuracy);
};

// 更新时间
const updateTime = (newTime: number) => {
  timeLeft.value = newTime;
  emit('time-change', newTime);
};

// 游戏结束时的处理
watch(
  () => gameOver.value,
  newValue => {
    if (newValue) {
      const currentMode = gameMode.value === 'timed' ? 'timed' : 'endless';
      if (gameState.completedWords > gameState.bestScores[currentMode]) {
        gameState.bestScores[currentMode] = gameState.completedWords;
        localStorage.setItem(
          `spelling-best-score-${currentMode}`,
          gameState.completedWords.toString()
        );
      }
    }
  }
);

// 检查是否还有隐藏的字母
const hasHiddenLetters = computed(() => {
  const word = currentWord.value.text;
  return word
    .split('')
    .some((_, index) => displayWord.value[index] === '_' && !revealedIndices.value.includes(index));
});

// 显示提示（从左到右依次显示一个隐藏的字母）
const showHint = () => {
  const word = currentWord.value.text.toLowerCase();
  let leftmostHiddenPosition = -1;

  // 找到最左边的隐藏字母位置
  for (let i = 0; i < word.length; i++) {
    if (displayWord.value[i] === '_' && !revealedIndices.value.includes(i)) {
      leftmostHiddenPosition = i;
      break;
    }
  }

  if (leftmostHiddenPosition !== -1) {
    // 显示这个字母
    revealedIndices.value.push(leftmostHiddenPosition);

    // 更新正确率统计
    correctAttempts.value++;
    totalAttempts.value++;
    const newAccuracy = (correctAttempts.value / totalAttempts.value) * 100;
    updateAccuracy(newAccuracy);

    // 检查是否完成当前单词
    const allLettersRevealed = word
      .split('')
      .every(
        (_, index) => displayWord.value[index] !== '_' || revealedIndices.value.includes(index)
      );

    if (allLettersRevealed) {
      gameState.completedWords++;
      const currentMode = gameMode.value === 'timed' ? 'timed' : 'endless';
      if (gameState.completedWords > gameState.bestScores[currentMode]) {
        gameState.bestScores[currentMode] = gameState.completedWords;
        localStorage.setItem(
          `spelling-best-score-${currentMode}`,
          gameState.completedWords.toString()
        );
      }
      emit('score-change', gameState.completedWords);
      setTimeout(() => {
        loadNewWord();
      }, 1000);
    }
  }
};

// 跳过当前单词
const skipWord = () => {
  loadNewWord();
};
</script>

<style scoped lang="scss">
.spelling-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #faf8ef;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.game-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .label {
    color: #776e65;
    font-weight: 600;
    font-size: 1.1rem;
    margin-right: 1rem;
    min-width: 4rem;
    text-align: right;
  }

  .difficulty-selector,
  .mode-selector,
  .word-level-selector {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  :deep(.el-radio-button__inner) {
    padding: 10px 20px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.scores {
  display: flex;
  gap: 2rem;
  font-size: 1.2rem;
  color: #776e65;

  > div {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .completed-words {
    color: #6aaa64;
    font-weight: 600;
  }

  .accuracy {
    color: #c9b458;
    font-weight: 600;
  }

  .time-left {
    color: #dc3545;
    font-weight: 600;
  }

  .best-score {
    color: #85c0f9;
    font-weight: 600;
  }
}

.game-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.hint-button,
.skip-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  i {
    font-size: 1.2rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

.hint-button {
  background-color: #c9b458;
  color: white;

  &:hover:not(:disabled) {
    background-color: #d9c468;
  }
}

.skip-button {
  background-color: #85c0f9;
  color: white;

  &:hover:not(:disabled) {
    background-color: #95d0ff;
  }
}

.word-display {
  width: 100%;
  max-width: 800px;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &.shake-animation {
    animation: shake 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
}

.word-container {
  font-size: 3rem;
  letter-spacing: 0.8rem;
  margin-bottom: 2rem;
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 2.5rem;
    height: 4rem;
    padding: 0 0.5rem;
    background: #f5f5f5;
    border-radius: 8px;
    transition: all 0.3s ease;

    &.hidden-letter {
      color: #bbada0;
      border-bottom: 3px solid #bbada0;
      background: #f8f8f8;
    }

    &.correct-letter {
      color: #6aaa64;
      border-bottom: 3px solid #6aaa64;
      background: #f0f7f0;
    }

    &.error-letter {
      color: #dc3545;
      border-bottom: 3px solid #dc3545;
      background: #fff5f5;
      animation: shake 0.5s;
    }
  }
}

.word-info {
  .phonetic {
    color: #776e65;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .meaning {
    color: #776e65;
    font-size: 1.6rem;
    line-height: 1.5;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    margin: 0 auto;
    max-width: 600px;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .spelling-game {
    padding: 1rem;
    gap: 1rem;
  }

  .game-settings,
  .game-header,
  .word-display {
    padding: 1rem;
  }

  .scores {
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 1rem;
  }

  .word-container {
    font-size: 2rem;
    letter-spacing: 0.5rem;
  }

  .word-info {
    .phonetic {
      font-size: 1.2rem;
    }
    .meaning {
      font-size: 1.4rem;
    }
  }

  .game-header {
    flex-direction: column;
    gap: 1rem;
  }

  .game-controls {
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
  }

  .hint-button,
  .skip-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    min-width: 100px;
  }
}
</style>
