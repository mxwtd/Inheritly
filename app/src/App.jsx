import { useState, useEffect } from 'react'

import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'

import SidebarV2 from './components/SidebarV2'
import Dashboard from './components/Dashboard'
import Overview from './components/Overview'
import Investments from './components/Investments'
import Inbox from './components/Inbox'
import Settings from './components/Settings'
import Beneficiaries from './components/Beneficiaries'
import Report from './components/Report'
import Manage from './components/Manage'
import Login from './components/Login'
import Properties from './components/Properties'

import { setToken } from './services/properties'
import { login } from './services/login'

const MainComponent = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/login' && <SidebarV2 />}
      <Routes>
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
    </>
  )
}

const App = () => {
  // States
  const [error, setError] = useState(null)

  const [username, setUsername] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })

      window.localStorage.setItem(
        'loggedReviewAppUser', JSON.stringify(user)
      )

      setToken(user.token)

      setUser(user)
      setUsername('')
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
    <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login handleLogin={handleLogin} handleChangeUserName={[username, setUsername, password, setPassword]} />} />
        </Routes>
        <MainComponent />
        {user === null
          ? <Navigate to='/login' replace />
          : <Navigate to='/' replace />}
      </BrowserRouter>
    </div>
  )
}

export default App
