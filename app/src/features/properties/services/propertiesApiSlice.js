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
        console.log('add New Property')
        return {
          url: '/properties',
          method: 'POST',
          body: propertyData
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
