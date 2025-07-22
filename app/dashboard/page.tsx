'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Award, 
  BarChart3, 
  Play, 
  CheckCircle, 
  XCircle,
  Download,
  User,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { tests as allTests, Test as BaseTest } from '../test/[id]/testData'

interface UserData {
  name: string
  email: string
  agentId: string
  loginTime?: string
  registrationTime?: string
}

// Extend Test type for dashboard display
interface Test extends BaseTest {
  status: 'not-started' | 'in-progress' | 'completed' | 'failed' | 'available'
  score?: number
  completedAt?: string
  description?: string
  duration?: number
  category?: string
  difficulty?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [userStats, setUserStats] = useState({
    completedTests: 0,
    totalTests: 0,
    averageScore: 0
  })
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userObj = JSON.parse(savedUser)
      setUser(userObj)
      // Load test results and update test status for this user
      const updatedTests = allTests.map(test => {
        const userId = userObj.id || userObj.email || userObj.name
        const savedResults = localStorage.getItem(`test_${userId}_${test.id}_results`)
        if (savedResults) {
          const results = JSON.parse(savedResults)
          return {
            ...test,
            status: (results.passed ? 'completed' : 'failed') as Test['status'],
            score: results.score,
            completedAt: results.completedAt,
            description: test.description ?? '',
            duration: (test as any).duration ?? 45,
            category: (test as any).category ?? '',
            difficulty: (test as any).difficulty ?? ''
          }
        }
        return {
          ...test,
          status: 'available' as Test['status'],
          description: test.description ?? '',
          duration: (test as any).duration ?? 45,
          category: (test as any).category ?? '',
          difficulty: (test as any).difficulty ?? ''
        }
      })
      setTests(updatedTests)
      // Update stats
      const completedTests = updatedTests.filter(test => test.status === 'completed').length
      const totalScore = updatedTests.filter(test => test.score !== undefined).reduce((sum, test) => sum + (test.score ?? 0), 0)
      const totalTestsWithScore = updatedTests.filter(test => test.score !== undefined).length
      const averageScore = totalTestsWithScore > 0 ? Math.round(totalScore / totalTestsWithScore) : 0
      setUserStats({
        completedTests,
        totalTests: allTests.length,
        averageScore
      })
    } else {
      window.location.href = '/'
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const getStatusColor = (status: Test['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-100'
      case 'failed':
        return 'text-danger-600 bg-danger-100'
      case 'in-progress':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: Test['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'failed':
        return <XCircle className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">ProSeller</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            Continue your certification journey with ProSeller
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalTests}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="bg-success-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.completedTests}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.averageScore}%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.completedTests}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tests Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Real Estate Agent Competency Quiz</h3>
            <div className="text-sm text-gray-600">
              Professional assessment for real estate agents
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {test.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {(test as any).description ?? ''}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(test.status)}`}>
                    {getStatusIcon(test.status)}
                    <span className="capitalize">{test.status.replace('-', ' ')}</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{(test as any).duration} min</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Questions</p>
                    <p className="font-medium">{test.questions.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Passing Score</p>
                    <p className="font-medium">{test.passingScore}%</p>
                  </div>
                </div>

                {test.score && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Your Score</span>
                      <span className={`font-semibold ${test.score >= test.passingScore ? 'text-success-600' : 'text-danger-600'}`}>
                        {test.score}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${test.score >= test.passingScore ? 'bg-success-600' : 'bg-danger-600'}`}
                        style={{ width: `${test.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  {(test.status === 'not-started' || test.status === 'available') && (
                    <Link href={`/test/${test.id}`} className="btn-primary flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Take Test</span>
                    </Link>
                  )}
                  
                  {test.status === 'in-progress' && (
                    <Link href={`/test/${test.id}`} className="btn-primary flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Continue Test</span>
                    </Link>
                  )}
                  
                  {test.status === 'completed' && test.score && test.score >= test.passingScore && (
                    <Link href={`/test/${test.id}/results`} className="btn-success flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>View Results</span>
                    </Link>
                  )}
                  
                  {(test.status === 'failed' || (test.status === 'completed' && test.score && test.score < test.passingScore)) && (
                    <Link href={`/test/${test.id}`} className="btn-danger flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Retake Test</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 