import { createEntityAdapter } from '@reduxjs/toolkit'

export const bondsAdapter = createEntityAdapter({})

export const initialState = bondsAdapter.getInitialState()

export const {
  selectAll: selectAllBonds,
  selectById: selectBondById,
  selectIds: selectBondIds
} = bondsAdapter.getSelectors((state) => state.bonds)
