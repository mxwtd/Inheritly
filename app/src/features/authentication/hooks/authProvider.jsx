import { createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../../hook/useLocalStorage'
import { setToken } from '../../../services/properties'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = (data) => {
    console.log('login')
    setUser(data)
    setToken(data.token)
    navigate('/')
  }

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      user
    }),
    [user]
  )

  return <AuthContext.Provider value={{ value, login, logout }}>{children}</AuthContext.Provider>
}
