import { createSelector } from '@reduxjs/toolkit'
import { selectBondsResult } from '../services/bondsApiSlice'

const selectBondsData = createSelector(
  selectBondsResult,
  (bondsResult) => bondsResult.data
)

export { selectBondsData }
