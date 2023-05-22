import { apiSlice } from '../../../services/api/apiSlice'
import { propertiesAdapter, initialState } from '../hooks/propertiesSlice'

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => '/properties',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedProperties = responseData.map((property) => {
          property.id = property._id
          return property
        })
        return propertiesAdapter.setAll(initialState, loadedProperties)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Property', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Property', id }))
          ]
        } else return [{ type: 'Property', id: 'LIST' }]
      }
    })
  })
})

export const { useGetPropertiesQuery } = propertiesApiSlice
