import { createContext, useMemo, useState } from 'react'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null)

  const login = (credentials) => {
    console.log('login with credentials', credentials)
    setUserCredentials(credentials)
  }

  const logout = () => {
    console.log('logout')
    setUserCredentials(null)
  }

  const value = useMemo(
    () => ({
      userCredentials
    }),
    [userCredentials]
  )

  return <AuthContext.Provider value={{ value, login, logout }}>{children}</AuthContext.Provider>
}
