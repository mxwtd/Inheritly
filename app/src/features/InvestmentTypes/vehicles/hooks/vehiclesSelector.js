import { createSelector } from '@reduxjs/toolkit'
import { selectVehiclesResult } from '../services/vehiclesApiSlice'

const selectVehiclesData = createSelector(
  selectVehiclesResult,
  (vehiclesResult) => vehiclesResult.data
)

export { selectVehiclesData }
