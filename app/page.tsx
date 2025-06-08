'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Key, Brain, Clock, Trophy, AlertCircle } from 'lucide-react'
import { GameProvider, useGame } from './components/GameContext'
import LevelOne from './components/levels/LevelOne'
import LevelTwo from './components/levels/LevelTwo'
import LevelThree from './components/levels/LevelThree'
import LevelFour from './components/levels/LevelFour'
import LevelFive from './components/levels/LevelFive'
import GameComplete from './components/GameComplete'

function EscapeRoomGame() {
  const {
    currentLevel,
    timeElapsed,
    isGameComplete,
    totalScore,
    gameStarted,
    startGame,
    hints,
    lives
  } = useGame()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const levels = [
    { id: 1, component: LevelOne, title: "The Laboratory", difficulty: "Easy" },
    { id: 2, component: LevelTwo, title: "The Library", difficulty: "Medium" },
    { id: 3, component: LevelThree, title: "The Observatory", difficulty: "Hard" },
    { id: 4, component: LevelFour, title: "The Vault", difficulty: "Expert" },
    { id: 5, component: LevelFive, title: "The Final Chamber", difficulty: "Master" }
  ]

  const CurrentLevelComponent = levels.find(l => l.id === currentLevel)?.component || LevelOne

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Lock className="w-24 h-24 mx-auto text-blue-400" />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Digital Escape Room
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Welcome to the ultimate mathematical challenge! Solve complex systems of equations 
            and inequalities to escape each room. lol good luck!!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="puzzle-container">
              <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">5 Complex Levels</h3>
              <p className="text-sm text-gray-400">Each more challenging than the last</p>
            </div>
            
            <div className="puzzle-container">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Race Against Time</h3>
              <p className="text-sm text-gray-400">Speed bonuses for quick solutions</p>
            </div>
            
            <div className="puzzle-container">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Score & Compete</h3>
              <p className="text-sm text-gray-400">Earn points for accuracy and speed</p>
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="btn-primary text-lg px-8 py-4 animate-glow"
          >
            Begin Your Escape
          </button>
        </motion.div>
      </div>
    )
  }

  if (isGameComplete) {
    return <GameComplete />
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="level-badge bg-blue-600 text-white">
              Level {currentLevel}/5
            </div>
            <h2 className="text-xl font-semibold">
              {levels.find(l => l.id === currentLevel)?.title}
            </h2>
            <span className="text-sm text-gray-400">
              ({levels.find(l => l.id === currentLevel)?.difficulty})
            </span>
          </div>
          
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-mono">{totalScore}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>Lives: {lives}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-green-400" />
              <span>Hints: {hints}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentLevelComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <EscapeRoomGame />
    </GameProvider>
  )
} 