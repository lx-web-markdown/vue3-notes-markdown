import type { ChessPiece, Position, Move, AIMove } from '../types'
import { getPossibleMoves, makeMove, evaluatePosition } from './gameLogic'

// 极小化极大算法
function minimax(
  pieces: ChessPiece[],
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0) {
    return evaluatePosition(pieces)
  }

  const allPieces = pieces.filter(p => p.color === (isMaximizing ? 'black' : 'red'))
  
  if (isMaximizing) {
    let maxEval = -Infinity
    for (const piece of allPieces) {
      const moves = getPossibleMoves(pieces, piece)
      for (const move of moves) {
        // 模拟移动
        const originalPosition = { ...piece.position }
        const capturedPiece = makeMove(pieces, piece, move)
        
        const evalScore = minimax(pieces, depth - 1, alpha, beta, false)
        
        // 撤销移动
        piece.position = originalPosition
        if (capturedPiece?.captured) {
          pieces.push(capturedPiece.captured)
        }
        
        maxEval = Math.max(maxEval, evalScore)
        alpha = Math.max(alpha, evalScore)
        if (beta <= alpha) {
          break
        }
      }
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (const piece of allPieces) {
      const moves = getPossibleMoves(pieces, piece)
      for (const move of moves) {
        // 模拟移动
        const originalPosition = { ...piece.position }
        const capturedPiece = makeMove(pieces, piece, move)
        
        const evalScore = minimax(pieces, depth - 1, alpha, beta, true)
        
        // 撤销移动
        piece.position = originalPosition
        if (capturedPiece?.captured) {
          pieces.push(capturedPiece.captured)
        }
        
        minEval = Math.min(minEval, evalScore)
        beta = Math.min(beta, evalScore)
        if (beta <= alpha) {
          break
        }
      }
    }
    return minEval
  }
}

// 获取 AI 的最佳移动
export async function getAIMove(pieces: ChessPiece[], depth: number): Promise<AIMove | null> {
  let bestMove: AIMove | null = null
  let bestScore = -Infinity
  
  const blackPieces = pieces.filter(p => p.color === 'black')
  
  for (const piece of blackPieces) {
    const moves = getPossibleMoves(pieces, piece)
    for (const move of moves) {
      // 模拟移动
      const originalPosition = { ...piece.position }
      const capturedPiece = makeMove(pieces, piece, move)
      
      const score = minimax(pieces, depth - 1, -Infinity, Infinity, false)
      
      // 撤销移动
      piece.position = originalPosition
      if (capturedPiece?.captured) {
        pieces.push(capturedPiece.captured)
      }
      
      if (score > bestScore) {
        bestScore = score
        bestMove = {
          piece,
          to: move
        }
      }
    }
  }
  
  return bestMove
}

// 添加随机性以调整难度
function addRandomness(score: number, difficulty: 'easy' | 'medium' | 'hard'): number {
  const randomFactor = {
    easy: 0.3,
    medium: 0.15,
    hard: 0.05
  }[difficulty]
  
  return score * (1 + (Math.random() * 2 - 1) * randomFactor)
} 