import { createSelector } from '@reduxjs/toolkit'
import { selectCryptosResult } from '../services/cryptosApiSlice'

const selectCryptosData = createSelector(
  selectCryptosResult,
  (cryptosResult) => cryptosResult.data
)

export { selectCryptosData }
