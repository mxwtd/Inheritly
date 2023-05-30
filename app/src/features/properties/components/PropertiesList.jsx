
import { useGetPropertiesQuery } from '../services/propertiesApiSlice'
import PropertyCard from './PropertyCard.jsx'
import Properties from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../components/CardSkeleton.jsx'

const PropertiesList = () => {
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
      ? properties.map(property => <PropertyCard key={property.id} property={property} />)
      : null

    content = (
      <Properties title='Properties'>
        <Link to='./new'><ModalAddButton /></Link>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
      </Properties>
    )
  }

  return content
}
export default PropertiesList
