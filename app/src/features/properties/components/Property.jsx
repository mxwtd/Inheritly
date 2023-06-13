import Properties from '../index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPropertiesQuery, useDeletePropertyMutation } from '../services/propertiesApiSlice'
// import { useState } from 'react'

const Property = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  let content

  // const [confirmWindow, setConfirmWindow] = useState(false)

  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPropertiesQuery('propertiesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 20000
  })

  const [deleteProperty, {
    isSuccess: isDeleteSuccess
  }] = useDeletePropertyMutation()

  const handleConfirm = () => {
    deleteProperty({ id })
  }

  // const handleBack = () => {
  //   setConfirmWindow(false)
  // }

  if (isDeleteSuccess) {
    navigate('/investments/properties')
  }

  if (isLoading) {
    content = (
      <Properties>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>... Loading</h1>
      </Properties>
    )
  }

  if (isError) {
    content = (
      <Properties title='Properties'>
        <h1 className='text-4xl font-semibold text-red-500 dark:text-red-500 my-8'>{error?.data?.message}</h1>
        {
          (error.data.error === 'Forbidden token')
            ? (
              <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/login')}>Login Again</button>
              )
            : null
        }
      </Properties>
    )
  }

  if (isSuccess) {
    const property = properties?.find(property => property.id === id)

    if (property) {
      const handleEdit = () => navigate('./edit')

      // const handleDelete = () => {
      //   content = (
      //     <Properties title={property.name}>
      //       <h1>Are you sure?</h1>
      //       <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleConfirm}>Yes</button>
      //       <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleBack}>No</button>
      //     </Properties>
      //   )
      // }

      content = (
        <Properties backTo='/investments/properties'>
          <div className='flex justify-between items-center mb-5 md:mb-10'>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-800 dark:text-white'>{property.name}</h1>
            <div className='flex flex-row gap-2 md:gap-4 bg-slate-300 dark:bg-slate-800 p-2 rounded-full'>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full' onClick={handleEdit}>
                <svg className='w-4 h-4 md:w-6 md:h-6' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                </svg>
              </button>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full' onClick={handleConfirm}>
                <svg className='w-4 h-4 md:w-6 md:h-6' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                </svg>
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'>
            <div className='bg-white dark:bg-slate-800 shadow-lg rounded-xl'>
              <div className='z-5 relative flex flex-col rounded-xl bg-white dark:bg-slate-800 bg-clip-border shadow-3xl shadow-shadow-500 w-full p-4'>
                <div className='h-full w-full'>
                  <div className='relative w-full'>
                    <div className='mb-3 w-full rounded-lg overflow-hidden' style={{ aspectRatio: '1/1' }}>
                      <img
                        src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
                        className='object-cover w-full h-full transform transition-all duration-500 hover:scale-110'
                      />
                    </div>
                  </div>
                  <div className='mb-3 flex flex-col items-start justify-between px-1 md:items-start'>
                    <div className='mb-2 w-full'>
                      <p className='text-lg font-bold text-slate-800 dark:text-slate-300 break-words overflow-hidden'>{property.name}</p>
                      <p className='mt-1 text-sm font-medium text-slate-600 dark:text-slate-400 md:mt-2'>{property.country}, {property.city}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between md:items-center lg:justify-between '>
                    <div className='flex'>
                      <p className='mb-0 pl-1 text-sm font-bold text-slate-600 dark:text-slate-400'>${property.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Properties>
      )
    }
  }

  return content
}

export default Property
