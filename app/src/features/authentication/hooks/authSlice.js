import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log('action.payload', action.payload)

      const { accessToken } = action.payload
      console.log('accessToken here', accessToken.accessToken)
      console.log('last names: ', accessToken.lastNames)
      state.token = accessToken.accessToken
      state.email = accessToken.userEmail
      state.name = accessToken.name
      state.lastNames = accessToken.lastNames
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
