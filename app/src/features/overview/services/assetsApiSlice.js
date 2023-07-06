import { apiSlice } from '../../../services/api/apiSlice'
import { assetsAdapter } from '../hooks/assetsSlice.js'

export const assetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => ({
        url: '/assets'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'Asset', id: 'LIST' },
            ...result.map((id) => ({ type: 'Asset', id }))
          ]
        } else {
          return [{ type: 'Asset', id: 'LIST' }]
        }
      }
    })
  })
})

export const {
  useGetAssetsQuery
} = assetsApiSlice

export const { selectById: selectAssetById } = assetsAdapter.getSelectors(
  (state) => state.assets
)
