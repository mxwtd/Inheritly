import { apiSlice } from '../../../services/api/apiSlice'
// import { investmentsAdapter } from '../hooks/investmentsSlice.js'

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.query({
      query: willData => {
        return {
          url: '/wills',
          method: 'POST',
          body: willData
        }
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      }
    })
  })
})

export const {
  useGetWillQuery
} = investmentsApiSlice

// export const { selectById: selectInvestmentById } = investmentsAdapter.getSelectors(
//   (state) => state.investments
// )
