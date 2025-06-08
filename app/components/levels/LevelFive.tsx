'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Lightbulb } from 'lucide-react'
import { useGame } from '../GameContext'

export default function LevelFive() {
  const { nextLevel, useHint, hints, loseLife } = useGame()
  const [userAnswers, setUserAnswers] = useState({ a: '', b: '', c: '' })
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Level 5: Extremely complex matrix system with large coefficients
  // 7a + 11b + 13c = 156
  // 5a - 8b + 17c = 89  
  // 12a + 6b - 9c = -15
  // Solution: a = 127/71, b = 203/71, c = 348/71 (approximately a=1.79, b=2.86, c=4.90)
  const correctAnswers = { a: 127/71, b: 203/71, c: 348/71 }

  const checkAnswer = () => {
    const userA = parseFloat(userAnswers.a)
    const userB = parseFloat(userAnswers.b)
    const userC = parseFloat(userAnswers.c)
    
    if (isNaN(userA) || isNaN(userB) || isNaN(userC)) {
      setFeedback('Please enter valid numbers for all coefficients.')
      return
    }

    setAttempts(prev => prev + 1)

    // Allow tolerance for complex fractional answers
    const tolerance = 0.05
    const aCorrect = Math.abs(userA - correctAnswers.a) < tolerance
    const bCorrect = Math.abs(userB - correctAnswers.b) < tolerance
    const cCorrect = Math.abs(userC - correctAnswers.c) < tolerance

    if (aCorrect && bCorrect && cCorrect) {
      const baseScore = 3000
      const timeBonus = Math.max(0, 700 - attempts * 200)
      const finalScore = baseScore + timeBonus
      
      setFeedback(`🎉 LEGENDARY! You have mastered the Final Chamber!`)
      
      setTimeout(() => {
        nextLevel(finalScore)
      }, 2000)
    } else {
      if (attempts >= 3) {
        loseLife()
        setFeedback('❌ Too many incorrect attempts. You lost a life!')
      } else {
        setFeedback(`❌ The chamber's power remains locked. ${3 - attempts} attempts remaining.`)
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
      className="max-w-6xl mx-auto"
    >
      <div className="puzzle-container mb-6">
        <div className="flex items-center mb-6">
          <Crown className="w-8 h-8 text-yellow-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">The Final Chamber</h2>
            <p className="text-gray-400">Master the ultimate system to claim victory</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">The Sacred Matrix</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-yellow-500/30">
              <p className="text-gray-300 mb-4">
                Before you lies the most powerful mathematical artifact - a sacred matrix system 
                that controls the very essence of the escape room. Solve for the matrix coefficients:
                (Express answers as decimals to 2 decimal places)
              </p>
              
              <div className="text-center space-y-3">
                <div className="text-lg font-mono bg-yellow-900/30 p-3 rounded">
                  7a + 11b + 13c = 156
                </div>
                <div className="text-lg font-mono bg-yellow-900/30 p-3 rounded">
                  5a - 8b + 17c = 89
                </div>
                <div className="text-lg font-mono bg-yellow-900/30 p-3 rounded">
                  12a + 6b - 9c = -15
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                This system represents the core matrix that maintains the chamber's stability. 
                Find the exact values of a, b, and c to achieve perfect mathematical harmony.
              </p>
              <p className="text-sm text-yellow-300 mt-2">
                Warning: This is the most challenging puzzle yet!
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
                    <p className="text-yellow-200 font-medium">Master's Final Secret:</p>
                    <p className="text-yellow-100 text-sm">
                      This system is extremely complex! Use systematic elimination: Start by eliminating 'a' from 
                      equations 1 and 2, then 1 and 3. Work with the resulting 2x2 system carefully.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2">Matrix Representation:</h4>
              <div className="text-center font-mono text-sm">
                <div>⌈ 7  11  13 ⌉   ⌈ a ⌉   ⌈ 156 ⌉</div>
                <div>⌊ 5  -8  17 ⌋ × ⌊ b ⌋ = ⌊ 89 ⌋</div>
                <div>⌊ 12  6  -9 ⌋   ⌊ c ⌋   ⌊ -15 ⌋</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Sacred Coefficients</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">a =</label>
                  <input
                    type="number"
                    step="0.01"
                    value={userAnswers.a}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, a: e.target.value }))}
                    className="math-input w-full"
                    placeholder="a"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">b =</label>
                  <input
                    type="number"
                    step="0.01"
                    value={userAnswers.b}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, b: e.target.value }))}
                    className="math-input w-full"
                    placeholder="b"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">c =</label>
                  <input
                    type="number"
                    step="0.01"
                    value={userAnswers.c}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, c: e.target.value }))}
                    className="math-input w-full"
                    placeholder="c"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={checkAnswer}
                  className="btn-primary flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                  disabled={!userAnswers.a || !userAnswers.b || !userAnswers.c}
                >
                  Activate the Chamber
                </button>
                
                <button
                  onClick={handleHint}
                  className="btn-secondary"
                  disabled={hints === 0 || showHint}
                >
                  Final Hint ({hints})
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
              {userAnswers.a && userAnswers.b && userAnswers.c && (
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Matrix Verification:</p>
                  <div className="space-y-1 text-sm font-mono">
                    <div>7({userAnswers.a}) + 11({userAnswers.b}) + 13({userAnswers.c}) = {7 * parseFloat(userAnswers.a || '0') + 11 * parseFloat(userAnswers.b || '0') + 13 * parseFloat(userAnswers.c || '0')}</div>
                    <div>5({userAnswers.a}) - 8({userAnswers.b}) + 17({userAnswers.c}) = {5 * parseFloat(userAnswers.a || '0') - 8 * parseFloat(userAnswers.b || '0') + 17 * parseFloat(userAnswers.c || '0')}</div>
                    <div>12({userAnswers.a}) + 6({userAnswers.b}) - 9({userAnswers.c}) = {12 * parseFloat(userAnswers.a || '0') + 6 * parseFloat(userAnswers.b || '0') - 9 * parseFloat(userAnswers.c || '0')}</div>
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