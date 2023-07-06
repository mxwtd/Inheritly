import { Route, Routes, Outlet, useLocation } from 'react-router-dom'

import SidebarV2 from './components/SidebarV2'

import Prefetch from './features/authentication/hooks/Prefetch'
import PersistLogin from './features/authentication/hooks/PersistLogin'

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
import Property from './features/properties/components/Property'
import NewProperty from './features/properties/components/NewProperty'
import EditProperty from './features/properties/components/EditProperty'
// import DeleteProperty from './features/properties/components/DeleteProperty'

import VehiclesList from './features/vehicles/components/VehiclesList'
import Vehicle from './features/vehicles/components/Vehicle'
import NewVehicle from './features/vehicles/components/NewVehicle'
import EditVehicle from './features/vehicles/components/EditVehicle'
// import DeleteVehicle from './features/vehicles/components/DeleteVehicle'

import Error from './pages/Error'
import Footer from './components/Footer'

import { AuthProvider } from './features/authentication/hooks/authProvider'
import GenerateWill from './pages/GenerateWill'
import RetirementCalculator from './pages/RetirementCalculator'

const App = () => {
  const location = useLocation()
  // const noFooterPaths = ['/login', '/signUp', '/forgotPassword']
  // const showFooter = !noFooterPaths.includes(location.pathname)
  const noFooterPaths = ['/login', '/signUp', '/forgotPassword', '/']
  const showFooter = !noFooterPaths.some(path => location.pathname.startsWith(path))

  return (
    <>
      <div className='w-full min-h-screen bg-slate-200 dark:bg-slate-700'>
        <AuthProvider>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='forgotPassword' element={<ForgotPassword />} />

            <Route element={<PersistLogin />}>
              <Route element={<Prefetch />}>
                <Route path='/' element={<SidebarV2 />}>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='overview' element={<Overview />} />

                  <Route path='investments' element={<Outlet />}>
                    <Route index element={<Investments />} />

                    <Route path='properties'>
                      <Route index element={<PropertiesList />} />
                      <Route path='new' element={<NewProperty />} />
                      <Route path=':id' element={<Property />} />
                      <Route path=':id/edit' element={<EditProperty />} />
                    </Route>

                    <Route path='vehicles'>
                      <Route index element={<VehiclesList />} />
                      <Route path='new' element={<NewVehicle />} />
                      <Route path=':id' element={<Vehicle />} />
                      <Route path=':id/edit' element={<EditVehicle />} />
                      {/* <Route path=':id/delete' element={<DeleteVehicle />} /> */}
                    </Route>
                  </Route>

                  <Route path='inbox' element={<Inbox />} />
                  <Route path='beneficiaries' element={<Beneficiaries />} />
                  <Route path='manage' element={<Manage />} />
                  <Route path='generate' element={<GenerateWill />} />
                  <Route path='calculator' element={<RetirementCalculator />} />
                  <Route path='settings' element={<Settings />} />
                  <Route path='report' element={<Report />} />
                </Route>
              </Route>
            </Route>

            <Route path='*' element={<Error type='Not Found' />} />
          </Routes>
          {showFooter && <Footer />}
        </AuthProvider>
      </div>
    </>
  )
}

export default App
