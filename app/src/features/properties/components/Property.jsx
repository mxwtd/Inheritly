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
        <Properties title={property.name}>
          <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleEdit}>Edit Property</button>
          <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleConfirm}>Delete Property</button>
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
