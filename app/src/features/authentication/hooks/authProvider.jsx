import { createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../../services/properties'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const user = null

  const login = (data) => {
    setToken(data.token)
    navigate('/')
  }

  const logout = () => {
    console.log('entering logout in authProvider')
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
