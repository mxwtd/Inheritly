import { useState, useEffect } from 'react'

import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

import SidebarV2 from './components/SidebarV2'

import Dashboard from './pages/Dashboard'
import Overview from './pages/Overview'
import Investments from './pages/Investments'
import Inbox from './pages/Inbox'
import Settings from './pages/Settings'
import Beneficiaries from './pages/Beneficiaries'
import Report from './pages/Report'
import Manage from './pages/Manage'
import Properties from './pages/Properties'
import Login from './pages/Login'

import { setToken } from './services/properties'
import { login } from './services/login'

const App = () => {
  const location = useLocation()

  // States
  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Read Local Storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReviewAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    console.log('email', email)

    console.log('password', password)

    try {
      const user = await login({ email, password })

      window.localStorage.setItem(
        'loggedReviewAppUser', JSON.stringify(user)
      )

      setToken(user.token)

      setUser(user)
      setEmail('')
      setPassword('')
    } catch (error) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }
      , 5000)
    }
  }

  return (
    <>
      {location.pathname !== '/login' && <SidebarV2 />}
      <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
        <Routes>
          <Route path='/login' element={<Login handleLoginSubmit={handleLoginSubmit} handleChangeUserName={[email, setEmail, password, setPassword]} />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/investments' element={<Investments />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/beneficiaries' element={<Beneficiaries />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/report' element={<Report />} />
          <Route path='/properties' element={<Properties />} />
        </Routes>
      </div>
    </>
  )
}

export default App
