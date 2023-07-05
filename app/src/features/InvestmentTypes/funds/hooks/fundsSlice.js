import { createEntityAdapter } from '@reduxjs/toolkit'

export const fundsAdapter = createEntityAdapter({})

export const initialState = fundsAdapter.getInitialState()

export const {
  selectAll: selectAllFunds,
  selectById: selectFundById,
  selectIds: selectFundIds
} = fundsAdapter.getSelectors((state) => state.funds)
