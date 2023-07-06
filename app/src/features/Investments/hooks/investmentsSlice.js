import { createEntityAdapter } from '@reduxjs/toolkit'

export const investmentsAdapter = createEntityAdapter({})

export const initialState = investmentsAdapter.getInitialState()

export const {
  selectAll: selectAllInvestments,
  selectById: selectInvestmentById,
  selectIds: selectInvestmentIds
} = investmentsAdapter.getSelectors((state) => state.investments)
