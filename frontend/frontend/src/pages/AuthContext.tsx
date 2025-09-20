import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const decoded = jwtDecode<{ id: string; email: string; role: string }>(storedToken)
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      })
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password })
    const { token, data } = response.data
    localStorage.setItem('token', token)
    setToken(token)
    setUser(data.user)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const signup = async (email: string, password: string, role: string) => {
    const response = await axios.post('/api/auth/signup', { email, password, role })
    const { token, data } = response.data
    localStorage.setItem('token', token)
    setToken(token)
    setUser(data.user)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    delete axios.defaults.headers.common['Authorization']
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}