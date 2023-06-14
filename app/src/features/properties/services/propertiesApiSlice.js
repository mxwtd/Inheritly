import { apiSlice } from '../../../services/api/apiSlice'
import { propertiesAdapter } from '../hooks/propertiesSlice.js'

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: '/properties'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Property', id: 'LIST' },
            ...result.map((id) => ({ type: 'Property', id }))
          ]
        } else return [{ type: 'Property', id: 'LIST' }]
      }
    }),
    addNewProperty: builder.mutation({
      query: propertyData => {
        let data = {}

        // Display the key/value pairs
        for (const pair of propertyData.entries()) {
          data = {
            ...data,
            [pair[0]]: pair[1]
          }
        }

        console.log('data', data)

        const photo = data.photo

        console.log('photo', photo)
        console.log('photo type', typeof photo)

        return {
          url: '/properties',
          method: 'POST',
          body: {
            ...data
          }
        }
      },
      invalidatesTags: [
        { type: 'Property', id: 'LIST' }
      ]
    }),
    updateProperty: builder.mutation({
      query: ({ id, propertyData }) => ({
        url: `/properties/${id}`,
        method: 'PATCH',
        body: propertyData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Property', id: arg.id }
      ]
    }),
    deleteProperty: builder.mutation({
      query: ({ id }) => ({
        url: `/properties/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Property', id: arg.id }
      ]
    })
  })
})

export const {
  useGetPropertiesQuery,
  useAddNewPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation
} = propertiesApiSlice

export const { selectById: selectPropertyById } = propertiesAdapter.getSelectors(
  (state) => state.properties
)
