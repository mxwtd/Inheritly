import { useContext } from 'react'
import { AuthContext } from './authProvider'

export const useAuth = () => {
  console.log('useAuth')
  return useContext(AuthContext)
}
