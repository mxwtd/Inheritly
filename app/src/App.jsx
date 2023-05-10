import { useEffect } from 'react'

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

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon.classList.remove('hidden')
    } else {
      themeToggleDarkIcon.classList.remove('hidden')
    }

    const themeToggleBtn = document.getElementById('theme-toggle')

    const handleThemeToggle = () => {
      themeToggleDarkIcon.classList.toggle('hidden')
      themeToggleLightIcon.classList.toggle('hidden')

      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        } else {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        }
      }
    }

    themeToggleBtn.addEventListener('click', handleThemeToggle)

    return () => {
      themeToggleBtn.removeEventListener('click', handleThemeToggle)
    }
  }, [])

  return (
    <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>

        <SidebarV2 />

        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/investments' element={<Investments />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/beneficiaries' element={<Beneficiaries />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/report' element={<Report />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
