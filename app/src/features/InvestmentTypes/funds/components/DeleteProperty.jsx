import Properties from '../index'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useDeletePropertyMutation, useGetPropertyByIdQuery } from '../services/propertiesApiSlice'

const DeleteProperty = () => {
  const { id } = useParams()

  const {
    data: property
  } = useGetPropertyByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  const [deleteProperty, {
    isSuccess,
    isError,
    error
  }] = useDeletePropertyMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/investments/properties/')
    }
  }, [id, isSuccess, navigate])

  const handleConfirm = async (e) => {
    e.preventDefault()

    console.log('id to delete', id)

    await deleteProperty({ id })
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Properties backTo={`/investments/properties/${id}`}>
      <p className={errClass}>{error?.data?.message}</p>
      {
        (error?.data?.error === 'Forbidden token')
          ? (
            <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/login')}>Login Again</button>
            )
          : null
      }
      <div className='flex justify-center items-center'>
        <div className='bg-white dark:bg-slate-600 rounded-xl md:w-[60%] xl:w-[45%] px-8'>
          <div className='flex flex-col items-center'>
            <div className='my-8 text-center'>
              <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Delete</h1>
              <h2 className='text-2xl font-bold text-slate-800 dark:text-white mt-3'>{property?.name}?</h2>
            </div>
            <div className='relative w-full rounded-2xl' style={{ aspectRatio: '1/1' }}>
              <div className='bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl'>
                <div className='relative w-full h-full overflow-hidden rounded-2xl'>
                  <img
                    src={property.photo}
                    alt={property?.name}
                    className='object-cover w-full h-full transform transition-all duration-500 hover:scale-110'
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-5 bg-slate-200 dark:bg-slate-800 my-8 p-3 rounded-2xl'>
              <button className='bg-slate-400 hover:bg-red-600 text-white font-bold py-3 px-5 rounded-xl transition-all ease-in-out duration-200' onClick={handleConfirm}>Delete</button>
              <Link to={`../${id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl transition-all ease-in-out duration-200'>Cancel</Link>
            </div>
          </div>
        </div>
      </div>

    </Properties>
  )

  return content
}

export default DeleteProperty
