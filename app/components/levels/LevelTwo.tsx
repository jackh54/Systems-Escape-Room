'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Calculator } from 'lucide-react'
import { useGame } from '../GameContext'

export default function LevelTwo() {
  const { nextLevel, useHint, hints, loseLife } = useGame()
  const [userAnswers, setUserAnswers] = useState({ x: '', y: '', z: '' })
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Level 2: Complex system of 3 linear equations with 3 variables
  // 4x + 7y + 3z = 47
  // 2x - 5y + 8z = 19  
  // 6x + 3y - 4z = 13
  // Solution: x = 17/7, y = 26/7, z = 33/7
  const correctAnswers = { x: 17/7, y: 26/7, z: 33/7 }

  const checkAnswer = () => {
    const userX = parseFloat(userAnswers.x)
    const userY = parseFloat(userAnswers.y)
    const userZ = parseFloat(userAnswers.z)
    
    if (isNaN(userX) || isNaN(userY) || isNaN(userZ)) {
      setFeedback('Please enter valid numbers for all variables.')
      return
    }

    setAttempts(prev => prev + 1)

    // Allow small tolerance for floating point answers
    const tolerance = 0.01
    const xCorrect = Math.abs(userX - correctAnswers.x) < tolerance
    const yCorrect = Math.abs(userY - correctAnswers.y) < tolerance
    const zCorrect = Math.abs(userZ - correctAnswers.z) < tolerance

    if (xCorrect && yCorrect && zCorrect) {
      const baseScore = 1500
      const timeBonus = Math.max(0, 400 - attempts * 75)
      const finalScore = baseScore + timeBonus
      
      setFeedback(`🎉 Brilliant! The ancient texts reveal their secrets!`)
      
      setTimeout(() => {
        nextLevel(finalScore)
      }, 2000)
    } else {
      if (attempts >= 3) {
        loseLife()
        setFeedback('❌ Too many incorrect attempts. You lost a life!')
      } else {
        setFeedback(`❌ The ancient knowledge remains locked. ${3 - attempts} attempts remaining.`)
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
          <BookOpen className="w-8 h-8 text-purple-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">The Ancient Library</h2>
            <p className="text-gray-400">Decipher the three-variable system to unlock the forbidden knowledge</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">The Forbidden Codex</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-purple-500/30">
              <p className="text-gray-300 mb-4">
                The ancient tome glows with mysterious equations. Three variables must be discovered 
                to unlock the wisdom of the ages. (Express answers as decimals to 2 decimal places)
              </p>
              
              <div className="text-center space-y-3">
                <div className="text-xl font-mono bg-purple-900/30 p-3 rounded">
                  4x + 7y + 3z = 47
                </div>
                <div className="text-xl font-mono bg-purple-900/30 p-3 rounded">
                  2x - 5y + 8z = 19
                </div>
                <div className="text-xl font-mono bg-purple-900/30 p-3 rounded">
                  6x + 3y - 4z = 13
                </div>
              </div>

              <p className="text-gray-300 mt-4">
                The library doors will only open when all three variables are correctly identified.
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
                    <p className="text-yellow-200 font-medium">Ancient Wisdom:</p>
                    <p className="text-yellow-100 text-sm">
                      Use elimination method: First eliminate x from equations 1 and 2 by multiplying equation 2 by 2 
                      and subtracting from equation 1. This complex system requires careful calculation!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Your Discovery</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">x =</label>
                  <input
                    type="number"
                    value={userAnswers.x}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, x: e.target.value }))}
                    className="math-input w-full"
                    placeholder="x"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">y =</label>
                  <input
                    type="number"
                    value={userAnswers.y}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, y: e.target.value }))}
                    className="math-input w-full"
                    placeholder="y"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">z =</label>
                  <input
                    type="number"
                    value={userAnswers.z}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, z: e.target.value }))}
                    className="math-input w-full"
                    placeholder="z"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={checkAnswer}
                  className="btn-primary flex-1"
                  disabled={!userAnswers.x || !userAnswers.y || !userAnswers.z}
                >
                  Unlock the Codex
                </button>
                
                <button
                  onClick={handleHint}
                  className="btn-secondary"
                  disabled={hints === 0 || showHint}
                >
                  Ancient Hint ({hints})
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
              {userAnswers.x && userAnswers.y && userAnswers.z && (
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Verification:</p>
                  <div className="space-y-1 text-sm font-mono">
                    <div>4({userAnswers.x}) + 7({userAnswers.y}) + 3({userAnswers.z}) = {4 * parseFloat(userAnswers.x || '0') + 7 * parseFloat(userAnswers.y || '0') + 3 * parseFloat(userAnswers.z || '0')}</div>
                    <div>2({userAnswers.x}) - 5({userAnswers.y}) + 8({userAnswers.z}) = {2 * parseFloat(userAnswers.x || '0') - 5 * parseFloat(userAnswers.y || '0') + 8 * parseFloat(userAnswers.z || '0')}</div>
                    <div>6({userAnswers.x}) + 3({userAnswers.y}) - 4({userAnswers.z}) = {6 * parseFloat(userAnswers.x || '0') + 3 * parseFloat(userAnswers.y || '0') - 4 * parseFloat(userAnswers.z || '0')}</div>
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