import { createContext } from 'react'

const initialState = { user: false }
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
}
