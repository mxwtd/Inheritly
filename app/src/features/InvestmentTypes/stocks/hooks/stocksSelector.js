import { createSelector } from '@reduxjs/toolkit'
import { selectStocksResult } from '../services/stocksApiSlice'

const selectStocksData = createSelector(
  selectStocksResult,
  (stocksResult) => stocksResult.data
)

export { selectStocksData }
