<template>
  <div class="unix-time-container">
    <div class="current-time-section">
      <div class="title">当前时间戳 ({{ currentUnit === 's' ? '秒' : '毫秒' }})</div>
      <div class="timestamp-display">{{ currentTimestamp }}</div>
      <div class="action-buttons">
        <button @click="toggleUnit" class="action-btn unit-btn">
          <i class="fas fa-exchange-alt"></i> 切换单位
        </button>
        <button @click="copyTimestamp" class="action-btn">
          <i class="fas fa-copy"></i> 复制
        </button>
        <button 
          class="action-btn" 
          :class="{ 'stop-btn': isRunning, 'start-btn': !isRunning }" 
          @click="toggleTimer"
        >
          {{ isRunning ? '停止' : '开始' }}
        </button>
      </div>
    </div>

    <div class="conversion-section">
      <div class="conversion-content">
        <div class="timestamp-to-date">
          <div class="input-group">
            <input 
              type="text" 
              v-model="unixTimestamp" 
              class="time-input"
              placeholder="输入时间戳"
            >
            <select v-model="timestampUnit" class="unit-select">
              <option value="s">秒(s)</option>
              <option value="ms">毫秒(ms)</option>
            </select>
          </div>
          <button @click="convertToBeiJing" class="convert-btn">转换</button>
          <div class="result-group">
            <input 
              type="text" 
              v-model="beijingTime" 
              class="time-input" 
              readonly
              placeholder="转换结果"
            >
            <select v-model="timezone" class="timezone-select">
              <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
              <option value="UTC">协调世界时 (UTC)</option>
              <option value="America/New_York">美国东部时间 (UTC-5/4)</option>
              <option value="America/Los_Angeles">美国太平洋时间 (UTC-8/7)</option>
              <option value="Europe/London">英国标准时间 (UTC+0/1)</option>
              <option value="Europe/Paris">欧洲中部时间 (UTC+1/2)</option>
              <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
              <option value="Asia/Singapore">新加坡标准时间 (UTC+8)</option>
              <option value="Australia/Sydney">澳大利亚东部时间 (UTC+10/11)</option>
            </select>
          </div>
        </div>

        <div class="date-to-timestamp">
          <div class="input-group">
            <input 
              type="datetime-local" 
              v-model="dateTimeInput"
              class="datetime-input"
            >
            <select v-model="inputTimezone" class="timezone-select">
              <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
              <option value="UTC">协调世界时 (UTC)</option>
              <option value="America/New_York">美国东部时间 (UTC-5/4)</option>
              <option value="America/Los_Angeles">美国太平洋时间 (UTC-8/7)</option>
              <option value="Europe/London">英国标准时间 (UTC+0/1)</option>
              <option value="Europe/Paris">欧洲中部时间 (UTC+1/2)</option>
              <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
              <option value="Asia/Singapore">新加坡标准时间 (UTC+8)</option>
              <option value="Australia/Sydney">澳大利亚东部时间 (UTC+10/11)</option>
            </select>
          </div>
          <button @click="convertToTimestamp" class="convert-btn">转换</button>
          <div class="result-group">
            <input 
              type="text" 
              v-model="convertedTimestamp" 
              class="time-input" 
              readonly
              placeholder="转换结果"
            >
            <select v-model="outputUnit" class="unit-select">
              <option value="s">秒(s)</option>
              <option value="ms">毫秒(ms)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="description">
      <h3>简介</h3>
      <p>时间戳，是从1970年1月1日（UTC/GMT午夜）开始经过的秒数（不考虑闰秒），用于表示一个时间点。然而，这种格式对于人类阅读不友好。因此需要转换成可读的日期和时间格式。这个工具能够将时间戳快速转换为人类可读的日期时间格式，同时也支持反向转换，即将日期时间转换为时间戳。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTimestamp = ref('')
const unixTimestamp = ref('')
const beijingTime = ref('')
const dateTimeInput = ref('')
const convertedTimestamp = ref('')
const timestampUnit = ref('s')
const timezone = ref('Asia/Shanghai')
const inputTimezone = ref('Asia/Shanghai')
const outputUnit = ref('s')
const isRunning = ref(true)
const currentUnit = ref('s')

let timer: number | null = null

// 更新当前时间戳
const updateCurrentTimestamp = () => {
  const now = new Date().getTime()
  currentTimestamp.value = currentUnit.value === 's' 
    ? Math.floor(now / 1000).toString()
    : now.toString()
}

// 切换计时器状态
const toggleTimer = () => {
  if (isRunning.value) {
    if (timer) {
      window.clearInterval(timer)
      timer = null
    }
  } else {
    updateCurrentTimestamp()
    timer = window.setInterval(updateCurrentTimestamp, 1000)
  }
  isRunning.value = !isRunning.value
}

