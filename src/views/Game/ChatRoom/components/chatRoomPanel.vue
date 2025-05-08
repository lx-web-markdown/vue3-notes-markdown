<template>
  <div class="chat-panel">
    <div class="chat-panel__box">
      <div
        ref="messageBoxRef"
        class="chat-panel__messages"
      >
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="[isMe(msg) ? 'chat-panel__bubble chat-panel__bubble--me ' : 'chat-panel__bubble chat-panel__bubble--other']"
        >
          {{ getMsgContent(msg) }}
          <span class="chat-panel__time">{{ getMsgTime(msg) }}</span>
        </div>
      </div>
      <div class="chat-panel__input">
        <textarea
          class="chat-panel__textarea"
          v-model="inputMessage"
          placeholder="输入消息..."
          @keydown.enter.exact.prevent="sendMessage"
          rows="2"
        />
        <button
          class="chat-panel__send"
          :disabled="!inputMessage.trim()"
          @click="sendMessage"
        >发送</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// 获取浏览器名称
function getBrowserName(): string {
  const ua = navigator.userAgent
  if (/chrome|crios|crmo/i.test(ua) && !/edge|edg|opr|opera/i.test(ua)) return 'Chrome'
  if (/edg/i.test(ua)) return 'Edge'
  if (/firefox|fxios/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome|crios|crmo|android/i.test(ua)) return 'Safari'
  if (/opr|opera/i.test(ua)) return 'Opera'
  return 'Unknown'
}

// 消息列表
const messages = ref<string[]>([])
// 输入框内容
const inputMessage = ref('')
// WebSocket 实例
let ws: WebSocket | null = null
const messageBoxRef = ref<HTMLDivElement | null>(null)
const currentUser = getBrowserName() // 当前浏览器名作为用户名

function getTime(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const second = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${min}:${second}`
}

function sendMessage() {
  if (ws && ws.readyState === WebSocket.OPEN && inputMessage.value.trim()) {
    // 假设消息格式为 'me: 内容'
    ws.send(`${currentUser}: ${inputMessage.value}`)
    inputMessage.value = ''
  }
}

function isMe(msg: string) {
  return msg.startsWith(`${currentUser}:`)
}

function getMsgContent(msg: string) {
  // 去掉用户名和时间，仅显示内容
  const idx = msg.indexOf(':')
  if (idx !== -1) {
    // 可能带时间戳
    const contentWithTime = msg.slice(idx + 1).trim()
    const timeIdx = contentWithTime.lastIndexOf(' ')
    if (timeIdx !== -1) {
      return contentWithTime.slice(0, timeIdx)
    }
    return contentWithTime
  }
  return msg
}

function getMsgTime(msg: string) {
  // 假设时间戳在最后
  const timeReg = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/
  const match = msg.match(timeReg)
  return match ? match[1] : ''
}

function scrollToBottom() {
  nextTick(() => {
    if (messageBoxRef.value) {
      messageBoxRef.value.scrollTop = messageBoxRef.value.scrollHeight
    }
  })
}

onMounted(() => {
  ws = new WebSocket('ws://192.168.1.101:9001/ws')
  ws.addEventListener('open', () => {
    // 连接建立提示
    window.alert('websocket连接建立完毕')
  })
  ws.addEventListener('message', (event) => {
    const time = getTime()
    messages.value.push(`${event.data} ${time}`)
    scrollToBottom()
  })
})

onUnmounted(() => {
  if (ws) {
    ws.close()
    ws = null
  }
})
</script>


<style lang="scss" scoped>
.chat-panel {
  background: linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%);
}

.chat-panel__box {
  box-shadow: 0 4px 24px 0 rgba(30, 64, 175, 0.08);
  border: 1px solid #e5e7eb;
}

.chat-panel__messages {
  min-height: 320px;
  max-height: 480px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 16px 8px;
  margin-bottom: 12px;
  overflow-y: auto;
  transition: background 0.2s;
}

.chat-panel__bubble {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.04);
  position: relative;
  margin-bottom: 8px;
}

.chat-panel__bubble--me {
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  color: #fff;
  text-align: right;
  margin-left: auto;
  margin-right: 0;
}

.chat-panel__bubble--other {
  background: #e5e7eb;
  color: #1e293b;
  text-align: left;
  margin-right: auto;
  margin-left: 0;
}

.chat-panel__time {
  margin-left: 8px;
  font-size: 12px;
  color: #94a3b8;
}

.chat-panel__input {
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 0 0 8px 8px;
  padding-top: 12px;
  padding-bottom: 8px;
}

.chat-panel__textarea {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
  padding: 8px 12px;
  transition: border 0.2s;
  min-height: 40px;
  max-height: 120px;
  resize: none;
}

.chat-panel__send {
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  transition: background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.08);
}

.chat-panel__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

