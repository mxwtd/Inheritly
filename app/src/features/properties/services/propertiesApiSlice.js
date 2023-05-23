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
      query: propertyData => ({
        url: '/properties',
        method: 'POST',
        headers: {
          Authorization: getToken()
        },
        body: {
          ...propertyData
        }
      }),
      invalidatesTags: [
        { type: 'Property', id: 'LIST' }
      ]
    }),
    updateProperty: builder.mutation({
      query: initialProperty => ({
        url: '/properties',
        method: 'PATCH',
        headers: {
          Authorization: getToken()
        },
        body: {
          ...initialProperty
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Property', id: arg.id }
      ]
    }),
    deleteProperty: builder.mutation({
      query: ({ id }) => ({
        url: '/properties',
        method: 'DELETE',
        headers: {
          Authorization: getToken()
        },
        body: { id }
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
