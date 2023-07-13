import { apiSlice } from '../../../services/api/apiSlice'

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWill: builder.mutation({
      query: (willData) => {
        return {
          url: '/wills',
          method: 'POST',
          body: willData
        }
      }
    }),
    getRetirementCalculator: builder.mutation({
      query: (retirementData) => {
        return {
          url: '/calculator',
          method: 'POST',
          body: retirementData
        }
      }
    })
  })
})

export const {
  useGetWillMutation,
  useGetRetirementCalculatorMutation
} = investmentsApiSlice
