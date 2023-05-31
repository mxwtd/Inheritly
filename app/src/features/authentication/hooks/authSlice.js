import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      console.log('state is: ', state)
      state.token = accessToken
    },
    logOut: (state) => {
      // state.email = null
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
