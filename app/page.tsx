'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Award, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">ProSeller</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showLogin
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !showLogin
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Professional
                <span className="text-primary-600"> CBT Platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Take computer-based tests, get instant results, and download your professional 
                certificate upon passing. Designed specifically for agents and professionals.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                  <span className="text-gray-700">Instant Results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700">Professional Certificates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <span className="text-gray-700">Timed Assessments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span className="text-gray-700">Agent Focused</span>
                </div>
              </div>

              <button className="btn-primary text-lg px-8 py-3 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Right Column - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="card max-w-md mx-auto">
                {showLogin ? <LoginForm /> : <RegisterForm />}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ProSeller?
            </h2>
            <p className="text-xl text-gray-600">
              Professional testing platform designed for modern agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comprehensive Tests
              </h3>
              <p className="text-gray-600">
                Well-designed assessments covering all essential topics for agents
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Certification
              </h3>
              <p className="text-gray-600">
                Download your professional certificate immediately after passing
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Retakes
              </h3>
              <p className="text-gray-600">
                Retake tests if needed with comprehensive feedback and guidance
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 