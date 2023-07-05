import { createEntityAdapter } from '@reduxjs/toolkit'

export const jewelsAdapter = createEntityAdapter({})

export const initialState = jewelsAdapter.getInitialState()

export const {
  selectAll: selectAllJewels,
  selectById: selectJewelById,
  selectIds: selectJewelIds
} = jewelsAdapter.getSelectors((state) => state.jewels)
