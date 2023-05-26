
import { useGetPropertiesQuery } from '../services/propertiesApiSlice'
import { Link } from 'react-router-dom'
import Property from './Property.jsx'
import Properties from '../index.jsx'
import CardSkeleton from '../../../components/CardSkeleton'
import ModalAddButton from '../../../components/ModalAddButton'

const PropertiesList = () => {
  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPropertiesQuery()

  let content

  if (isLoading) {
    content = (
      <Properties>
        <CardSkeleton />
      </Properties>
    )
  }

  if (isError) {
    content = (
      <Properties>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>{error?.data?.message}</h1>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Properties</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/properties/new'>
              <ModalAddButton />
            </Link>
          </div>
        </div>
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
