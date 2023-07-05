import { createEntityAdapter } from '@reduxjs/toolkit'

export const commoditiesAdapter = createEntityAdapter({})

export const initialState = commoditiesAdapter.getInitialState()

export const {
  selectAll: selectAllCommodities,
  selectById: selectCommodityById,
  selectIds: selectCommodityIds
} = commoditiesAdapter.getSelectors((state) => state.commodities)
