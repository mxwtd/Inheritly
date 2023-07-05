import { createSelector } from '@reduxjs/toolkit'
import { selectFundsResult } from '../services/fundsApiSlice'

const selectFundsData = createSelector(
  selectFundsResult,
  (fundsResult) => fundsResult.data
)

export { selectFundsData }
