import { apiSlice } from '../../../../services/api/apiSlice'
import { fundsAdapter } from '../hooks/fundsSlice.js'

export const fundsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFunds: builder.query({
      query: () => ({
        url: '/funds'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Fund', id: 'LIST' },
            ...result.map((id) => ({ type: 'Fund', id }))
          ]
        } else return [{ type: 'Fund', id: 'LIST' }]
      }
    }),
    getFundById: builder.query({
      query: (id) => ({
        url: `/funds/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Fund', id: result._id }]
        } else if (error) {
          return [{ type: 'Fund', id: arg.id }]
        } else return [{ type: 'Fund', id: arg.id }]
      }
    }),
    addNewFund: builder.mutation({
      query: fundData => {
        return {
          url: '/funds',
          method: 'POST',
          body: fundData
        }
      },
      invalidatesTags: [
        { type: 'Fund', id: 'LIST' }
      ]
    }),
    updateFund: builder.mutation({
      query: ({ id, fundData }) => ({
        url: `/funds/${id}`,
        method: 'PATCH',
        body: fundData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Fund', id: arg.id }
      ]
    }),
    deleteFund: builder.mutation({
      query: ({ id }) => ({
        url: `/funds/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Fund', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/funds/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Fund', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/funds/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Fund', id: arg.id }
      ]
    })
  })
})

export const {
  useGetFundsQuery,
  useGetFundByIdQuery,
  useAddNewFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = fundsApiSlice

export const { selectById: selectFundById } = fundsAdapter.getSelectors(
  (state) => state.funds
)
