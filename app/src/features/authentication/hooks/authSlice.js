import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, userEmail, name, lastNames, userId } = action.payload
      state.token = accessToken

      console.log('setCredentials: ')
      console.log('userID: ', userId)

      state.userInformation = {
        email: userEmail,
        id: userId,
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

export const userInformation = (state) => state.auth.userInformation
