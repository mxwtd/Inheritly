import { apiSlice } from '../../../../services/api/apiSlice'
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
    getPropertyById: builder.query({
      query: (id) => ({
        url: `/properties/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Property', id: result._id }]
        } else if (error) {
          return [{ type: 'Property', id: arg.id }]
        } else return [{ type: 'Property', id: arg.id }]
      }
    }),
    addNewProperty: builder.mutation({
      query: propertyData => {
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
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/properties/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Property', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/properties/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Property', id: arg.id }
      ]
    })
  })
})

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useAddNewPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = propertiesApiSlice

export const { selectById: selectPropertyById } = propertiesAdapter.getSelectors(
  (state) => state.properties
)
