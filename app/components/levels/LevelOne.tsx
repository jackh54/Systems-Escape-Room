'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Lightbulb, Calculator } from 'lucide-react'
import { useGame } from '../GameContext'

export default function LevelOne() {
  const { nextLevel, useHint, hints, loseLife } = useGame()
  const [userAnswers, setUserAnswers] = useState({ x: '', y: '' })
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Level 1: Complex system of linear equations with irrational solutions
  // 3x + 7y = 29
  // 5x - 2y = 11
  // Solution: x = 67/41, y = 118/41
  const correctAnswers = { x: 67/41, y: 118/41 }

  const checkAnswer = () => {
    const userX = parseFloat(userAnswers.x)
    const userY = parseFloat(userAnswers.y)
    
    if (isNaN(userX) || isNaN(userY)) {
      setFeedback('Please enter valid numbers for both variables.')
      return
    }

    setAttempts(prev => prev + 1)

    // Allow small tolerance for floating point answers
    const tolerance = 0.01
    const xCorrect = Math.abs(userX - correctAnswers.x) < tolerance
    const yCorrect = Math.abs(userY - correctAnswers.y) < tolerance

    if (xCorrect && yCorrect) {
      const baseScore = 1000
      const timeBonus = Math.max(0, 300 - attempts * 50) // Penalty for multiple attempts
      const finalScore = baseScore + timeBonus
      
      setFeedback(`🎉 Excellent! You escaped the Laboratory!`)
      
      setTimeout(() => {
        nextLevel(finalScore)
      }, 2000)
    } else {
      if (attempts >= 3) {
        loseLife()
        setFeedback('❌ Too many incorrect attempts. You lost a life!')
      } else {
        setFeedback(`❌ Incorrect. You have ${3 - attempts} attempts remaining.`)
      }
    }
  }

  const handleHint = () => {
    if (hints > 0) {
      setShowHint(true)
      useHint()
    }
  }

  const validateEquations = (x: number, y: number) => {
    const eq1 = 2 * x + 3 * y // Should equal 16
    const eq2 = x - y // Should equal 1
    return { eq1, eq2 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="puzzle-container mb-6">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">The Laboratory</h2>
            <p className="text-gray-400">Solve the system of equations to unlock the exit</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">The Mystery Equations</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-500/30">
              <p className="text-gray-300 mb-4">
                Dr. Cipher has locked the laboratory door with a mathematical puzzle. 
                You find two equations carved into the door:
              </p>
              
              <div className="text-center space-y-3">
                <div className="text-2xl font-mono bg-blue-900/30 p-3 rounded">
                  3x + 7y = 29
                </div>
                <div className="text-2xl font-mono bg-blue-900/30 p-3 rounded">
                  5x - 2y = 11
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                Find the values of x and y to escape! (Express as decimals to 2 decimal places)
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
                    <p className="text-yellow-200 font-medium">Hint:</p>
                    <p className="text-yellow-100 text-sm">
                      Multiply the first equation by 2 and the second by 7, then add them to eliminate y. 
                      This gives: 41x = 135, so x = 135/41 ≈ 3.29
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Your Solution</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Value of x:</label>
                <input
                  type="number"
                  value={userAnswers.x}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, x: e.target.value }))}
                  className="math-input w-full"
                  placeholder="Enter x value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Value of y:</label>
                <input
                  type="number"
                  value={userAnswers.y}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, y: e.target.value }))}
                  className="math-input w-full"
                  placeholder="Enter y value"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={checkAnswer}
                  className="btn-primary flex-1"
                  disabled={!userAnswers.x || !userAnswers.y}
                >
                  Check Solution
                </button>
                
                <button
                  onClick={handleHint}
                  className="btn-secondary"
                  disabled={hints === 0 || showHint}
                >
                  Hint ({hints})
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

              {/* Verification Display */}
              {userAnswers.x && userAnswers.y && (
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Verification:</p>
                  <div className="space-y-1 text-sm font-mono">
                    <div>3({userAnswers.x}) + 7({userAnswers.y}) = {3 * parseFloat(userAnswers.x || '0') + 7 * parseFloat(userAnswers.y || '0')}</div>
                    <div>5({userAnswers.x}) - 2({userAnswers.y}) = {5 * parseFloat(userAnswers.x || '0') - 2 * parseFloat(userAnswers.y || '0')}</div>
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