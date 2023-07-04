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

import PropertiesList from './features/InvestmentTypes/properties/components/PropertiesList'
import Property from './features/InvestmentTypes/properties/components/Property'
import NewProperty from './features/InvestmentTypes/properties/components/NewProperty'
import EditProperty from './features/InvestmentTypes/properties/components/EditProperty'

import VehiclesList from './features/InvestmentTypes/vehicles/components/VehiclesList'
import Vehicle from './features/InvestmentTypes/vehicles/components/Vehicle'
import NewVehicle from './features/InvestmentTypes/vehicles/components/NewVehicle'
import EditVehicle from './features/InvestmentTypes/vehicles/components/EditVehicle'

import BondsList from './features/InvestmentTypes/bonds/components/BondsList'
import Bond from './features/InvestmentTypes/bonds/components/Bond'
import NewBond from './features/InvestmentTypes/bonds/components/NewBond'
import EditBond from './features/InvestmentTypes/bonds/components/EditBond'

import CommoditiesList from './features/InvestmentTypes/commodities/components/CommoditiesList'
import Commodity from './features/InvestmentTypes/commodities/components/Commodity'
import NewCommodity from './features/InvestmentTypes/commodities/components/NewCommodity'
import EditCommodity from './features/InvestmentTypes/commodities/components/EditCommodity'

import Error from './pages/Error'
import Footer from './components/Footer'

import { AuthProvider } from './features/authentication/hooks/authProvider'
import GenerateWill from './pages/GenerateWill'

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
                    </Route>

                    <Route path='bonds'>
                      <Route index element={<BondsList />} />
                      <Route path='new' element={<NewBond />} />
                      <Route path=':id' element={<Bond />} />
                      <Route path=':id/edit' element={<EditBond />} />
                    </Route>

                    <Route path='commodities'>
                      <Route index element={<CommoditiesList />} />
                      <Route path='new' element={<NewCommodity />} />
                      <Route path=':id' element={<Commodity />} />
                      <Route path=':id/edit' element={<EditCommodity />} />
                    </Route>
                  </Route>

                  <Route path='inbox' element={<Inbox />} />
                  <Route path='beneficiaries' element={<Beneficiaries />} />
                  <Route path='manage' element={<Manage />} />
                  <Route path='generate' element={<GenerateWill />} />
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
