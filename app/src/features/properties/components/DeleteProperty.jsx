import Properties from '../index'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useDeletePropertyMutation, useGetPropertiesQuery } from '../services/propertiesApiSlice'

const DeleteProperty = () => {
  const { id } = useParams()

  const {
    data: properties
  } = useGetPropertiesQuery('propertiesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 20000
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

  const property = properties.find(property => property.id === id)

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
      <h1>Do you want to delete {property.name}?</h1>
      <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleConfirm}>Yes</button>
      <Link to={`../${id}`} className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>No</Link>
    </Properties>
  )

  return content
}

export default DeleteProperty
