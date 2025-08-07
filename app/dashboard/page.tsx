'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getUserResults, getCurrentUser, logout } from '@/lib/storage'
import { formatDateTime } from '../../lib/utils'
import { LogOut, User, Award } from 'lucide-react'

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

interface Result {
  testId: string
  score: number
  completedAt: string
}

interface CompletedTest extends Result {
  title: string
  description: string
  duration: number
  category: string
  difficulty: string
}

const DashboardPage = () => {
  const [completedTests, setCompletedTests] = useState<CompletedTest[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/')
      return
    }
    
    setCurrentUser(user)
    
    const storedResults = getUserResults()
    const storedTests: Test[] = JSON.parse(localStorage.getItem('tests') || '[]')

    const testsWithResults = storedResults.map((results: Result) => {
      const test = storedTests.find((t) => t.id === results.testId)
      if (!test) return null

      return {
        ...results,
        title: test.title,
        description: test.description ?? '',
        duration: test.duration ?? 45,
        category: test.category ?? '',
        difficulty: test.difficulty ?? '',
      }
    }).filter(Boolean) as CompletedTest[]

    setCompletedTests(testsWithResults)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!currentUser) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">City Weavers Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}!</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{currentUser.username}</span>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{completedTests.length}</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">
                {completedTests.filter(test => test.score >= 70).length}
              </div>
              <div className="text-sm text-gray-600">Tests Passed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {completedTests.length > 0 
                  ? Math.round(completedTests.reduce((sum, test) => sum + test.score, 0) / completedTests.length)
                  : 0
                }%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Award className="h-5 w-5 text-primary-600" />
          <span>Your Test Results</span>
        </h2>

        {completedTests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't completed any tests yet.</p>
              <Button onClick={() => router.push('/test/sample-test')}>
                Take Your First Test
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {completedTests.map((test) => (
              <Card key={test.testId}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{test.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {test.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>
                      <strong>Category:</strong> {test.category}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {test.difficulty}
                    </p>
                    <p>
                      <strong>Score:</strong> {test.score}%
                    </p>
                    <p>
                      <strong>Completed At:</strong>{' '}
                      {formatDateTime(test.completedAt)}
                    </p>
                  </div>
                  <Progress value={test.score} className="w-full" />
                  <Button onClick={() => router.push(`/test/${test.testId}`)}>
                    Retake Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
