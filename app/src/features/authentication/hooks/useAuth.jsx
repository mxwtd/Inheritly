import { useContext } from 'react'
import { AuthProvider } from './authProvider'

export const useAuth = () => {
  return useContext(AuthProvider)
}
