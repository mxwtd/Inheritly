import { apiSlice } from '../../../../services/api/apiSlice'
import { bondsAdapter } from '../hooks/bondsSlice.js'

export const bondsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBonds: builder.query({
      query: () => ({
        url: '/bonds'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Bond', id: 'LIST' },
            ...result.map((id) => ({ type: 'Bond', id }))
          ]
        } else return [{ type: 'Bond', id: 'LIST' }]
      }
    }),
    getBondById: builder.query({
      query: (id) => ({
        url: `/bonds/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Bond', id: result._id }]
        } else if (error) {
          return [{ type: 'Bond', id: arg.id }]
        } else return [{ type: 'Bond', id: arg.id }]
      }
    }),
    addNewBond: builder.mutation({
      query: bondData => {
        return {
          url: '/bonds',
          method: 'POST',
          body: bondData
        }
      },
      invalidatesTags: [
        { type: 'Bond', id: 'LIST' }
      ]
    }),
    updateBond: builder.mutation({
      query: ({ id, bondData }) => ({
        url: `/bonds/${id}`,
        method: 'PATCH',
        body: bondData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Bond', id: arg.id }
      ]
    }),
    deleteBond: builder.mutation({
      query: ({ id }) => ({
        url: `/bonds/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Bond', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/bonds/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Bond', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/bonds/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Bond', id: arg.id }
      ]
    })
  })
})

export const {
  useGetBondsQuery,
  useGetBondByIdQuery,
  useAddNewBondMutation,
  useUpdateBondMutation,
  useDeleteBondMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = bondsApiSlice

export const { selectById: selectBondById } = bondsAdapter.getSelectors(
  (state) => state.bonds
)
