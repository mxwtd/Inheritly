import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/authentication/hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  console.log('auth here', auth)

  if (!auth.value.user) {
    console.log('user is not authenticated')
    // user is not authenticated
    return <Navigate to='/login' replace />
  }
  return children
}
