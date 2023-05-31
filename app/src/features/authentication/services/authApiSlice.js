import { apiSlice } from '../../../services/api/apiSlice'
import { logOut, setCredentials } from '../hooks/authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.error('Error logging out', err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken } = data
          console.log('set access token:', accessToken)
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation
} = authApiSlice
