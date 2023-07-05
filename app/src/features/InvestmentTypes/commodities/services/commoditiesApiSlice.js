import { apiSlice } from '../../../../services/api/apiSlice'
import { commoditiesAdapter } from '../hooks/commoditiesSlice.js'

export const commoditiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommodities: builder.query({
      query: () => ({
        url: '/commodities'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Commodity', id: 'LIST' },
            ...result.map((id) => ({ type: 'Commodity', id }))
          ]
        } else return [{ type: 'Commodity', id: 'LIST' }]
      }
    }),
    getCommodityById: builder.query({
      query: (id) => ({
        url: `/commodities/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Commodity', id: result._id }]
        } else if (error) {
          return [{ type: 'Commodity', id: arg.id }]
        } else return [{ type: 'Commodity', id: arg.id }]
      }
    }),
    addNewCommodity: builder.mutation({
      query: commodityData => {
        return {
          url: '/commodities',
          method: 'POST',
          body: commodityData
        }
      },
      invalidatesTags: [
        { type: 'Commodity', id: 'LIST' }
      ]
    }),
    updateCommodity: builder.mutation({
      query: ({ id, commodityData }) => ({
        url: `/commodities/${id}`,
        method: 'PATCH',
        body: commodityData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Commodity', id: arg.id }
      ]
    }),
    deleteCommodity: builder.mutation({
      query: ({ id }) => ({
        url: `/commodities/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Commodity', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/commodities/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Commodity', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/commodities/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Commodity', id: arg.id }
      ]
    })
  })
})

export const {
  useGetCommoditiesQuery,
  useGetCommodityByIdQuery,
  useAddNewCommodityMutation,
  useUpdateCommodityMutation,
  useDeleteCommodityMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = commoditiesApiSlice

export const { selectById: selectCommodityById } = commoditiesAdapter.getSelectors(
  (state) => state.commodities
)
