import { createSelector } from '@reduxjs/toolkit'
import { selectPropertiesResult } from '../services/propertiesApiSlice'

const selectPropertiesData = createSelector(
  selectPropertiesResult,
  (propertiesResult) => propertiesResult.data
)

export { selectPropertiesData }
