// Demo users for testing the application
export const initializeDemoUsers = () => {
  if (typeof window === 'undefined') return
  
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  
  // Only add demo users if no users exist
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: 'demo_user_1',
        name: 'John Smith',
        username: 'johnsmith',
        email: 'john@example.com',
        agentId: 'AG123456',
        registrationTime: '2024-01-15T10:30:00.000Z'
      },
      {
        id: 'demo_user_2',
        name: 'Sarah Johnson',
        username: 'sarahj',
        email: 'sarah@example.com',
        agentId: 'AG789012',
        registrationTime: '2024-01-16T14:20:00.000Z'
      },
      {
        id: 'demo_user_3',
        name: 'Mike Wilson',
        username: 'mikew',
        email: 'mike@example.com',
        agentId: 'AG345678',
        registrationTime: '2024-01-17T09:15:00.000Z'
      }
    ]
    
    localStorage.setItem('users', JSON.stringify(demoUsers))
    console.log('Demo users initialized')
  }
}
