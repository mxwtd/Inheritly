import { apiSlice } from '../../../../services/api/apiSlice'
import { entitiesAdapter } from '../hooks/entitiesSlice.js'

export const entitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEntities: builder.query({
      query: () => ({
        url: '/entities'
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('work', data)
        } catch (err) {
          console.log('getEntities: ', err)
        }
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'Entity', id: 'LIST' },
            ...result.map((id) => ({ type: 'Entity', id }))
          ]
        } else {
          return [{ type: 'Entity', id: 'LIST' }]
        }
      }
    }),
    getEntityById: builder.query({
      query: (id) => ({
        url: `/entities/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Entity', id: result._id }]
        } else if (error) {
          return [{ type: 'Entity', id: arg.id }]
        } else return [{ type: 'Entity', id: arg.id }]
      }
    }),
    addNewEntity: builder.mutation({
      query: entityData => {
        return {
          url: '/entities',
          method: 'POST',
          body: entityData
        }
      },
      invalidatesTags: [
        { type: 'Entity', id: 'LIST' }
      ]
    }),
    updateEntity: builder.mutation({
      query: ({ id, entityData }) => ({
        url: `/entities/${id}`,
        method: 'PATCH',
        body: entityData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Entity', id: arg.id }
      ]
    }),
    deleteEntity: builder.mutation({
      query: ({ id }) => ({
        url: `/entities/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Entity', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId, type }) => ({
        url: `/${type}/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Entity', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName, type }) => ({
        url: `/${type}/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Entity', id: arg.id }
      ]
    })
  })
})

export const {
  useGetEntitiesQuery,
  useGetEntityByIdQuery,
  useAddNewEntityMutation,
  useUpdateEntityMutation,
  useDeleteEntityMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = entitiesApiSlice

export const { selectById: selectEntityById } = entitiesAdapter.getSelectors(
  (state) => state.entities
)
