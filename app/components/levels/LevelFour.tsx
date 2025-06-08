'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Lightbulb } from 'lucide-react'
import { useGame } from '../GameContext'

export default function LevelFour() {
  const { nextLevel, useHint, hints, loseLife } = useGame()
  const [userAnswers, setUserAnswers] = useState({ x: '', y: '' })
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Level 4: Complex nonlinear system
  // x² + 3y² = 39
  // 2x² - y² = 1
  // Solutions: (3, √10) ≈ (3, 3.16) and (-3, √10) ≈ (-3, 3.16), (3, -√10) ≈ (3, -3.16), (-3, -√10) ≈ (-3, -3.16)
  // We'll accept the positive solution: (3, √10)
  const solutions = [
    { x: 3, y: Math.sqrt(10) },
    { x: -3, y: Math.sqrt(10) },
    { x: 3, y: -Math.sqrt(10) },
    { x: -3, y: -Math.sqrt(10) }
  ]

  const checkAnswer = () => {
    const userX = parseFloat(userAnswers.x)
    const userY = parseFloat(userAnswers.y)
    
    if (isNaN(userX) || isNaN(userY)) {
      setFeedback('Please enter valid numbers for both variables.')
      return
    }

    setAttempts(prev => prev + 1)

    const tolerance = 0.05
    const isCorrect = solutions.some(solution => 
      Math.abs(userX - solution.x) < tolerance && Math.abs(userY - solution.y) < tolerance
    )

    if (isCorrect) {
      const baseScore = 2500
      const timeBonus = Math.max(0, 600 - attempts * 150)
      const finalScore = baseScore + timeBonus
      
      setFeedback(`🎉 Magnificent! The vault's secrets are yours!`)
      
      setTimeout(() => {
        nextLevel(finalScore)
      }, 2000)
    } else {
      if (attempts >= 3) {
        loseLife()
        setFeedback('❌ Too many incorrect attempts. You lost a life!')
      } else {
        setFeedback(`❌ The vault remains sealed. ${3 - attempts} attempts remaining.`)
      }
    }
  }

  const handleHint = () => {
    if (hints > 0) {
      setShowHint(true)
      useHint()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="puzzle-container mb-6">
        <div className="flex items-center mb-6">
          <Lock className="w-8 h-8 text-amber-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">The Master's Vault</h2>
            <p className="text-gray-400">Solve the nonlinear system to crack the ultimate combination</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-amber-300">The Master Lock</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-amber-500/30">
              <p className="text-gray-300 mb-4">
                The master's most precious treasures lie behind this vault door. 
                Two complex mathematical constraints guard the combination:
              </p>
              
              <div className="text-center space-y-3">
                <div className="text-xl font-mono bg-amber-900/30 p-3 rounded">
                  x² + 3y² = 39
                </div>
                <div className="text-xl font-mono bg-amber-900/30 p-3 rounded">
                  2x² - y² = 1
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                These equations intersect at four points. Find the positive solution to unlock the vault!
              </p>
              <p className="text-sm text-amber-300 mt-2">
                Hint: One solution has x = 3 (express y as decimal to 2 places)
              </p>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg"
              >
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-yellow-200 font-medium">Master's Secret:</p>
                    <p className="text-yellow-100 text-sm">
                      From 2x² - y² = 1, substitute y² = 2x² - 1 into x² + 3y² = 39.
                      This gives: x² + 3(2x² - 1) = 39. Expand and solve the quadratic!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Vault Combination</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Number (x):</label>
                  <input
                    type="number"
                    value={userAnswers.x}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, x: e.target.value }))}
                    className="math-input w-full"
                    placeholder="Enter x"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Second Number (y):</label>
                  <input
                    type="number"
                    value={userAnswers.y}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, y: e.target.value }))}
                    className="math-input w-full"
                    placeholder="Enter y"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={checkAnswer}
                  className="btn-primary flex-1"
                  disabled={!userAnswers.x || !userAnswers.y}
                >
                  Open the Vault
                </button>
                
                <button
                  onClick={handleHint}
                  className="btn-secondary"
                  disabled={hints === 0 || showHint}
                >
                  Master's Hint ({hints})
                </button>
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg ${
                    feedback.includes('🎉') 
                      ? 'bg-green-900/30 border border-green-500/50 text-green-200'
                      : 'bg-red-900/30 border border-red-500/50 text-red-200'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}

              {/* Verification */}
              {userAnswers.x && userAnswers.y && (
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Verification:</p>
                  <div className="space-y-1 text-sm font-mono">
                    <div>x² + 3y² = {Math.pow(parseFloat(userAnswers.x || '0'), 2) + 3 * Math.pow(parseFloat(userAnswers.y || '0'), 2)} (should be 39)</div>
                    <div>2x² - y² = {2 * Math.pow(parseFloat(userAnswers.x || '0'), 2) - Math.pow(parseFloat(userAnswers.y || '0'), 2)} (should be 1)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 