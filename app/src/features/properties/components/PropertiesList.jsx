import { useGetPropertiesQuery } from '../services/propertiesApiSlice'
import Property from './Property'

const PropertiesList = () => {
  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPropertiesQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = properties

    const listContent = ids?.length
      ? ids.map(propertyId => <Property key={propertyId} propertyId={propertyId} />)
      : null

    content = (
      <>
        <div className='p-4 sm:ml-64'>
          <div className='p-4 mt-14'>
            <div>
              <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>Properties</h1>

              {error &&
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                  <strong className='font-bold'>Error!</strong>
                  <span className='block sm:inline'> {error}</span>
                  <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                    <svg className='fill-current h-6 w-6 text-red-500' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                      <title>Close</title>
                      <path d='M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 011.414-1.414l2.93 2.93 2.93-2.93a1 1 0 011.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z' />
                    </svg>
                  </span>
                </div>}

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'>
                {listContent}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return content
}
export default PropertiesList
