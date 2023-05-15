import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/authentication/hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  console.log('user', user)

  if (!user) {
    // user is not authenticated
    return <Navigate to='/login' replace />
  }
  return children
}
