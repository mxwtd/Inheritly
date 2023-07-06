import { createSelector } from '@reduxjs/toolkit'
import { selectCommoditiesResult } from '../services/commoditiesApiSlice'

const selectCommoditiesData = createSelector(
  selectCommoditiesResult,
  (commoditiesResult) => commoditiesResult.data
)

export { selectCommoditiesData }
