export type PieceType = 'king' | 'advisor' | 'elephant' | 'horse' | 'chariot' | 'cannon' | 'pawn'
export type PieceColor = 'red' | 'black'

export interface Position {
  x: number
  y: number
}

export interface ChessPiece {
  id: string
  type: PieceType
  color: PieceColor
  name: string
  position: Position
}

export interface Move {
  piece: ChessPiece
  from: Position
  to: Position
  captured?: ChessPiece
}

export interface AIMove {
  piece: ChessPiece
  to: Position
} 