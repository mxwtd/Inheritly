
import { useGetPropertiesQuery } from '../services/propertiesApiSlice'
import Property from './Property.jsx'
import Properties from '../index.jsx'

const PropertiesList = () => {
  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPropertiesQuery()

  let content

  if (isLoading) content = <Properties><h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>... Loading</h1></Properties>

  if (isError) {
    content = (
      <Properties title='Properties'>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>{error?.data?.message}</h1>
      </Properties>
    )
  }

  if (isSuccess) {
    const listContent = properties?.length
      ? properties.map(property => <Property key={property.id} property={property} />)
      : null

    content = (
      <Properties>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'>
          {listContent}
        </div>
      </Properties>
    )
  }

  return content
}
export default PropertiesList