// 切换时间戳单位
const toggleUnit = () => {
  currentUnit.value = currentUnit.value === 's' ? 'ms' : 's'
  updateCurrentTimestamp()
}

// 工具函数：格式化日期时间
const formatDateTime = (date: Date, targetTimezone: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: targetTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date).replace(/\//g, '-')
}

// Unix时间戳转日期时间
const convertToBeiJing = () => {
  try {
    if (!unixTimestamp.value) {
      beijingTime.value = '请输入时间戳'
      return
    }

    const timestamp = parseInt(unixTimestamp.value)
    if (isNaN(timestamp)) {
      beijingTime.value = '请输入有效的数字'
      return
    }

    // 根据输入单位转换为毫秒时间戳
    const timestampMs = timestampUnit.value === 's' ? timestamp * 1000 : timestamp
    
    // 创建UTC时间
    const date = new Date(timestampMs)
    
    // 使用指定时区格式化时间
    beijingTime.value = formatDateTime(date, timezone.value)
  } catch (error) {
    console.error('转换错误:', error)
    beijingTime.value = '转换出错，请检查输入'
  }
}

// 日期时间转Unix时间戳
const convertToTimestamp = () => {
  try {
    if (!dateTimeInput.value) {
      convertedTimestamp.value = '请选择日期时间'
      return
    }

    // 获取用户输入的本地时间
    const localDate = new Date(dateTimeInput.value)
    
    // 将本地时间转换为目标时区的时间
    const targetDate = new Date(localDate.toLocaleString('en-US', {
      timeZone: inputTimezone.value
    }))
    
    // 获取时区偏移量（毫秒）
    const offset = targetDate.getTime() - localDate.getTime()
    
    // 计算最终的UTC时间戳
    const timestamp = localDate.getTime() - offset
    
    // 根据选择的输出单位格式化结果
    convertedTimestamp.value = outputUnit.value === 's' 
      ? Math.floor(timestamp / 1000).toString()
      : timestamp.toString()
  } catch (error) {
    console.error('转换错误:', error)
    convertedTimestamp.value = '转换出错，请检查输入'
  }
}

// 复制功能
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('复制失败:', error)
  }
}

const copyTimestamp = () => copyToClipboard(currentTimestamp.value)

// 添加时区说明
const timezoneLabels = {
  'Asia/Shanghai': '中国标准时间 (UTC+8)',
  'UTC': '协调世界时 (UTC)',
  'America/New_York': '美国东部时间 (UTC-5/4)',
  'America/Los_Angeles': '美国太平洋时间 (UTC-8/7)',
  'Europe/London': '英国标准时间 (UTC+0/1)',
  'Europe/Paris': '欧洲中部时间 (UTC+1/2)',
  'Asia/Tokyo': '日本标准时间 (UTC+9)',
  'Asia/Singapore': '新加坡标准时间 (UTC+8)',
  'Australia/Sydney': '澳大利亚东部时间 (UTC+10/11)'
}

onMounted(() => {
  updateCurrentTimestamp()
  timer = window.setInterval(updateCurrentTimestamp, 1000)
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<style scoped lang="scss">
.unix-time-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  .current-time-section {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    .title {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }

    .timestamp-display {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
    }
  }

  .conversion-section {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    .conversion-content {
      padding: 20px;
    }

    .timestamp-to-date,
    .date-to-timestamp {
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 2fr auto 2fr;
      gap: 15px;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .input-group, .result-group {
      display: flex;
      gap: 10px;
    }

    .time-input, .datetime-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        border-color: #1890ff;
        outline: none;
      }
    }

    .unit-select, .timezone-select {
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      background: #fff;
    }
  }

  .action-btn, .convert-btn {
    padding: 8px 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #1890ff;
      color: #1890ff;
    }
  }

  .stop-btn {
    background: #ff4d4f;
    color: #fff;
    border: none;

    &:hover {
      background: #ff7875;
      color: #fff;
    }
  }

  .start-btn {
    background: #52c41a;
    color: #fff;
    border: none;

    &:hover {
      background: #73d13d;
      color: #fff;
    }
  }

  .unit-btn {
    background: #1890ff;
    color: #fff;
    border: none;

    &:hover {
      background: #40a9ff;
      color: #fff;
    }
  }

  .description {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h3 {
      margin: 0 0 10px;
      font-size: 16px;
      color: #333;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  }

  .timezone-select {
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    min-width: 200px;  // 增加选择器宽度以适应更长的文本
    
    option {
      padding: 4px;
    }
  }
}
</style>