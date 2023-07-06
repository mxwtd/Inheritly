import { createSelector } from '@reduxjs/toolkit'
import { selectJewelsResult } from '../services/jewelsApiSlice'

const selectJewelsData = createSelector(
  selectJewelsResult,
  (jewelsResult) => jewelsResult.data
)

export { selectJewelsData }
