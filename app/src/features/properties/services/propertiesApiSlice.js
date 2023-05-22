import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'
import { apiSlice } from '../../../services/api/apiSlice'

const propertiesAdapter = createEntityAdapter({})

const initialState = propertiesAdapter.getInitialState()

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProperties: builder.query({
      query: () => '/properties',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: responseData => {
        const loadedProperties = responseData.map(property => {
          property.id = property._id
          return property
        })
        return propertiesAdapter.setAll(initialState, loadedProperties)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'property', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'property', id }))
          ]
        } else return [{ type: 'property', id: 'LIST' }]
      }
    })
  })
})

export const {
  useGetPropertiesQuery
} = propertiesApiSlice

// returns the query result object
export const selectPropertiesResult = propertiesApiSlice.endpoints.getProperties.select()

// creates memoized selector
const selectPropertiesData = createSelector(
  selectPropertiesResult,
  propertiesResult => propertiesResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProperties,
  selectById: selectPropertyById,
  selectIds: selectPropertyIds
  // Pass in a selector that returns the properties slice of state
} = propertiesAdapter.getSelectors(state => selectPropertiesData(state) ?? initialState)
