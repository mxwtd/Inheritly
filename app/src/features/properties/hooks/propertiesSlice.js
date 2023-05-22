import { createEntityAdapter } from '@reduxjs/toolkit'

const propertiesAdapter = createEntityAdapter({})

export const initialState = propertiesAdapter.getInitialState()

export const {
  selectAll: selectAllProperties,
  selectById: selectPropertyById,
  selectIds: selectPropertyIds
} = propertiesAdapter.getSelectors((state) => state.properties)
