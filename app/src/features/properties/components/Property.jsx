import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPropertyById } from './../services/propertiesApiSlice'

const Property = ({ propertyId }) => {
  const property = useSelector(state => selectPropertyById(state, propertyId))

  const navigate = useNavigate()

  if (property) {
    const handleEdit = () => navigate(`/dash/properties/${propertyId}`)

    return (
      <>
        <div key={property.id} className='bg-white dark:bg-gray-800 shadow-lg rounded-lg' onClick={handleEdit}>
          <img src={property.image} alt='' className='rounded-t-lg' />
          <div className='p-4'>
            <p className='text-xl font-semibold text-gray-800 dark:text-white'>{property.name}</p>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>{property.country}, {property.city}</p>
          </div>
          <div className='flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-700'>
            <p className='text-gray-800 dark:text-gray-200 font-semibold'>$ {property.value}</p>
          </div>
        </div>
      </>
    )
  } else return null
}
export default Property
