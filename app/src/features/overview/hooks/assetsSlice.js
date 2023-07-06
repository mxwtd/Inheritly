import { createEntityAdapter } from '@reduxjs/toolkit'

export const assetsAdapter = createEntityAdapter({})

export const initialState = assetsAdapter.getInitialState()

export const {
  selectAll: selectAllAssets,
  selectById: selectAssetById,
  selectIds: selectAssetIds
} = assetsAdapter.getSelectors((state) => state.assets)
