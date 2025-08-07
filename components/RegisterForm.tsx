'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserPlus, User, Mail } from 'lucide-react'

interface RegisterFormData {
  name: string
  username: string
  email: string
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = existingUsers.find((user: any) => user.username === data.username)
    
    if (userExists) {
      alert('Username already exists. Please choose a different username.')
      setIsLoading(false)
      return
    }

    // Check if email already exists
    const emailExists = existingUsers.find((user: any) => user.email === data.email)
    
    if (emailExists) {
      alert('Email already exists. Please use a different email address.')
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Register data:', data)
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name: data.name,
      username: data.username,
      email: data.email,
      agentId: `AG${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      registrationTime: new Date().toISOString()
    }
    
    // Store user in users array
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      agentId: newUser.agentId
    }))
    
    setIsLoading(false)
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join City Weavers and start your certification journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              type="text"
              id="name"
              className="input-field pl-10"
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-danger-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Username can only contain letters, numbers, and underscores',
                },
              })}
              type="text"
              id="username"
              className="input-field pl-10"
              placeholder="Choose a username"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-danger-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="input-field pl-10"
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <UserPlus className="h-5 w-5" />
          )}
          <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
} 