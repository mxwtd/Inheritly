// import { useState, useEffect } from 'react'

import { Route, Routes, Outlet } from 'react-router-dom'

import SidebarV2 from './components/SidebarV2'

import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import ForgotPassword from './pages/user/ForgotPassword'

import Dashboard from './pages/Dashboard'
import Overview from './pages/Overview'
import Investments from './pages/investments/Investments'
import Inbox from './pages/Inbox'
import Settings from './pages/Settings'
import Beneficiaries from './pages/Beneficiaries'
import Report from './pages/Report'
import Manage from './pages/Manage'

import PropertiesList from './features/properties/components/PropertiesList'
import NewPropertyForm from './features/properties/components/NewPropertyForm'
import EditProperty from './features/properties/components/EditProperty'

import Error from './pages/Error'
import Footer from './components/Footer'

import { ProtectedRoute } from './components/security/ProtectedRoute'

import { AuthProvider } from './features/authentication/hooks/authProvider'
import GenerateWill from './pages/GenerateWill'

const App = () => {
  return (
    <>
      {/* <h1>{error}</h1> */}
      <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
        <AuthProvider>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='forgotPassword' element={<ForgotPassword />} />

            <Route path='/' element={<ProtectedRoute><SidebarV2 /></ProtectedRoute>}>
              <Route path='/' element={<Dashboard />} />
              <Route path='overview' element={<Overview />} />

              <Route path='investments' element={<Outlet />}>
                <Route index element={<Investments />} />

                <Route path='properties'>
                  <Route index element={<PropertiesList />} />
                  <Route path='new' element={<NewPropertyForm />} />
                  <Route path=':id' element={<EditProperty />} />
                </Route>
              </Route>

              <Route path='inbox' element={<Inbox />} />
              <Route path='beneficiaries' element={<Beneficiaries />} />
              <Route path='manage' element={<Manage />} />
              <Route path='generate' element={<GenerateWill />} />
              <Route path='settings' element={<Settings />} />
              <Route path='report' element={<Report />} />
            </Route>

            <Route path='*' element={<Error type='Not Found' />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </div>
    </>
  )
}

export default App
