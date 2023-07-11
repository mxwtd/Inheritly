import { apiSlice } from '../../../services/api/apiSlice'
// import { investmentsAdapter } from '../hooks/investmentsSlice.js'
export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.mutation({
      query: (willData) => {
        console.log('willData: ', willData)
        return {
          url: '/wills',
          method: 'POST',
          body: willData
        }
      },
    }),
  }),
});


export const {
  useGetWillMutation
} = investmentsApiSlice

// export const { selectById: selectInvestmentById } = investmentsAdapter.getSelectors(
//   (state) => state.investments
// )
