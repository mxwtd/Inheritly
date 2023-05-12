import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

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
  return (
    <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
        <MainComponent />
      </BrowserRouter>
    </div>
  )
}

export default App
