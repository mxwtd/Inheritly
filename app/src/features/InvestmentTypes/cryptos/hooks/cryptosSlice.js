import { createEntityAdapter } from '@reduxjs/toolkit'

export const cryptosAdapter = createEntityAdapter({})

export const initialState = cryptosAdapter.getInitialState()

export const {
  selectAll: selectAllCryptos,
  selectById: selectCryptoById,
  selectIds: selectCryptoIds
} = cryptosAdapter.getSelectors((state) => state.cryptos)
