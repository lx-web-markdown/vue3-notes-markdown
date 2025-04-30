<template>
  <div class="gobang-page">
    <div v-if="!isHost && !isPeer" class="role-selection">
      <h2>五子棋对战</h2>
      <div class="actions">
        <el-button type="primary" @click="createHost" :loading="isCreating">创建房间</el-button>
        <el-button type="success" @click="showJoinDialog">加入房间</el-button>
      </div>
    </div>

    <div v-else class="game-container">
      <!-- 房间信息面板 -->
      <div class="room-panel">
        <div class="room-info">
          <div class="room-id">
            <span class="label">房间号：</span>
            <span class="id">{{ peerId }}</span>
            <el-button type="primary" link @click="copyPeerId" :loading="isCopying">
              <template #icon>
                <el-icon><DocumentCopy /></el-icon>
              </template>
              复制房间号
            </el-button>
          </div>
          <div class="role-info">
            你的角色：{{ playerColor === 'black' ? '黑方（先手）' : '白方（后手）' }}
          </div>
        </div>
        <el-button type="danger" link @click="resetState">
          <template #icon>
            <el-icon><Close /></el-icon>
          </template>
          退出房间
        </el-button>
      </div>
      
      <div v-if="connectionError" class="error-message">
        {{ connectionError }}
        <el-button type="primary" link @click="retryConnection">重试</el-button>
      </div>

      <GoBangGame
        v-if="playerColor && !connectionError"
        :peer-id="peerId"
        :player-color="playerColor"
        @game-end="handleGameEnd"
        @error="handleGameError"
      />
      
      <div v-else-if="!connectionError" class="waiting">
        <el-icon class="loading"><Loading /></el-icon>
        <template v-if="isHost">
          等待对手加入房间...
          <div class="tip">
            将房间号 <span class="highlight">{{ peerId }}</span> 发给对手即可开始游戏
          </div>
        </template>
        <template v-else>
          正在连接到房间...
          <div class="tip">
            正在连接到房间 <span class="highlight">{{ peerId }}</span>，请稍候
          </div>
        </template>
      </div>
    </div>

    <!-- 加入房间对话框 -->
    <el-dialog
      v-model="joinDialogVisible"
      title="加入房间"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form @submit.prevent="joinPeer">
        <el-form-item label="房间号">
          <el-input 
            v-model="inputPeerId" 
            placeholder="请输入房主的房间号"
            :maxlength="9"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="joinPeer" :loading="isJoining">加入</el-button>
          <el-button @click="joinDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Close, Loading } from '@element-plus/icons-vue'
import GoBangGame from './components/GoBangGame.vue'
import type { Player } from './types'
import Peer from 'peerjs'

const isHost = ref(false)
const isPeer = ref(false)
const peerId = ref<string>('')
const playerColor = ref<Player | null>(null)
const joinDialogVisible = ref(false)
const inputPeerId = ref('')
const peer = ref<Peer | null>(null)
const connectionError = ref('')
const isCreating = ref(false)
const isJoining = ref(false)
const isCopying = ref(false)

// 创建房主
const createHost = async () => {
  try {
    isCreating.value = true
    isHost.value = true
    playerColor.value = 'black'
    
    // 生成一个随机的 peer ID
    const randomId = Math.random().toString(36).substr(2, 9)
    
    // 创建 Peer 实例
    peer.value = new Peer(randomId, {
      host: 'localhost',
      port: 9000,
      path: '/myapp',
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      }
    })

    // 设置连接超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('创建房间超时')), 10000)
    })

    // 等待连接打开
    await Promise.race([
      new Promise<void>((resolve) => {
        peer.value!.on('open', (id: string) => {
          peerId.value = id
          console.log('Created room with ID:', id)
          ElMessage.success('房间创建成功')
          resolve()
        })
      }),
      timeoutPromise
    ])

    peer.value.on('error', (err) => {
      console.error('Peer error:', err)
      handlePeerError(err)
    })

    peer.value.on('disconnected', () => {
      console.log('Peer disconnected')
      connectionError.value = '连接断开，请重试'
      ElMessage.error('连接断开，请重试')
    })

    peer.value.on('close', () => {
      console.log('Peer connection closed')
      connectionError.value = '连接已关闭'
      ElMessage.error('连接已关闭')
      resetState()
    })

  } catch (err) {
    console.error('Failed to create peer:', err)
    ElMessage.error(err instanceof Error ? err.message : '创建房间失败，请重试')
    resetState()
  } finally {
    isCreating.value = false
  }
}

