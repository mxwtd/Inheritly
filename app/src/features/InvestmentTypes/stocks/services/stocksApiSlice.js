import { apiSlice } from '../../../../services/api/apiSlice'
import { stocksAdapter } from '../hooks/stocksSlice.js'

export const stocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => ({
        url: '/stocks'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Stock', id: 'LIST' },
            ...result.map((id) => ({ type: 'Stock', id }))
          ]
        } else return [{ type: 'Stock', id: 'LIST' }]
      }
    }),
    getStockById: builder.query({
      query: (id) => ({
        url: `/stocks/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Stock', id: result._id }]
        } else if (error) {
          return [{ type: 'Stock', id: arg.id }]
        } else return [{ type: 'Stock', id: arg.id }]
      }
    }),
    addNewStock: builder.mutation({
      query: stockData => {
        return {
          url: '/stocks',
          method: 'POST',
          body: stockData
        }
      },
      invalidatesTags: [
        { type: 'Stock', id: 'LIST' }
      ]
    }),
    updateStock: builder.mutation({
      query: ({ id, stockData }) => ({
        url: `/stocks/${id}`,
        method: 'PATCH',
        body: stockData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Stock', id: arg.id }
      ]
    }),
    deleteStock: builder.mutation({
      query: ({ id }) => ({
        url: `/stocks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Stock', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/stocks/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Stock', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/stocks/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Stock', id: arg.id }
      ]
    })
  })
})

export const {
  useGetStocksQuery,
  useGetStockByIdQuery,
  useAddNewStockMutation,
  useUpdateStockMutation,
  useDeleteStockMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = stocksApiSlice

export const { selectById: selectStockById } = stocksAdapter.getSelectors(
  (state) => state.stocks
)
