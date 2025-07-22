'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Flag,
  AlertTriangle,
  User
} from 'lucide-react'
import { tests } from './testData'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface Test {
  id: string
  title: string
  duration: number
  questions: Question[]
  passingScore: number
}

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState<string>('')

  // Immediate feedback state for test 3
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Find the test by id
  const test = tests.find(t => t.id === params.id)

  // If test not found, redirect
  useEffect(() => {
    if (!test) {
      router.push('/dashboard')
    }
  }, [test, router])

  // Load user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserName(user.name)
      setUserId(user.id || user.email || user.name) // fallback if no id
    }
  }, [])

  // Timer state (after userId and test are loaded)
  const [timeLeft, setTimeLeft] = useState(() => (test ? (test as any).duration || 45 : 45) * 60)

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isTestComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, isTestComplete])

  // Auto-save answers to user-specific localStorage
  useEffect(() => {
    if (!userId || !test) return
    localStorage.setItem(`test_${userId}_${params.id}_answers`, JSON.stringify(answers))
    localStorage.setItem(`test_${userId}_${params.id}_flagged`, JSON.stringify(Array.from(flaggedQuestions)))
  }, [answers, flaggedQuestions, params.id, userId, test])

  // Load saved answers/flags on mount
  useEffect(() => {
    if (!userId || !test) return
    const savedAnswers = localStorage.getItem(`test_${userId}_${params.id}_answers`)
    const savedFlagged = localStorage.getItem(`test_${userId}_${params.id}_flagged`)
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedFlagged) setFlaggedQuestions(new Set(JSON.parse(savedFlagged)))
  }, [userId, params.id, test])

  if (!test) {
    return null
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const totalQuestions = test.questions.length
  const answeredQuestions = Object.keys(answers).length

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }))
  }

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id)
      } else {
        newSet.add(currentQuestion.id)
      }
      return newSet
    })
  }

  const handleSubmitTest = useCallback(async () => {
    setIsSubmitting(true)
    let correctAnswers = 0
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= test.passingScore
    await new Promise(resolve => setTimeout(resolve, 1000))
    const results = {
      testId: params.id,
      score,
      passed,
      totalQuestions,
      correctAnswers,
      timeTaken: (test as any).duration * 60 - timeLeft,
      completedAt: new Date().toISOString(),
      answers
    }
    localStorage.setItem(`test_${userId}_${params.id}_results`, JSON.stringify(results))
    setIsTestComplete(true)
    setIsSubmitting(false)
    router.push(`/test/${params.id}/results`)
  }, [answers, totalQuestions, timeLeft, params.id, router, test, userId])

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // For test 3: handle answer selection with feedback
  const handleAnswerSelectWithFeedback = (answerIndex: number) => {
    if (selectedOption !== null) return // Prevent changing answer after selection
    setSelectedOption(answerIndex)
    setShowFeedback(true)
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }))
  }

  // For test 3: handle next question after feedback
  const handleNextQuestionWithFeedback = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  if (isTestComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Submitting your test...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary-600" />
                <span className="font-medium">{test.title}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{userName || 'User'}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
                <span className={`font-mono font-bold ${timeLeft <= 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="btn-primary"
                disabled={answeredQuestions === 0}
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {test.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-primary-600 text-white'
                        : answers[question.id] !== undefined
                        ? 'bg-success-100 text-success-700 border border-success-300'
                        : flaggedQuestions.has(question.id)
                        ? 'bg-orange-100 text-orange-700 border border-orange-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(question.id) && (
                      <Flag className="h-3 w-3 ml-1" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success-100 border border-success-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span>Unanswered</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Progress: {answeredQuestions} of {totalQuestions} answered
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </h2>
                  <p className="text-gray-600">
                    {currentQuestion.text}
                  </p>
                </div>
                <button
                  onClick={handleFlagQuestion}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedQuestions.has(currentQuestion.id)
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Flag className="h-5 w-5" />
                </button>
              </div>

              {/* Immediate feedback logic for test 3 */}
              {test.id === '3' ? (
                <>
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedOption === index
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${selectedOption !== null ? 'opacity-60' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={selectedOption === index}
                          onChange={() => handleAnswerSelectWithFeedback(index)}
                          className="sr-only"
                          disabled={selectedOption !== null}
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedOption === index
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedOption === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                  {/* Feedback */}
                  {showFeedback && (
                    <div className="mb-6">
                      {selectedOption === currentQuestion.correctAnswer ? (
                        <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
                          <b>Correct!</b> <br />
                          <span className="block mt-1"><b>Explanation:</b> {currentQuestion.explanation}</span>
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
                          <b>Incorrect.</b> The correct answer is: <b>{currentQuestion.options[currentQuestion.correctAnswer]}</b><br />
                          <span className="block mt-1"><b>Explanation:</b> {currentQuestion.explanation}</span>
                        </div>
                      )}
                      <button
                        onClick={handleNextQuestionWithFeedback}
                        className="btn-primary mt-4"
                        disabled={currentQuestionIndex === totalQuestions - 1}
                      >
                        {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Default CBT logic for other tests
                <>
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          answers[currentQuestion.id] === index
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={answers[currentQuestion.id] === index}
                          onChange={() => handleAnswerSelect(index)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          answers[currentQuestion.id] === index
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion.id] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      {answers[currentQuestion.id] !== undefined && (
                        <div className="flex items-center space-x-1 text-success-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Answered</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === totalQuestions - 1}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      <AnimatePresence>
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Submission</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to submit your test? You have answered {answeredQuestions} out of {totalQuestions} questions.
                {answeredQuestions < totalQuestions && (
                  <span className="block mt-2 text-orange-600">
                    You have {totalQuestions - answeredQuestions} unanswered questions.
                  </span>
                )}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="btn-secondary flex-1"
                >
                  Continue Test
                </button>
                <button
                  onClick={() => {
                    setShowConfirmSubmit(false)
                    handleSubmitTest()
                  }}
                  className="btn-primary flex-1"
                >
                  Submit Test
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 