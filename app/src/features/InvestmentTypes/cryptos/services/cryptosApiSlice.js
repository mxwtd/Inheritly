import { apiSlice } from '../../../../services/api/apiSlice'
import { cryptosAdapter } from '../hooks/cryptosSlice.js'

export const cryptosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => ({
        url: '/cryptos'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Crypto', id: 'LIST' },
            ...result.map((id) => ({ type: 'Crypto', id }))
          ]
        } else return [{ type: 'Crypto', id: 'LIST' }]
      }
    }),
    getCryptoById: builder.query({
      query: (id) => ({
        url: `/cryptos/${id}`
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: 'Crypto', id: result._id }]
        } else if (error) {
          return [{ type: 'Crypto', id: arg.id }]
        } else return [{ type: 'Crypto', id: arg.id }]
      }
    }),
    addNewCrypto: builder.mutation({
      query: cryptoData => {
        return {
          url: '/cryptos',
          method: 'POST',
          body: cryptoData
        }
      },
      invalidatesTags: [
        { type: 'Crypto', id: 'LIST' }
      ]
    }),
    updateCrypto: builder.mutation({
      query: ({ id, cryptoData }) => ({
        url: `/cryptos/${id}`,
        method: 'PATCH',
        body: cryptoData
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Crypto', id: arg.id }
      ]
    }),
    deleteCrypto: builder.mutation({
      query: ({ id }) => ({
        url: `/cryptos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Crypto', id: arg.id }
      ]
    }),
    deleteFile: builder.mutation({
      query: ({ id, fileId }) => ({
        url: `/cryptos/${id}/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Crypto', id: arg.id }
      ]
    }),
    renameFile: builder.mutation({
      query: ({ id, fileId, oldName, newName }) => ({
        url: `/cryptos/${id}/${fileId}`,
        method: 'PATCH',
        body: { oldName, newName }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Crypto', id: arg.id }
      ]
    })
  })
})

export const {
  useGetCryptosQuery,
  useGetCryptoByIdQuery,
  useAddNewCryptoMutation,
  useUpdateCryptoMutation,
  useDeleteCryptoMutation,
  useDeleteFileMutation,
  useRenameFileMutation
} = cryptosApiSlice

export const { selectById: selectCryptoById } = cryptosAdapter.getSelectors(
  (state) => state.cryptos
)
