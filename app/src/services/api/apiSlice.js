import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/authentication/hooks/authSlice'

const getBaseUrl = (node_env) => {
  let url
  switch (node_env) {
    case 'production':
      url = 'https://inheritly-app-d2c2366c08d3.herokuapp.com'
      break;
    default:
      url = 'http://localhost:3001'
  }
  console.log('NODE ENV IS: ', node_env)
  console.log('URL is: ', url)
  return url
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl(process.env.NODE_ENV)}/api`,
  // baseUrl: 'https://inheritly-app-d2c2366c08d3.herokuapp.com/api',
  // baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log('sending refresh token')

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired. '
      }
      return refreshResult
    }
  }

  return result
}

export const apiSlice = createApi({
  // Change this in development to point to the correct port
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Property', 'User', 'Vehicle', 'Investment'],
  endpoints: (builder) => ({})
})
