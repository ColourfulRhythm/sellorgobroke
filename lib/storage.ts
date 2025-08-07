export interface Result {
  testId: string
  score: number
  completedAt: string
  userId: string
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  agentId: string
  registrationTime: string
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const userData = localStorage.getItem('currentUser')
  return userData ? JSON.parse(userData) : null
}

export const getUserResults = (): Result[] => {
  if (typeof window === 'undefined') return []
  const currentUser = getCurrentUser()
  if (!currentUser) return []
  
  const allResults = JSON.parse(localStorage.getItem('userResults') || '[]')
  return allResults.filter((result: Result) => result.userId === currentUser.id)
}

export const saveUserResult = (result: Omit<Result, 'userId'>) => {
  if (typeof window === 'undefined') return
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const allResults = JSON.parse(localStorage.getItem('userResults') || '[]')
  const newResult = {
    ...result,
    userId: currentUser.id
  }
  allResults.push(newResult)
  localStorage.setItem('userResults', JSON.stringify(allResults))
}

export const clearUserResults = () => {
  if (typeof window === 'undefined') return
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const allResults = JSON.parse(localStorage.getItem('userResults') || '[]')
  const filteredResults = allResults.filter((result: Result) => result.userId !== currentUser.id)
  localStorage.setItem('userResults', JSON.stringify(filteredResults))
}

export const logout = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}

export const getAllUsers = (): User[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export const createUser = (user: Omit<User, 'id' | 'agentId' | 'registrationTime'>) => {
  if (typeof window === 'undefined') return null
  
  const newUser: User = {
    ...user,
    id: `user_${Date.now()}`,
    agentId: `AG${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    registrationTime: new Date().toISOString()
  }
  
  const users = getAllUsers()
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  
  return newUser
}

export const authenticateUser = (username: string, email: string): User | null => {
  const users = getAllUsers()
  const user = users.find(u => u.username === username && u.email === email)
  return user || null
}
