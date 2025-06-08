'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface GameState {
  currentLevel: number
  timeElapsed: number
  isGameComplete: boolean
  totalScore: number
  gameStarted: boolean
  hints: number
  lives: number
  levelScores: number[]
  startGame: () => void
  nextLevel: (score: number) => void
  useHint: () => void
  loseLife: () => void
  resetGame: () => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [hints, setHints] = useState(3)
  const [lives, setLives] = useState(3)
  const [levelScores, setLevelScores] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !isGameComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval!)
  }, [gameStarted, isGameComplete])

  const startGame = () => {
    setGameStarted(true)
    setTimeElapsed(0)
    setCurrentLevel(1)
    setTotalScore(0)
    setHints(3)
    setLives(3)
    setLevelScores([])
    setIsGameComplete(false)
  }

  const nextLevel = (score: number) => {
    const newLevelScores = [...levelScores, score]
    setLevelScores(newLevelScores)
    setTotalScore(prev => prev + score)
    
    if (currentLevel >= 5) {
      setIsGameComplete(true)
    } else {
      setCurrentLevel(prev => prev + 1)
      // Bonus hint every 2 levels
      if (currentLevel % 2 === 0) {
        setHints(prev => prev + 1)
      }
    }
  }

  const useHint = () => {
    if (hints > 0) {
      setHints(prev => prev - 1)
    }
  }

  const loseLife = () => {
    if (lives > 1) {
      setLives(prev => prev - 1)
    } else {
      // Game over logic
      setGameStarted(false)
      setCurrentLevel(1)
      setTimeElapsed(0)
      setTotalScore(0)
      setHints(3)
      setLives(3)
      setIsGameComplete(false)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentLevel(1)
    setTimeElapsed(0)
    setTotalScore(0)
    setHints(3)
    setLives(3)
    setLevelScores([])
    setIsGameComplete(false)
  }

  const value: GameState = {
    currentLevel,
    timeElapsed,
    isGameComplete,
    totalScore,
    gameStarted,
    hints,
    lives,
    levelScores,
    startGame,
    nextLevel,
    useHint,
    loseLife,
    resetGame
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
} 