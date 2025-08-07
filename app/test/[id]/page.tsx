'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { saveUserResult } from '@/lib/storage'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

interface Test {
  id: string
  title: string
  duration: number
  questions: Question[]
  passingScore: number
  description?: string
  category?: string
  difficulty?: string
}

export default function TestPage({ params }: { params: { id: string } }) {
  const [test, setTest] = useState<Test | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Create a sample test
    const sampleTest: Test = {
      id: params.id,
      title: 'City Weavers Professional Test',
      duration: 30,
      questions: [
        {
          id: '1',
          question: 'What is the primary purpose of a CBT platform?',
          options: [
            'To play games',
            'To conduct computer-based tests',
            'To watch videos',
            'To browse the internet'
          ],
          correctAnswer: 'To conduct computer-based tests'
        },
        {
          id: '2',
          question: 'Which feature is most important for professional certification?',
          options: [
            'Instant results',
            'Colorful graphics',
            'Background music',
            'Social media integration'
          ],
          correctAnswer: 'Instant results'
        },
        {
          id: '3',
          question: 'What should you do if you fail a test?',
          options: [
            'Give up completely',
            'Retake the test after studying',
            'Complain to management',
            'Ignore the results'
          ],
          correctAnswer: 'Retake the test after studying'
        }
      ],
      passingScore: 70,
      description: 'A sample test to demonstrate the City Weavers platform functionality',
      category: 'Professional Development',
      difficulty: 'Beginner'
    }

    setTest(sampleTest)
    setTimeLeft(sampleTest.duration * 60) // Convert to seconds
  }, [params.id])

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft, isCompleted])

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = () => {
    if (!test) return

    let correctAnswers = 0
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / test.questions.length) * 100)
    setScore(finalScore)
    setIsCompleted(true)

    // Save result
    saveUserResult({
      testId: test.id,
      score: finalScore,
      completedAt: new Date().toISOString()
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!test) {
    return <div className="p-6">Loading test...</div>
  }

  if (isCompleted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold mb-4">Test Completed!</h1>
            <div className="text-4xl font-bold mb-4">
              Score: {score}%
            </div>
            <div className="mb-4">
              {score >= test.passingScore ? (
                <div className="text-success-600 font-semibold">
                  🎉 Congratulations! You passed!
                </div>
              ) : (
                <div className="text-danger-600 font-semibold">
                  ❌ You need {test.passingScore}% to pass. Keep trying!
                </div>
              )}
            </div>
            <Button onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
        <p className="text-gray-600 mb-4">{test.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </div>
          <div className="text-lg font-semibold text-orange-600">
            Time: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                  className="sr-only"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex === test.questions.length - 1 ? (
              <Button onClick={handleSubmit}>
                Submit Test
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                disabled={!answers[currentQuestion.id]}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 