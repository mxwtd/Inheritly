import { apiSlice } from '../../../services/api/apiSlice'
import { investmentsAdapter } from '../hooks/investmentsSlice.js'

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: () => ({
        url: '/investments'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'Investment', id: 'LIST' },
            ...result.map((id) => ({ type: 'Investment', id }))
          ]
        } else {
          return [{ type: 'Investment', id: 'LIST' }]
        }
      }
    })
  })
})

export const {
  useGetInvestmentsQuery
} = investmentsApiSlice

export const { selectById: selectInvestmentById } = investmentsAdapter.getSelectors(
  (state) => state.investments
)
