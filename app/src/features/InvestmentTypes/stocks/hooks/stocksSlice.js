import { createEntityAdapter } from '@reduxjs/toolkit'

export const stocksAdapter = createEntityAdapter({})

export const initialState = stocksAdapter.getInitialState()

export const {
  selectAll: selectAllStocks,
  selectById: selectStockById,
  selectIds: selectStockIds
} = stocksAdapter.getSelectors((state) => state.stocks)
