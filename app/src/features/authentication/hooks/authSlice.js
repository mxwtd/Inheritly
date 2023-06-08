import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, userEmail, name, lastNames } = action.payload
      state.token = accessToken

      state.userInformation = {
        email: userEmail,
        name,
        lastNames
      }
    },
    logOut: (state) => {
      state.token = null
      state.userInformation = {}
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
