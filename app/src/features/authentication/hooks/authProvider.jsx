import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../../hook/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = (data) => {
    console.log('login')
    setUser(data)
    navigate('/')
  }

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  )

  return <AuthContext.Provider value={{ value, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  console.log('useAuth')
  return useContext(AuthContext)
}
