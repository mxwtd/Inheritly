import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/authentication/hooks/authenticatedUser'

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    // user is not authenticated
    return <Navigate to='/login' replace />
  }
  return children
}
