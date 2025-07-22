'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  Download, 
  ArrowLeft, 
  Clock, 
  BarChart3,
  BookOpen,
  RefreshCw,
  Share2,
  MessageCircle
} from 'lucide-react'
import jsPDF from 'jspdf'
import { tests } from '../testData'

interface TestResult {
  testId: string
  score: number
  passed: boolean
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  completedAt: string
  answers: { [key: string]: number }
}

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
  passingScore: number
  questions: Question[]
}

// Scoring framework for Real Estate Agent Competency Quiz
const getScoreRating = (score: number) => {
  if (score >= 27) return { rating: 'Expert', action: 'Eligible for certificate, recognition, priority listings', color: 'success' }
  if (score >= 21) return { rating: 'Competent', action: 'Pass – recommend further field mentorship', color: 'primary' }
  if (score >= 15) return { rating: 'Basic', action: 'Suggest agent refresher training', color: 'orange' }
  return { rating: 'Not Ready', action: 'Recommend enrolling in beginner real estate bootcamp', color: 'danger' }
}

export default function TestResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [results, setResults] = useState<TestResult | null>(null)
  const [showReview, setShowReview] = useState(false)
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState<string>('')

  // Find the test by id
  const test = tests.find(t => t.id === params.id)

  // If test not found, redirect
  useEffect(() => {
    if (!test) {
      router.push('/dashboard')
    }
  }, [test, router])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserName(user.name)
      setUserId(user.id || user.email || user.name)
    }
  }, [])

  useEffect(() => {
    if (!userId || !test) return
    const savedResults = localStorage.getItem(`test_${userId}_${params.id}_results`)
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    } else {
      router.push('/dashboard')
    }
  }, [userId, params.id, test, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateCertificate = async () => {
    setIsGeneratingCertificate(true)
    
    try {
      // Create minimal PDF certificate
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Add clean background
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      
      // Add simple border
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(2)
      pdf.rect(20, 20, pageWidth - 40, pageHeight - 40)
      
      // Add main title
      pdf.setFontSize(36)
      pdf.setTextColor(59, 130, 246)
      pdf.text('ProSeller', pageWidth / 2, 50, { align: 'center' })
      
      // Add subtitle
      pdf.setFontSize(16)
      pdf.setTextColor(107, 114, 128)
      pdf.text('Professional Certification', pageWidth / 2, 65, { align: 'center' })
      
      // Add certificate title
      pdf.setFontSize(28)
      pdf.setTextColor(31, 41, 55)
      pdf.text('Certificate of Achievement', pageWidth / 2, 90, { align: 'center' })
      
      // Add simple line
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(1)
      pdf.line(80, 100, pageWidth - 80, 100)
      
      // Add certificate content
      pdf.setFontSize(14)
      pdf.setTextColor(107, 114, 128)
      pdf.text('This is to certify that', pageWidth / 2, 120, { align: 'center' })
      
      // Add recipient name
      pdf.setFontSize(24)
      pdf.setTextColor(59, 130, 246)
      pdf.text(userName || 'User', pageWidth / 2, 140, { align: 'center' })
      
      pdf.setFontSize(14)
      pdf.setTextColor(107, 114, 128)
      pdf.text('has successfully completed', pageWidth / 2, 160, { align: 'center' })
      
      // Add test title
      pdf.setFontSize(16)
      pdf.setTextColor(31, 41, 55)
      pdf.text(test?.title || '', pageWidth / 2, 180, { align: 'center' })
      
      // Add rating if available
      if (scoreRating) {
        pdf.setFontSize(14)
        pdf.setTextColor(31, 41, 55)
        pdf.text(`Achievement Level: ${scoreRating.rating}`, pageWidth / 2, 210, { align: 'center' })
      }
      
      // Add footer details with better positioning
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      
      // Left side details
      pdf.text(`Certificate ID: PS-${results?.testId || '1'}-${results?.completedAt?.split('T')[0] || ''}`, 35, pageHeight - 50)
      pdf.text(`Date: ${formatDate(results?.completedAt || '')}`, 35, pageHeight - 40)
      pdf.text(`Passing Score: ${test?.passingScore}%`, 35, pageHeight - 30)
      
      // Right side details - moved more to the right but still in frame
      pdf.text(`Status: ${results?.passed ? 'PASSED' : 'FAILED'}`, pageWidth - 80, pageHeight - 40)
      
      // Add simple signature line - moved further down to avoid overlap
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(1)
      pdf.line(pageWidth / 2 - 40, pageHeight - 70, pageWidth / 2 + 40, pageHeight - 70)
      
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      pdf.text('Authorized Signature', pageWidth / 2, pageHeight - 60, { align: 'center' })
      
      const fileName = `ProSeller_Certificate_${test?.title.replace(/\s+/g, '_')}_${results?.completedAt?.split('T')[0] || ''}.pdf`
      pdf.save(fileName)
      
      console.log('Certificate generated successfully:', fileName)
      
    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('Failed to generate certificate. Please try again.')
    } finally {
      setIsGeneratingCertificate(false)
    }
  }

  const shareResults = () => {
    // Implementation of shareResults function
  }

  const handleShareWhatsApp = () => {
    // Implementation of handleShareWhatsApp function
  }

  const handleShareX = () => {
    // Implementation of handleShareX function
  }

  const handleDownloadImage = () => {
    // Implementation of handleDownloadImage function
  }

  const scoreRating = results ? getScoreRating(results.score) : null

  if (!test || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
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
                <span className="font-medium">{test.title} - Results</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={shareResults}
                className="btn-secondary flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              {/* Share modal content */}
              
              {results.passed && (
                <button
                  onClick={generateCertificate}
                  disabled={isGeneratingCertificate}
                  className="btn-success flex items-center space-x-2"
                >
                  {isGeneratingCertificate ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  <span>{isGeneratingCertificate ? 'Generating...' : 'Download Certificate'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className={`card text-center ${results.passed ? 'border-success-200 bg-success-50' : 'border-danger-200 bg-danger-50'}`}>
            <div className="mb-6">
              {results.passed ? (
                <div className="bg-success-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-success-600" />
                </div>
              ) : (
                <div className="bg-danger-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-12 w-12 text-danger-600" />
                </div>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {results.passed ? 'Congratulations!' : 'Test Completed'}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {results.passed 
                  ? 'You have successfully passed the test and earned your certificate!'
                  : 'You did not meet the passing score. You can retake the test to improve your score.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{results.score}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{formatTime(results.timeTaken)}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{test.passingScore}%</div>
                <div className="text-sm text-gray-600">Passing Score</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  results.passed ? 'bg-success-600' : 'bg-danger-600'
                }`}
                style={{ width: `${results.score}%` }}
              ></div>
            </div>

            {/* Professional Rating */}
            {scoreRating && (
              <div className={`mb-6 p-4 rounded-lg border-2 ${
                scoreRating.color === 'success' ? 'border-success-300 bg-success-100' :
                scoreRating.color === 'primary' ? 'border-primary-300 bg-primary-100' :
                scoreRating.color === 'orange' ? 'border-orange-300 bg-orange-100' :
                'border-danger-300 bg-danger-100'
              }`}>
                <h3 className={`text-xl font-bold mb-2 ${
                  scoreRating.color === 'success' ? 'text-success-800' :
                  scoreRating.color === 'primary' ? 'text-primary-800' :
                  scoreRating.color === 'orange' ? 'text-orange-800' :
                  'text-danger-800'
                }`}>
                  Rating: {scoreRating.rating}
                </h3>
                <p className={`text-sm ${
                  scoreRating.color === 'success' ? 'text-success-700' :
                  scoreRating.color === 'primary' ? 'text-primary-700' :
                  scoreRating.color === 'orange' ? 'text-orange-700' :
                  'text-danger-700'
                }`}>
                  {scoreRating.action}
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {results.passed ? (
                <button
                  onClick={() => setShowReview(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Review Answers</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem(`test_${userId}_${params.id}_results`)
                    localStorage.removeItem(`test_${userId}_${params.id}_answers`)
                    localStorage.removeItem(`test_${userId}_${params.id}_flagged`)
                    router.push(`/test/${params.id}`)
                  }}
                  className="btn-danger flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Retake Test</span>
                </button>
              )}
              
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>View All Tests</span>
              </button>
            </div>

            {/* WhatsApp Group Invitation - Only show for passed tests */}
            {results.passed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg"
              >
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Join Our Community!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Connect with fellow real estate professionals and stay updated with the latest industry insights.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/JYulQ0Q9c3hKu3xmPp7wqt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Join City Weavers Group</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scoring Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Scoring Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border-2 border-success-300 bg-success-50 rounded-lg">
                <h3 className="font-semibold text-success-800 mb-2">27-30: Expert</h3>
                <p className="text-sm text-success-700">Eligible for certificate, recognition, priority listings</p>
              </div>
              <div className="p-4 border-2 border-primary-300 bg-primary-50 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">21-26: Competent</h3>
                <p className="text-sm text-primary-700">Pass – recommend further field mentorship</p>
              </div>
              <div className="p-4 border-2 border-orange-300 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">15-20: Basic</h3>
                <p className="text-sm text-orange-700">Suggest agent refresher training</p>
              </div>
              <div className="p-4 border-2 border-danger-300 bg-danger-50 rounded-lg">
                <h3 className="font-semibold text-danger-800 mb-2">Below 15: Not Ready</h3>
                <p className="text-sm text-danger-700">Recommend enrolling in beginner real estate bootcamp</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Score Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-medium">{Math.round((results.correctAnswers / results.totalQuestions) * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Questions Answered</span>
                    <span className="font-medium">{Object.keys(results.answers).length}/{results.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Efficiency</span>
                    <span className="font-medium">{Math.round((results.timeTaken / (test.questions.length * 60)) * 100)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Test Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Test Name</span>
                    <span className="font-medium">{test.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed On</span>
                    <span className="font-medium">{formatDate(results.completedAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Test Duration</span>
                    <span className="font-medium">{formatTime(results.timeTaken)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answer Review */}
        {showReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Answer Review</h2>
              <div className="space-y-6">
                {test.questions.map((question, index) => {
                  const userAnswer = results.answers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  
                  return (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Question {index + 1}
                        </h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isCorrect ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{question.text}</p>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-success-100 border border-success-300'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-danger-100 border border-danger-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                optionIndex === question.correctAnswer
                                  ? 'border-success-600 bg-success-600'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'border-danger-600 bg-danger-600'
                                  : 'border-gray-300'
                              }`}>
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-3 w-3 text-white" />
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <XCircle className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className={optionIndex === question.correctAnswer ? 'font-medium text-success-700' : ''}>
                                {option}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Hidden Certificate Template */}
      <div id="certificate" className="hidden">
        <div className="w-[1200px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-100 p-12 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">ProSeller</h1>
              <p className="text-xl text-gray-600">Professional Certification</p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-4xl font-semibold text-gray-800 mb-4">Certificate of Completion</h2>
              <p className="text-lg text-gray-600">This is to certify that</p>
              <p className="text-3xl font-bold text-primary-600 mb-4">{userName || 'User'}</p>
              <p className="text-lg text-gray-600">has successfully completed the</p>
              <p className="text-2xl font-semibold text-gray-800 mb-4">{test.title}</p>
              <p className="text-lg text-gray-600">with a score of</p>
              <p className="text-4xl font-bold text-success-600 mb-4">{results?.score}%</p>
              {scoreRating && (
                <p className="text-lg text-gray-600">Achieving the rating of: <span className="font-semibold">{scoreRating.rating}</span></p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-sm text-gray-600">
              <div>
                <p><strong>Test Date:</strong> {formatDate(results.completedAt)}</p>
                <p><strong>Certificate ID:</strong> PS-{results.testId}-{results.completedAt.split('T')[0]}</p>
              </div>
              <div>
                <p><strong>Passing Score:</strong> {test.passingScore}%</p>
                <p><strong>Status:</strong> {results.passed ? 'PASSED' : 'FAILED'}</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                This certificate is issued by ProSeller and is valid for professional development purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 