'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Clock, Target, RefreshCw } from 'lucide-react'
import { useGame } from './GameContext'

export default function GameComplete() {
  const { totalScore, timeElapsed, levelScores, resetGame } = useGame()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreRating = (score: number) => {
    if (score >= 10000) return { rating: 'LEGENDARY', color: 'text-yellow-400', stars: 5 }
    if (score >= 8000) return { rating: 'MASTER', color: 'text-purple-400', stars: 4 }
    if (score >= 6000) return { rating: 'EXPERT', color: 'text-blue-400', stars: 3 }
    if (score >= 4000) return { rating: 'SKILLED', color: 'text-green-400', stars: 2 }
    return { rating: 'NOVICE', color: 'text-gray-400', stars: 1 }
  }

  const { rating, color, stars } = getScoreRating(totalScore)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <Trophy className="w-32 h-32 mx-auto text-yellow-400 filter drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
        >
          ESCAPE COMPLETED!
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className={`text-2xl font-bold ${color} mb-2`}>
            {rating} MATHEMATICIAN
          </div>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < stars ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="puzzle-container">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-yellow-400 mb-1">{totalScore.toLocaleString()}</h3>
            <p className="text-gray-400">Total Score</p>
          </div>

          <div className="puzzle-container">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-blue-400 mb-1">{formatTime(timeElapsed)}</h3>
            <p className="text-gray-400">Total Time</p>
          </div>

          <div className="puzzle-container">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-400 mb-1">5/5</h3>
            <p className="text-gray-400">Levels Completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Level Breakdown</h3>
          <div className="grid grid-cols-5 gap-4">
            {levelScores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="puzzle-container"
              >
                <div className="text-lg font-bold text-blue-400">Level {index + 1}</div>
                <div className="text-xl font-mono text-green-400">{score}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="space-y-4"
        >
          <p className="text-xl text-gray-300 mb-6">
            Congratulations! You have successfully navigated through all mathematical challenges 
            and proven yourself as a master problem solver. Your analytical skills and 
            persistence have unlocked the secrets of the Digital Escape Room!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Play Again</span>
            </button>

            <button
              onClick={() => window.location.href = 'https://github.com'}
              className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <Star className="w-5 h-5" />
              <span>Share Your Success</span>
            </button>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/30">
            <h4 className="text-purple-300 font-semibold mb-2">Achievement Unlocked!</h4>
            <p className="text-purple-100">
              🏆 <strong>Mathematical Master</strong> - Completed all 5 levels of the Digital Escape Room
            </p>
            <p className="text-purple-200 text-sm mt-2">
              You've demonstrated mastery of linear systems, inequalities, nonlinear equations, and matrix algebra!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 