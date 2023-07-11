import { apiSlice } from '../../../../services/api/apiSlice'
import { vehiclesAdapter } from '../hooks/vehiclesSlice.js'

export const vehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => ({
        url: '/vehicles'
      }),
      // async onQueryStarted (arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled
      //     console.log('work', data)
      //   } catch (err) {
      //     console.log('getProperties: ', err)
      //   }
      // },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Vehicle', id: 'LIST' },
            ...result.map((id) => ({ type: 'Vehicle', id }))
          ]
        } else return [{ type: 'Vehicle', id: 'LIST' }]
      }
    }),
    getVehicleById: builder.query({
      query: (id) => ({
        url: `/vehicles/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Vehicle', id: result._id }]
        } else if (error) {
          return [{ type: 'Vehicle', id: arg.id }]
        } else return [{ type: 'Vehicle', id: arg.id }]
      }
    }),
    addNewVehicle: builder.mutation({
      query: vehicleData => {
        return {
          url: '/vehicles',
          method: 'POST',
          body: vehicleData
        }
      },
      invalidatesTags: [
        { type: 'Vehicle', id: 'LIST' }
      ]
    }),
    updateVehicle: builder.mutation({
      query: ({ id, vehicleData }) => ({
        url: `/vehicles/${id}`,
        method: 'PATCH',
        body: vehicleData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id }
      ]
    }),
    deleteVehicle: builder.mutation({
      query: ({ id }) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/vehicles/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/vehicles/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id }
      ]
    })
  })
})

export const {
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useAddNewVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = vehiclesApiSlice

export const { selectById: selectVehicleById } = vehiclesAdapter.getSelectors(
  (state) => state.vehicles
)
