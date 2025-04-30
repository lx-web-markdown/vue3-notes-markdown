import type { ChessPiece, Position, PieceType, PieceColor, Move } from './types'

// 初始化棋盘
export function initializeBoard(): ChessPiece[] {
  const pieces: ChessPiece[] = []
  
  // 初始化红方棋子
  const redPieces: [PieceType, string, number, number][] = [
    ['chariot', '车', 0, 9],
    ['horse', '马', 1, 9],
    ['elephant', '相', 2, 9],
    ['advisor', '仕', 3, 9],
    ['king', '帅', 4, 9],
    ['advisor', '仕', 5, 9],
    ['elephant', '相', 6, 9],
    ['horse', '马', 7, 9],
    ['chariot', '车', 8, 9],
    ['cannon', '炮', 1, 7],
    ['cannon', '炮', 7, 7],
    ['pawn', '兵', 0, 6],
    ['pawn', '兵', 2, 6],
    ['pawn', '兵', 4, 6],
    ['pawn', '兵', 6, 6],
    ['pawn', '兵', 8, 6],
  ]
  
  // 初始化黑方棋子
  const blackPieces: [PieceType, string, number, number][] = [
    ['chariot', '車', 0, 0],
    ['horse', '馬', 1, 0],
    ['elephant', '象', 2, 0],
    ['advisor', '士', 3, 0],
    ['king', '将', 4, 0],
    ['advisor', '士', 5, 0],
    ['elephant', '象', 6, 0],
    ['horse', '馬', 7, 0],
    ['chariot', '車', 8, 0],
    ['cannon', '砲', 1, 2],
    ['cannon', '砲', 7, 2],
    ['pawn', '卒', 0, 3],
    ['pawn', '卒', 2, 3],
    ['pawn', '卒', 4, 3],
    ['pawn', '卒', 6, 3],
    ['pawn', '卒', 8, 3],
  ]
  
  // 添加红方棋子
  redPieces.forEach(([type, name, x, y], index) => {
    pieces.push({
      id: `red-${type}-${index}`,
      type,
      color: 'red',
      name,
      position: { x, y }
    })
  })
  
  // 添加黑方棋子
  blackPieces.forEach(([type, name, x, y], index) => {
    pieces.push({
      id: `black-${type}-${index}`,
      type,
      color: 'black',
      name,
      position: { x, y }
    })
  })
  
  return pieces
}

// 获取棋子在指定位置的函数
export function getPieceAt(pieces: ChessPiece[], position: Position): ChessPiece | undefined {
  return pieces.find(p => p.position.x === position.x && p.position.y === position.y)
}

// 判断位置是否在棋盘内
export function isInBoard(position: Position): boolean {
  return position.x >= 0 && position.x <= 8 && position.y >= 0 && position.y <= 9
}

// 判断是否在九宫格内
export function isInPalace(position: Position, color: PieceColor): boolean {
  const x = position.x
  const y = position.y
  if (color === 'red') {
    return x >= 3 && x <= 5 && y >= 7 && y <= 9
  } else {
    return x >= 3 && x <= 5 && y >= 0 && y <= 2
  }
}

// 获取所有可能的移动位置
export function getPossibleMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  
  switch (piece.type) {
    case 'king':
      moves.push(...getKingMoves(pieces, piece))
      break
    case 'advisor':
      moves.push(...getAdvisorMoves(pieces, piece))
      break
    case 'elephant':
      moves.push(...getElephantMoves(pieces, piece))
      break
    case 'horse':
      moves.push(...getHorseMoves(pieces, piece))
      break
    case 'chariot':
      moves.push(...getChariotMoves(pieces, piece))
      break
    case 'cannon':
      moves.push(...getCannonMoves(pieces, piece))
      break
    case 'pawn':
      moves.push(...getPawnMoves(pieces, piece))
      break
  }
  
  return moves.filter(pos => {
    const targetPiece = getPieceAt(pieces, pos)
    return !targetPiece || targetPiece.color !== piece.color
  })
}

// 将/帅的移动规则
function getKingMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  
  for (const [dx, dy] of directions) {
    const newPos = {
      x: piece.position.x + dx,
      y: piece.position.y + dy
    }
    if (isInPalace(newPos, piece.color) && isInBoard(newPos)) {
      moves.push(newPos)
    }
  }
  
  return moves
}

// 士/仕的移动规则
function getAdvisorMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
  
  for (const [dx, dy] of directions) {
    const newPos = {
      x: piece.position.x + dx,
      y: piece.position.y + dy
    }
    if (isInPalace(newPos, piece.color) && isInBoard(newPos)) {
      moves.push(newPos)
    }
  }
  
  return moves
}

