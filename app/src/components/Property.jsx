const Property = ({ property }) => {
  return (
    <>
      <div key={property.id} className='bg-white dark:bg-gray-800 shadow-lg rounded-lg'>
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
}

export default Property