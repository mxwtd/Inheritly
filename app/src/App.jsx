import { Route, Routes, Outlet, useLocation } from 'react-router-dom'

import SidebarV2 from './components/SidebarV2'

import Prefetch from './features/authentication/hooks/Prefetch'
import PersistLogin from './features/authentication/hooks/PersistLogin'

import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import ForgotPassword from './pages/user/ForgotPassword'

import Dashboard from './pages/Dashboard'
import Inbox from './pages/Inbox'
import Settings from './pages/Settings'
import Beneficiaries from './pages/Beneficiaries'
import Entities from './features/entities/components/Entities'
import Report from './pages/Report'
import Manage from './pages/Manage'

import Overview from './features/overview/components/Overview'
import Investments from './features/Investments/components/Investments'

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

import CryptosList from './features/InvestmentTypes/cryptos/components/CryptosList'
import Crypto from './features/InvestmentTypes/cryptos/components/Crypto'
import NewCrypto from './features/InvestmentTypes/cryptos/components/NewCrypto'
import EditCrypto from './features/InvestmentTypes/cryptos/components/EditCrypto'

import FundsList from './features/InvestmentTypes/funds/components/FundsList'
import Fund from './features/InvestmentTypes/funds/components/Fund'
import NewFund from './features/InvestmentTypes/funds/components/NewFund'
import EditFund from './features/InvestmentTypes/funds/components/EditFund'

import JewelsList from './features/InvestmentTypes/jewels/components/JewelsList'
import Jewel from './features/InvestmentTypes/jewels/components/Jewel'
import NewJewel from './features/InvestmentTypes/jewels/components/NewJewel'
import EditJewel from './features/InvestmentTypes/jewels/components/EditJewel'

import StocksList from './features/InvestmentTypes/stocks/components/StocksList'
import Stock from './features/InvestmentTypes/stocks/components/Stock'
import NewStock from './features/InvestmentTypes/stocks/components/NewStock'
import EditStock from './features/InvestmentTypes/stocks/components/EditStock'

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

                    <Route path='cryptos'>
                      <Route index element={<CryptosList />} />
                      <Route path='new' element={<NewCrypto />} />
                      <Route path=':id' element={<Crypto />} />
                      <Route path=':id/edit' element={<EditCrypto />} />
                    </Route>

                    <Route path='funds'>
                      <Route index element={<FundsList />} />
                      <Route path='new' element={<NewFund />} />
                      <Route path=':id' element={<Fund />} />
                      <Route path=':id/edit' element={<EditFund />} />
                    </Route>

                    <Route path='jewels'>
                      <Route index element={<JewelsList />} />
                      <Route path='new' element={<NewJewel />} />
                      <Route path=':id' element={<Jewel />} />
                      <Route path=':id/edit' element={<EditJewel />} />
                    </Route>

                    <Route path='stocks'>
                      <Route index element={<StocksList />} />
                      <Route path='new' element={<NewStock />} />
                      <Route path=':id' element={<Stock />} />
                      <Route path=':id/edit' element={<EditStock />} />
                    </Route>
                  </Route>

                  <Route path='inbox' element={<Inbox />} />
                  <Route path='beneficiaries' element={<Beneficiaries />} />
                  <Route path='entities' element={<Entities />} />
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
