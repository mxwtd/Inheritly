import { store } from '../../../services/store'
import { propertiesApiSlice } from '../../InvestmentTypes/properties/services/propertiesApiSlice'
import { vehiclesApiSlice } from '../../InvestmentTypes/vehicles/services/vehiclesApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const properties = store.dispatch(propertiesApiSlice.endpoints.getProperties.initiate())
    const vehicles = store.dispatch(vehiclesApiSlice.endpoints.getVehicles.initiate())

    return () => {
      console.log('unsubscribing')
      properties.unsubscribe()
      vehicles.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
