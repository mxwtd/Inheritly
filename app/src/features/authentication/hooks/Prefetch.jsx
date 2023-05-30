import { store } from '../../../services/store'
import { propertiesApiSlice } from '../../properties/services/propertiesApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const properties = store.dispatch(propertiesApiSlice.endpoints.getProperties.initiate())

    return () => {
      console.log('unsubscribing')
      properties.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
