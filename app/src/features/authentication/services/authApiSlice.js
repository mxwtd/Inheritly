import { apiSlice } from '../../../services/api/apiSlice'
import { logOut } from '../hooks/authSlice'

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
          await queryFulfilled
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.error('Error logging out', err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET'
      })
    })
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation
} = authApiSlice
