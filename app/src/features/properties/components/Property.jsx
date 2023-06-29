import Properties from '../index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPropertyByIdQuery } from '../services/propertiesApiSlice'
import MapChart from '../../../components/HoverMap.jsx'
import { useState, useEffect } from 'react'
import DeleteModal from '../../../components/DeleteModal.jsx'

import { getFileNameFromUrl } from '../../../hook/getFileNameFromUrl.js'

const Property = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: property,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPropertyByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  const [files, setFiles] = useState([])
  const [currentPage, setCurrentPage] = useState(0) // page state
  const [downloadUrl, setDownloadUrl] = useState(null)
  const itemsPerPage = 2 // items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  let content

  const handleDownload = async (fileUrl) => {
    setDownloadUrl(fileUrl)
  }

  useEffect(() => {
    setFiles(property?.files)
  }, [property, id])

  useEffect(() => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.target = '_blank'
      link.click()
      setDownloadUrl(null)
    }
  }, [downloadUrl])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div role='status'>
            <svg aria-hidden='true' className='inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
              <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
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
    const handleNext = () => {
      setCurrentPage((currentPage) => currentPage + 1)
    }

    const handlePrevious = () => {
      setCurrentPage((currentPage) => currentPage - 1)
    }

    const handleDelete = () => {
      setShowDeleteModal(true)
    }

    const handleCloseDelete = () => {
      setShowDeleteModal(false)
    }

    if (isSuccess) {
      const handleEdit = () => navigate('./edit')

      content = (
        <Properties backTo='/investments/properties'>
          <div className='flex justify-between items-center mb-5 md:mb-10'>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-800 dark:text-white'>{property?.name}</h1>
            <div className='flex flex-row gap-2 md:gap-4 bg-slate-300 dark:bg-slate-800 p-2 rounded-full'>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full' onClick={handleEdit}>
                <svg className='w-4 h-4 md:w-6 md:h-6' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                </svg>
              </button>
              <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full' onClick={handleDelete}>
                <svg className='w-4 h-4 md:w-6 md:h-6' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                </svg>
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <div className='relative bg-slate-50 dark:bg-slate-800 p-4 rounded-xl aspect-w-1 aspect-h-1'>
              <div className='mb-3 h-full w-full rounded-lg overflow-hidden' style={{ aspectRatio: '1/1' }}>
                <img
                  src={property?.photo.url}
                  className='object-cover w-full h-full transform transition-all duration-500 hover:scale-110'
                />
              </div>
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg flex justify-center items-center p-2 lg:p-4'>
              <div className='min-w-full'>
                <div className='h-full p-4'>
                  <div className='grid grid-cols-2 grid-rows-2 gap-4 xl:gap-8 text-slate-700 dark:text-white'>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden flex flex-col justify-center'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Purchased</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{new Date(property?.date).toLocaleDateString()}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden flex flex-col justify-center'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Value</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property?.currency} {property?.value}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden flex flex-col justify-center'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Type</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property?.type}</h3>
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-600 p-4 rounded-xl shadow-lg overflow-hidden flex flex-col justify-center'>
                      <h2 className='text-lg xl:text-2xl font-semibold'>Tax Status</h2>
                      <h3 className='text-md xl:text-xl text-slate-600 dark:text-slate-300'>{property?.taxStatus}</h3>
                    </div>
                  </div>
                  <div className='py-2 px-4 mt-4 xl:mt-8 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg'>
                    <h1 className='py-2 text-md md:text-lg font-semibold'>Files</h1>
                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                      <table className='w-full text-sm text-left text-slate-500 dark:text-slate-400'>
                        <thead className='text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400'>
                          <tr>
                            <th scope='col' className='px-6 py-4'>
                              Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {files?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((file, index) => (
                            <tr key={index} className={(index + currentPage * itemsPerPage) % 2 === 0 ? 'cursor-pointer bg-white border-b dark:bg-slate-800 dark:border-slate-700' : 'cursor-pointer border-b bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}>
                              <th onClick={() => handleDownload(file.url)} scope='row' className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white'>
                                {getFileNameFromUrl(file.url)}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='p-3'>
                      {currentPage > 0 && <button onClick={handlePrevious} className='mr-4'>❮ Previous</button>}
                      {(currentPage + 1) * itemsPerPage < files?.length && <button onClick={handleNext}>Next ❯</button>}
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
              <div className='p-4 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg h-full flex flex-col justify-center'>
                <p className='text-xl lg:text-2xl px-4 mb-2'>Address</p>
                <p className='text-md lg:text-lg px-4'>{property?.address}</p>
                <p className='text-md lg:text-lg px-4'>{property?.city}</p>
                <p className='text-md lg:text-lg px-4'>{property?.zip}</p>
                <p className='text-md lg:text-lg px-4'>{property?.country}</p>
              </div>
            </div>
            {
              property?.contactInformation
                ? (
                  <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg p-4'>
                    <div className='p-4 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg h-full flex flex-col justify-center'>
                      <p className='text-xl lg:text-2xl px-4 mb-2'>Contact</p>
                      <p className='text-md lg:text-lg px-4'>Account Number: {property?.contactInformation.accountNumber}</p>
                      <p className='text-md lg:text-lg px-4'>Email: {property?.contactInformation.email}</p>
                      <p className='text-md lg:text-lg px-4'>Phone: {property?.contactInformation.phone}</p>
                      <p className='text-md lg:text-lg px-4'>Company Address: {property?.contactInformation.companyAddress}</p>
                    </div>
                  </div>
                  )
                : null
            }
          </div>
        </Properties>
      )
    }
    return (
      <>
        {content}
        {showDeleteModal && <DeleteModal onClose={handleCloseDelete} investmentType={property} />}
      </>
    )
  }
}

export default Property