// 象/相的移动规则
function getElephantMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [[2, 2], [2, -2], [-2, 2], [-2, -2]]
  
  for (const [dx, dy] of directions) {
    const newPos = {
      x: piece.position.x + dx,
      y: piece.position.y + dy
    }
    const blockPos = {
      x: piece.position.x + dx / 2,
      y: piece.position.y + dy / 2
    }
    
    if (isInBoard(newPos) && 
        (piece.color === 'red' ? newPos.y >= 5 : newPos.y <= 4) && 
        !getPieceAt(pieces, blockPos)) {
      moves.push(newPos)
    }
  }
  
  return moves
}

// 马的移动规则
function getHorseMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2]
  ]
  
  for (const [dx, dy] of directions) {
    const newPos = {
      x: piece.position.x + dx,
      y: piece.position.y + dy
    }
    const blockPos = {
      x: piece.position.x + (Math.abs(dx) === 2 ? dx / 2 : 0),
      y: piece.position.y + (Math.abs(dy) === 2 ? dy / 2 : 0)
    }
    
    if (isInBoard(newPos) && !getPieceAt(pieces, blockPos)) {
      moves.push(newPos)
    }
  }
  
  return moves
}

// 车的移动规则
function getChariotMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  
  for (const [dx, dy] of directions) {
    let step = 1
    while (true) {
      const newPos = {
        x: piece.position.x + dx * step,
        y: piece.position.y + dy * step
      }
      
      if (!isInBoard(newPos)) break
      
      const targetPiece = getPieceAt(pieces, newPos)
      if (!targetPiece) {
        moves.push(newPos)
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push(newPos)
        }
        break
      }
      
      step++
    }
  }
  
  return moves
}

// 炮的移动规则
function getCannonMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  
  for (const [dx, dy] of directions) {
    let step = 1
    let hasPlattform = false
    
    while (true) {
      const newPos = {
        x: piece.position.x + dx * step,
        y: piece.position.y + dy * step
      }
      
      if (!isInBoard(newPos)) break
      
      const targetPiece = getPieceAt(pieces, newPos)
      if (!hasPlattform) {
        if (!targetPiece) {
          moves.push(newPos)
        } else {
          hasPlattform = true
        }
      } else {
        if (targetPiece) {
          if (targetPiece.color !== piece.color) {
            moves.push(newPos)
          }
          break
        }
      }
      
      step++
    }
  }
  
  return moves
}

// 兵/卒的移动规则
function getPawnMoves(pieces: ChessPiece[], piece: ChessPiece): Position[] {
  const moves: Position[] = []
  
  const forward = piece.color === 'red' ? -1 : 1
  const crossedRiver = piece.color === 'red' ? piece.position.y <= 4 : piece.position.y >= 5
  
  // 向前移动
  const forwardPos = {
    x: piece.position.x,
    y: piece.position.y + forward
  }
  if (isInBoard(forwardPos)) {
    moves.push(forwardPos)
  }
  
  // 过河后可以左右移动
  if (crossedRiver) {
    const sideDirections = [-1, 1]
    for (const dx of sideDirections) {
      const sidePos = {
        x: piece.position.x + dx,
        y: piece.position.y
      }
      if (isInBoard(sidePos)) {
        moves.push(sidePos)
      }
    }
  }
  
  return moves
}

// 移动棋子
export function makeMove(pieces: ChessPiece[], piece: ChessPiece, to: Position): Move | null {
  const possibleMoves = getPossibleMoves(pieces, piece)
  if (!possibleMoves.some(pos => pos.x === to.x && pos.y === to.y)) {
    return null
  }
  
  const move: Move = {
    piece,
    from: { ...piece.position },
    to: { ...to }
  }
  
  const capturedPiece = getPieceAt(pieces, to)
  if (capturedPiece) {
    move.captured = capturedPiece
    const index = pieces.findIndex(p => p.id === capturedPiece.id)
    pieces.splice(index, 1)
  }
  
  piece.position = { ...to }
  return move
}

// 评估局面分数
export function evaluatePosition(pieces: ChessPiece[]): number {
  const pieceValues: Record<PieceType, number> = {
    king: 10000,
    advisor: 20,
    elephant: 20,
    horse: 40,
    chariot: 90,
    cannon: 45,
    pawn: 10
  }
  
  return pieces.reduce((score, piece) => {
    const value = pieceValues[piece.type]
    return score + (piece.color === 'red' ? value : -value)
  }, 0)
} 