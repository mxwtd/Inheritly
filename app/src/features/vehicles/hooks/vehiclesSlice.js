import { createEntityAdapter } from '@reduxjs/toolkit'

export const vehiclesAdapter = createEntityAdapter({})

export const initialState = vehiclesAdapter.getInitialState()

export const {
  selectAll: selectAllVehicles,
  selectById: selectVehicleById,
  selectIds: selectVehicleIds
} = vehiclesAdapter.getSelectors((state) => state.vehicles)
