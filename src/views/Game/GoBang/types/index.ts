export type Player = 'black' | 'white'
export type Cell = Player | null

export interface Position {
  x: number
  y: number
}

export interface GameState {
  board: Cell[][]
  currentPlayer: Player
  gameStarted: boolean
  winner: Player | null
  lastMove: Position | null
}

export interface GameMove {
  position: Position
  player: Player
}

export interface RoomInfo {
  id: string
  players: {
    black?: string
    white?: string
  }
  state: GameState
} 