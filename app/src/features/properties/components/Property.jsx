import Properties from '../index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPropertiesQuery, useDeletePropertyMutation } from '../services/propertiesApiSlice'
import MapChart from '../../../components/HoverMap.jsx'
import { useState } from 'react'

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
        <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>... Loading</h1>
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

    const files = ['File1.pdf', 'File2.pdf', 'File3.pdf', 'File4.docx', 'File5.xlsx'] // demo array
    const [currentPage, setCurrentPage] = useState(0) // page state
    const itemsPerPage = 2 // items per page

    const handleNext = () => {
      setCurrentPage((currentPage) => currentPage + 1)
    }

    const handlePrevious = () => {
      setCurrentPage((currentPage) => currentPage - 1)
    }

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
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg p-4'>
              <img
                src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
                className='object-cover rounded-xl w-full h-full'
              />
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
              <div className='h-[100%]'>
                <div className='max-h-full p-4'>
                  <div className='grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4 text-slate-700 dark:text-white'>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Date of Purchase</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{new Date(property.date).toLocaleDateString()}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Value</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property.currency} {property.value}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Property Type</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property.type}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Tax Status</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property.taxStatus}</h3>
                    </div>
                  </div>
                  <div className='py-2 px-4 mt-4 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg'>
                    <h1 className='py-2 text-md md:text-lg font-semibold'>Files</h1>
                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                      <table className='w-full text-sm text-left text-slate-500 dark:text-slate-400'>
                        <thead className='text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400'>
                          <tr>
                            <th scope='col' className='px-6 py-4'>
                              File Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {files.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((file, index) => (
                            <tr key={index} className={(index + currentPage * itemsPerPage) % 2 === 0 ? 'bg-white border-b dark:bg-slate-800 dark:border-slate-700' : 'border-b bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}>
                              <th scope='row' className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white'>
                                {file}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='p-3'>
                      {currentPage > 0 && <button onClick={handlePrevious} className='mr-4'>❮ Previous</button>}
                      {(currentPage + 1) * itemsPerPage < files.length && <button onClick={handleNext}>Next ❯</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-2 col-span-1 lg:col-span-1 lg:row-span-2 dark:bg-slate-800 shadow-lg'>
              <div className='items-center'>
                <p className='text-xl lg:text-2xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Property Location</p>
              </div>
              <div className='p-5 rounded-lg'>
                <div className='bg-slate-100 dark:bg-slate-700 rounded-lg shadow-xl'>
                  <MapChart />
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg p-4'>
              <div className='p-4 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg'>
                <p className='text-xl lg:text-2xl px-4 mb-2'>Address</p>
                <p className='text-md lg:text-lg px-4'>{property.address}</p>
                <p className='text-md lg:text-lg px-4'>{property.city}</p>
                <p className='text-md lg:text-lg px-4'>{property.zip}</p>
                <p className='text-md lg:text-lg px-4'>{property.country}</p>
              </div>
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg p-4'>
              <div className='p-4 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg'>
                <p className='text-xl lg:text-2xl px-4 mb-2'>Contact</p>
                <p className='text-md lg:text-lg px-4'>Account Number</p>
                <p className='text-md lg:text-lg px-4'>Email</p>
                <p className='text-md lg:text-lg px-4'>Phone</p>
                <p className='text-md lg:text-lg px-4'>Company Address</p>
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
