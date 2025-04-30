import { ref, computed } from 'vue'
import type { Player, Cell, Position, GameState, GameMove } from '../types'
import type { DataConnection } from 'peerjs'
import Peer from 'peerjs'

const BOARD_SIZE = 15
const WIN_COUNT = 5
const MAX_RECONNECT_ATTEMPTS = 3

export function useGoBang(peerId: string | null, playerColor: Player) {
  // 初始化游戏状态
  const board = ref<Cell[][]>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)))
  const currentPlayer = ref<Player>('black')
  const gameStarted = ref(false)
  const winner = ref<Player | null>(null)
  const isConnected = ref(false)
  const peer = ref<Peer | null>(null)
  const connection = ref<DataConnection | null>(null)
  const connectionError = ref<string>('')
  const reconnectAttempts = ref(0)

  const gameStatus = computed(() => {
    if (connectionError.value) return `连接错误: ${connectionError.value}`
    if (!isConnected.value) return '等待对手连接...'
    if (!gameStarted.value) return '等待开始游戏'
    if (winner.value) return `游戏结束，${winner.value === 'black' ? '黑方' : '白方'}胜利！`
    return `当前回合：${currentPlayer.value === 'black' ? '黑方' : '白方'}`
  })

  // 判断是否是当前玩家的回合
  const isCurrentPlayer = computed(() => currentPlayer.value === playerColor)

  // 创建 Peer 实例
  const createPeer = (id?: string) => {
    // 如果没有提供ID，生成一个随机ID
    const peerId = id || Math.random().toString(36).substr(2, 9)
    
    const peerOptions = {
      host: 'localhost',
      port: 9000,
      path: '/myapp',
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' }
        ]
      }
    }

    return new Promise<Peer>((resolve, reject) => {
      try {
        console.log('Creating peer with ID:', peerId)
        const newPeer = new Peer(peerId, peerOptions)

        const timeoutId = setTimeout(() => {
          console.log('Peer creation timed out')
          newPeer.destroy()
          reject(new Error('创建连接超时'))
        }, 15000) // 增加到15秒

        newPeer.on('open', () => {
          console.log('Peer created successfully:', newPeer.id)
          clearTimeout(timeoutId)
          resolve(newPeer)
        })

        newPeer.on('error', (err) => {
          console.error('Peer creation error:', err)
          clearTimeout(timeoutId)
          reject(err)
        })

        // 添加连接事件监听
        newPeer.on('connection', (conn) => {
          console.log('Received connection from:', conn.peer)
          handleConnection(conn)
        })

      } catch (err) {
        console.error('Failed to create peer:', err)
        reject(err)
      }
    })
  }

  // 初始化 P2P 连接
  const initPeer = async () => {
    try {
      // 清理现有连接
      cleanup()

      // 创建新的 Peer 实例
      const newPeer = await createPeer(peerId || undefined)
      peer.value = newPeer
      console.log('Peer created:', newPeer.id)

      // 设置事件监听
      newPeer.on('connection', (conn) => {
        console.log('Received connection from:', conn.peer)
        handleConnection(conn)
      })
      
      newPeer.on('disconnected', () => {
        console.log('Peer disconnected. Attempting to reconnect...')
        isConnected.value = false
        attemptReconnect()
      })

      newPeer.on('close', () => {
        console.log('Peer connection closed')
        isConnected.value = false
        connectionError.value = '连接已关闭'
      })

      newPeer.on('error', (err) => {
        console.error('Peer error:', err)
        handlePeerError(err)
      })

    } catch (err) {
      console.error('Failed to initialize peer:', err)
      handlePeerError(err)
    }
  }

  // 处理 Peer 错误
  const handlePeerError = (err: any) => {
    if (err.type === 'unavailable-id') {
      connectionError.value = '该ID已被占用，请重试'
      attemptReconnect()
    } else if (err.type === 'peer-unavailable') {
      connectionError.value = '找不到对手，请确认ID是否正确'
    } else if (err.type === 'network') {
      connectionError.value = '网络连接错误，正在重试...'
      attemptReconnect()
    } else if (err.type === 'disconnected') {
      connectionError.value = '连接断开，正在重试...'
      attemptReconnect()
    } else {
      connectionError.value = `连接错误: ${err.message}`
    }
  }

  // 尝试重新连接
  const attemptReconnect = async () => {
    if (reconnectAttempts.value >= MAX_RECONNECT_ATTEMPTS) {
      connectionError.value = '重连失败，请手动重试'
      return
    }

    reconnectAttempts.value++
    console.log(`Attempting to reconnect (${reconnectAttempts.value}/${MAX_RECONNECT_ATTEMPTS})...`)

    try {
      await initPeer()
      reconnectAttempts.value = 0
      connectionError.value = ''
    } catch (err) {
      console.error('Reconnection failed:', err)
      if (reconnectAttempts.value < MAX_RECONNECT_ATTEMPTS) {
        setTimeout(attemptReconnect, 2000) // 2秒后重试
      }
    }
  }

  // 连接到对手
  const connectToPeer = async (targetPeerId: string) => {
    if (!peer.value) {
      console.log('No peer instance, initializing...')
      await initPeer()
    }

    try {
      if (connection.value) {
        console.log('Closing existing connection')
        connection.value.close()
      }

      console.log('Connecting to peer:', targetPeerId)
      const conn = peer.value!.connect(targetPeerId, {
        reliable: true,
        serialization: 'json',
        metadata: { playerColor }
      })

      // 设置连接超时
      const timeoutId = setTimeout(() => {
        console.log('Connection attempt timed out')
        conn.close()
        connectionError.value = '连接超时，请重试'
        // 重新尝试连接
        retryConnection(targetPeerId)
      }, 15000) // 增加到15秒

      conn.on('open', () => {
        console.log('Connection opened successfully')
        clearTimeout(timeoutId)
        handleConnection(conn)
      })

      // 添加错误处理
      conn.on('error', (err) => {
        console.error('Connection error:', err)
        clearTimeout(timeoutId)
        connectionError.value = `连接错误: ${err.message}`
        // 重新尝试连接
        retryConnection(targetPeerId)
      })

    } catch (err) {
      console.error('Failed to connect to peer:', err)
      connectionError.value = err instanceof Error ? err.message : '连接失败'
      // 重新尝试连接
      retryConnection(targetPeerId)
    }
  }

  // 重试连接
  const retryConnection = (targetPeerId: string) => {
    console.log('Retrying connection...')
    if (reconnectAttempts.value < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts.value++
      console.log(`Retry attempt ${reconnectAttempts.value}/${MAX_RECONNECT_ATTEMPTS}`)
      setTimeout(() => {
        connectToPeer(targetPeerId)
      }, 2000) // 2秒后重试
    } else {
      console.log('Max retry attempts reached')
      connectionError.value = '连接失败，请刷新页面重试'
    }
  }

  // 处理连接
  const handleConnection = (conn: DataConnection) => {
    console.log('Handling connection:', conn.peer)
    connection.value = conn
    
    conn.on('open', () => {
      console.log('Connection opened with:', conn.peer)
      isConnected.value = true
      connectionError.value = ''
      reconnectAttempts.value = 0

      // 发送连接确认消息
      sendMessage({
        type: 'CONNECTION_CONFIRMED',
        payload: {
          playerColor
        }
      })
    })

    conn.on('data', (data: any) => {
      console.log('Received data:', data)
      handleMessage(data)
    })

    conn.on('close', () => {
      console.log('Connection closed with:', conn.peer)
      isConnected.value = false
      gameStarted.value = false
      connectionError.value = '对手已断开连接'
      attemptReconnect()
    })

    conn.on('error', (err) => {
      console.error('Connection error:', err)
      connectionError.value = '连接错误，正在重试...'
      attemptReconnect()
    })
  }

  // 发送消息
  const sendMessage = (message: any) => {
    if (!connection.value || !connection.value.open) {
      console.error('No active connection')
      connectionError.value = '连接已断开，正在重试...'
      attemptReconnect()
      return
    }

    try {
      connection.value.send(message)
    } catch (err) {
      console.error('Failed to send message:', err)
      connectionError.value = '消息发送失败，正在重试...'
      attemptReconnect()
    }
  }

  // 处理接收到的消息
  const handleMessage = (message: any) => {
    console.log('Handling message:', message)
    switch (message.type) {
      case 'CONNECTION_CONFIRMED':
        console.log('Connection confirmed with:', message.payload.playerColor)
        isConnected.value = true
        // 如果是房主，收到加入者的确认后，发送游戏状态
        break
      case 'GAME_STATE':
        console.log('Updating game state:', message.payload)
        updateGameState(message.payload)
        break
      case 'REQUEST_STATE':
        if (playerColor === 'black') {
          console.log('Received state request, sending current state')
          const gameState: GameState = {
            board: board.value,
            currentPlayer: currentPlayer.value,
            gameStarted: gameStarted.value,
            winner: winner.value,
            lastMove: null
          }
          sendMessage({
            type: 'GAME_STATE',
            payload: gameState
          })
        }
        break
      case 'MOVE':
        console.log('Handling move:', message.payload)
        handleMove(message.payload)
        break
      case 'START_GAME':
        console.log('Starting game')
        gameStarted.value = true
        currentPlayer.value = 'black' // 重置当前玩家为黑方
        board.value = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)) // 重置棋盘
        winner.value = null
        break
      case 'SURRENDER':
        console.log('Handling surrender:', message.payload)
        handleGameOver(message.payload.player === 'black' ? 'white' : 'black')
        break
    }
  }

  // 更新游戏状态
  const updateGameState = (state: GameState) => {
    board.value = state.board
    currentPlayer.value = state.currentPlayer
    gameStarted.value = state.gameStarted
    winner.value = state.winner
  }

  // 检查是否获胜
  const checkWin = (pos: Position, player: Player): boolean => {
    const directions = [
      [1, 0],   // 水平
      [0, 1],   // 垂直
      [1, 1],   // 对角线
      [1, -1],  // 反对角线
    ]

    return directions.some(([dx, dy]) => {
      let count = 1
      // 正向检查
      for (let i = 1; i < WIN_COUNT; i++) {
        const x = pos.x + dx * i
        const y = pos.y + dy * i
        if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) break
        if (board.value[y][x] !== player) break
        count++
      }
      // 反向检查
      for (let i = 1; i < WIN_COUNT; i++) {
        const x = pos.x - dx * i
        const y = pos.y - dy * i
        if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) break
        if (board.value[y][x] !== player) break
        count++
      }
      return count >= WIN_COUNT
    })
  }

  // 处理移动
  const handleMove = (move: GameMove) => {
    const { position, player } = move
    board.value[position.y][position.x] = player
    
    if (checkWin(position, player)) {
      winner.value = player
      gameStarted.value = false
    } else {
      currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'
    }
  }

  // 处理游戏结束
  const handleGameOver = (winningPlayer: Player | null) => {
    winner.value = winningPlayer
    gameStarted.value = false
  }

  // 初始化游戏
  const initGame = () => {
    board.value = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
    currentPlayer.value = 'black'
    winner.value = null
    initPeer()
  }

  // 开始游戏
  const startGame = () => {
    if (!isConnected.value) {
      console.log('Cannot start game: not connected')
      return
    }

    console.log('Starting game as:', playerColor)
    gameStarted.value = true
    currentPlayer.value = 'black' // 重置当前玩家为黑方
    board.value = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)) // 重置棋盘
    winner.value = null

    // 通知对手游戏开始
    sendMessage({ 
      type: 'START_GAME'
    })
  }

  // 下棋
  const makeMove = (position: Position) => {
    // 检查是否可以下棋
    if (
      !gameStarted.value ||
      winner.value ||
      currentPlayer.value !== playerColor ||
      board.value[position.y][position.x] !== null
    ) {
      console.log('Invalid move:', {
        gameStarted: gameStarted.value,
        winner: winner.value,
        currentPlayer: currentPlayer.value,
        playerColor,
        position
      })
      return
    }

    const move: GameMove = {
      position,
      player: playerColor
    }

    // 先在本地更新棋盘
    handleMove(move)

    // 发送移动信息给对手
    sendMessage({
      type: 'MOVE',
      payload: move
    })
  }

  // 认输
  const surrender = () => {
    if (gameStarted.value && !winner.value) {
      sendMessage({
        type: 'SURRENDER',
        payload: {
          player: playerColor
        }
      })
      handleGameOver(playerColor === 'black' ? 'white' : 'black')
    }
  }

  // 清理连接
  const cleanup = () => {
    if (connection.value) {
      connection.value.close()
      connection.value = null
    }
    if (peer.value) {
      peer.value.destroy()
      peer.value = null
    }
    isConnected.value = false
    connectionError.value = ''
    reconnectAttempts.value = 0
  }

  return {
    board,
    currentPlayer,
    gameStarted,
    winner,
    gameStatus,
    isCurrentPlayer,
    isConnected,
    connectionError,
    peer,
    initGame,
    startGame,
    makeMove,
    surrender,
    cleanup,
    connectToPeer
  }
} 