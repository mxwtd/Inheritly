import { apiSlice } from '../../../../services/api/apiSlice'
import { jewelsAdapter } from '../hooks/jewelsSlice.js'

export const jewelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJewels: builder.query({
      query: () => ({
        url: '/jewels'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Jewel', id: 'LIST' },
            ...result.map((id) => ({ type: 'Jewel', id }))
          ]
        } else return [{ type: 'Jewel', id: 'LIST' }]
      }
    }),
    getJewelById: builder.query({
      query: (id) => ({
        url: `/jewels/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Jewel', id: result._id }]
        } else if (error) {
          return [{ type: 'Jewel', id: arg.id }]
        } else return [{ type: 'Jewel', id: arg.id }]
      }
    }),
    addNewJewel: builder.mutation({
      query: jewelData => {
        return {
          url: '/jewels',
          method: 'POST',
          body: jewelData
        }
      },
      invalidatesTags: [
        { type: 'Jewel', id: 'LIST' }
      ]
    }),
    updateJewel: builder.mutation({
      query: ({ id, jewelData }) => ({
        url: `/jewels/${id}`,
        method: 'PATCH',
        body: jewelData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Jewel', id: arg.id }
      ]
    }),
    deleteJewel: builder.mutation({
      query: ({ id }) => ({
        url: `/jewels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Jewel', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/jewels/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Jewel', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/jewels/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Jewel', id: arg.id }
      ]
    })
  })
})

export const {
  useGetJewelsQuery,
  useGetJewelByIdQuery,
  useAddNewJewelMutation,
  useUpdateJewelMutation,
  useDeleteJewelMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = jewelsApiSlice

export const { selectById: selectJewelById } = jewelsAdapter.getSelectors(
  (state) => state.jewels
)
