import { store } from '../../../services/store'
import { propertiesApiSlice } from '../../InvestmentTypes/properties/services/propertiesApiSlice'
import { vehiclesApiSlice } from '../../InvestmentTypes/vehicles/services/vehiclesApiSlice'
import { bondsApiSlice } from '../../InvestmentTypes/bonds/services/bondsApiSlice'
import { commoditiesApiSlice } from '../../InvestmentTypes/commodities/services/commoditiesApiSlice'
import { cryptosApiSlice } from '../../InvestmentTypes/cryptos/services/cryptosApiSlice'
import { fundsApiSlice } from '../../InvestmentTypes/funds/services/fundsApiSlice'
import { jewelsApiSlice } from '../../InvestmentTypes/jewels/services/jewelsApiSlice'
import { stocksApiSlice } from '../../InvestmentTypes/stocks/services/stocksApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const properties = store.dispatch(propertiesApiSlice.endpoints.getProperties.initiate())
    const vehicles = store.dispatch(vehiclesApiSlice.endpoints.getVehicles.initiate())
    const bonds = store.dispatch(bondsApiSlice.endpoints.getBonds.initiate())
    const commodities = store.dispatch(commoditiesApiSlice.endpoints.getCommodities.initiate())
    const cryptos = store.dispatch(cryptosApiSlice.endpoints.getCryptos.initiate())
    const funds = store.dispatch(fundsApiSlice.endpoints.getFunds.initiate())
    const jewels = store.dispatch(jewelsApiSlice.endpoints.getJewels.initiate())
    const stocks = store.dispatch(stocksApiSlice.endpoints.getStocks.initiate())

    return () => {
      console.log('unsubscribing')
      properties.unsubscribe()
      vehicles.unsubscribe()
      bonds.unsubscribe()
      commodities.unsubscribe()
      cryptos.unsubscribe()
      funds.unsubscribe()
      jewels.unsubscribe()
      stocks.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
