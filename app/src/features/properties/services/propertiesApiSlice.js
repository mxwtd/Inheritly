import { apiSlice } from '../../../services/api/apiSlice'
import { propertiesAdapter } from '../hooks/propertiesSlice.js'
import { getToken } from '../../../services/properties'

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: '/properties',
        headers: {
          Authorization: getToken()
        }
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Property', id: 'LIST' },
            ...result.map((id) => ({ type: 'Property', id }))
          ]
        } else return [{ type: 'Property', id: 'LIST' }]
      }
    })
  })
})

export const { useGetPropertiesQuery } = propertiesApiSlice

export const { selectById: selectPropertyById } = propertiesAdapter.getSelectors(
  (state) => state.properties
)
