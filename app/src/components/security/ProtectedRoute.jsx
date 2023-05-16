import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/authentication/hooks/authProvider'

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth()
  console.log('enter to protected route ', isAuthenticated)

  if (!isAuthenticated) {
    console.log('user is not authenticated')
    // user is not authenticated
    return <Navigate to='/login' replace />
  }
  return children
}
