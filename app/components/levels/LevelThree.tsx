'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Orbit, Lightbulb } from 'lucide-react'
import { useGame } from '../GameContext'

export default function LevelThree() {
  const { nextLevel, useHint, hints, loseLife } = useGame()
  const [userAnswers, setUserAnswers] = useState({ x: '', y: '' })
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Level 3: Complex system of nonlinear inequalities
  // x² + 2y² ≤ 18
  // 3x - 4y ≥ -12
  // x + y ≤ 4
  // x ≥ 0, y ≥ 0 
  // Find intersection point where all constraints are satisfied as equalities (feasible boundary)
  // Solving x + y = 4 and 3x - 4y = -12 gives x = 16/7, y = 12/7
  // Check: (16/7)² + 2(12/7)² = 256/49 + 288/49 = 544/49 ≈ 11.1 < 18 ✓
  const correctAnswers = { x: 16/7, y: 12/7 }

  const checkAnswer = () => {
    const userX = parseFloat(userAnswers.x)
    const userY = parseFloat(userAnswers.y)
    
    if (isNaN(userX) || isNaN(userY)) {
      setFeedback('Please enter valid numbers for both variables.')
      return
    }

    setAttempts(prev => prev + 1)

    // Allow small tolerance for floating point answers
    const tolerance = 0.02
    const xCorrect = Math.abs(userX - correctAnswers.x) < tolerance
    const yCorrect = Math.abs(userY - correctAnswers.y) < tolerance

    if (xCorrect && yCorrect) {
      const baseScore = 2000
      const timeBonus = Math.max(0, 500 - attempts * 100)
      const finalScore = baseScore + timeBonus
      
      setFeedback(`🎉 Stellar! You've navigated the cosmic inequalities!`)
      
      setTimeout(() => {
        nextLevel(finalScore)
      }, 2000)
    } else {
      if (attempts >= 3) {
        loseLife()
        setFeedback('❌ Too many incorrect attempts. You lost a life!')
      } else {
        setFeedback(`❌ The stars refuse to align. ${3 - attempts} attempts remaining.`)
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
          <Orbit className="w-8 h-8 text-indigo-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">The Stellar Observatory</h2>
            <p className="text-gray-400">Navigate the system of inequalities to align the cosmic telescope</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">The Celestial Constraints</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-indigo-500/30">
              <p className="text-gray-300 mb-4">
                The ancient star map shows three celestial constraints that must be satisfied simultaneously. 
                You need to find the critical boundary point where all constraints intersect:
              </p>
              
              <div className="text-center space-y-3">
                <div className="text-xl font-mono bg-indigo-900/30 p-3 rounded">
                  x² + 2y² ≤ 18
                </div>
                <div className="text-xl font-mono bg-indigo-900/30 p-3 rounded">
                  3x - 4y ≥ -12
                </div>
                <div className="text-xl font-mono bg-indigo-900/30 p-3 rounded">
                  x + y ≤ 4
                </div>
                <div className="text-sm text-indigo-300 mt-2">
                  Also: x ≥ 0, y ≥ 0 (first quadrant only)
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                Find the intersection point where x + y = 4 AND 3x - 4y = -12
              </p>
              <p className="text-sm text-indigo-300 mt-2">
                (Express as decimals, e.g., 3.33 for 10/3)
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
                    <p className="text-yellow-200 font-medium">Cosmic Wisdom:</p>
                    <p className="text-yellow-100 text-sm">
                      Solve the linear system: x + y = 4 and 3x - 4y = -12. 
                      From first equation: y = 4 - x. Substitute: 3x - 4(4-x) = -12, so 7x = 4
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Stellar Coordinates</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">x-coordinate:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={userAnswers.x}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, x: e.target.value }))}
                    className="math-input w-full"
                    placeholder="Enter x value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">y-coordinate:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={userAnswers.y}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, y: e.target.value }))}
                    className="math-input w-full"
                    placeholder="Enter y value"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={checkAnswer}
                  className="btn-primary flex-1"
                  disabled={!userAnswers.x || !userAnswers.y}
                >
                  Align the Stars
                </button>
                
                <button
                  onClick={handleHint}
                  className="btn-secondary"
                  disabled={hints === 0 || showHint}
                >
                  Cosmic Hint ({hints})
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
                  <p className="text-sm text-gray-400 mb-2">Constraint Check:</p>
                  <div className="space-y-1 text-sm font-mono">
                    <div>x² + 2y² = {parseFloat(userAnswers.x || '0') ** 2 + 2 * parseFloat(userAnswers.y || '0') ** 2} (should be ≤ 18)</div>
                    <div>3x - 4y = {3 * parseFloat(userAnswers.x || '0') - 4 * parseFloat(userAnswers.y || '0')} (should be ≥ -12)</div>
                    <div>x + y = {parseFloat(userAnswers.x || '0') + parseFloat(userAnswers.y || '0')} (should be ≤ 4)</div>
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