// 处理 Peer 错误
const handlePeerError = (err: any) => {
  console.error('Peer error:', err)
  if (err.type === 'unavailable-id') {
    connectionError.value = '该ID已被占用，请重试'
    ElMessage.error('该ID已被占用，正在重试...')
    // 自动重试
    setTimeout(createHost, 1000)
  } else if (err.type === 'peer-unavailable') {
    connectionError.value = '找不到对手，请确认ID是否正确'
    ElMessage.error('找不到对手，请确认ID是否正确')
  } else if (err.type === 'network') {
    connectionError.value = '网络连接错误，请检查网络设置'
    ElMessage.error('网络连接错误，请检查网络设置')
  } else if (err.type === 'disconnected') {
    connectionError.value = '连接断开，请重试'
    ElMessage.error('连接断开，请重试')
  } else {
    connectionError.value = `连接错误: ${err.message}`
    ElMessage.error(`连接错误: ${err.message}`)
  }
}

// 显示加入对话框
const showJoinDialog = () => {
  joinDialogVisible.value = true
  inputPeerId.value = ''
}

// 加入游戏
const joinPeer = async () => {
  if (!inputPeerId.value) {
    ElMessage.warning('请输入房主ID')
    return
  }

  try {
    isJoining.value = true
    isPeer.value = true
    playerColor.value = 'white'
    
    // 创建 Peer 实例
    const randomId = Math.random().toString(36).substr(2, 9)
    peer.value = new Peer(randomId, {
      host: 'localhost',
      port: 9000,
      path: '/myapp',
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      }
    })

    // 设置连接超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('连接超时')), 10000)
    })

    // 等待连接打开
    await Promise.race([
      new Promise<void>((resolve) => {
        peer.value!.on('open', () => {
          console.log('Peer created, connecting to:', inputPeerId.value)
          resolve()
        })
      }),
      timeoutPromise
    ])

    // 连接到房主
    const conn = peer.value.connect(inputPeerId.value, {
      reliable: true,
      serialization: 'json'
    })

    // 等待连接建立
    await Promise.race([
      new Promise<void>((resolve) => {
        conn.on('open', () => {
          console.log('Connected to host')
          peerId.value = inputPeerId.value
          joinDialogVisible.value = false
          resolve()
        })
      }),
      timeoutPromise
    ])

    peer.value.on('error', handlePeerError)
    
    peer.value.on('disconnected', () => {
      console.log('Peer disconnected')
      connectionError.value = '连接断开，请重试'
      ElMessage.error('连接断开，请重试')
    })

    peer.value.on('close', () => {
      console.log('Peer connection closed')
      connectionError.value = '连接已关闭'
      ElMessage.error('连接已关闭')
      resetState()
    })

  } catch (err) {
    console.error('Failed to join peer:', err)
    ElMessage.error(err instanceof Error ? err.message : '加入房间失败，请重试')
    resetState()
  } finally {
    isJoining.value = false
  }
}

// 复制 Peer ID
const copyPeerId = async () => {
  try {
    isCopying.value = true
    await navigator.clipboard.writeText(peerId.value)
    ElMessage.success('房间号已复制到剪贴板')
  } catch (error) {
    console.error('Failed to copy:', error)
    ElMessage.error('复制失败，请手动复制')
  } finally {
    isCopying.value = false
  }
}

// 重置状态
const resetState = () => {
  isHost.value = false
  isPeer.value = false
  playerColor.value = null
  peerId.value = ''
  connectionError.value = ''
  peer.value?.destroy()
  peer.value = null
}

// 重试连接
const retryConnection = () => {
  if (isHost.value) {
    createHost()
  } else if (isPeer.value) {
    joinPeer()
  }
}

// 处理游戏错误
const handleGameError = (error: string) => {
  connectionError.value = error
  ElMessage.error(error)
}

// 处理游戏结束
const handleGameEnd = () => {
  resetState()
}

// 组件卸载时清理
onUnmounted(() => {
  peer.value?.destroy()
})
</script>

<style scoped lang="scss">
.gobang-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .role-selection {
    text-align: center;
    padding: 40px;

    h2 {
      margin-bottom: 30px;
      font-size: 24px;
    }

    .actions {
      display: flex;
      gap: 20px;
      justify-content: center;
    }
  }

  .game-container {
    .room-panel {
      margin-bottom: 20px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .room-info {
        .room-id {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;

          .label {
            color: #666;
          }

          .id {
            font-size: 18px;
            font-weight: bold;
            color: #409eff;
            font-family: monospace;
          }
        }

        .role-info {
          color: #666;
        }
      }
    }

    .error-message {
      margin: 20px 0;
      padding: 10px;
      background: #fff2f0;
      border: 1px solid #ffccc7;
      border-radius: 4px;
      color: #ff4d4f;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .waiting {
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #666;

      .loading {
        font-size: 24px;
        margin-right: 8px;
        animation: rotating 2s linear infinite;
      }

      .tip {
        margin-top: 15px;
        font-size: 14px;
        color: #999;

        .highlight {
          color: #409eff;
          font-weight: bold;
          padding: 2px 4px;
          background: #ecf5ff;
          border-radius: 4px;
        }
      }
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
