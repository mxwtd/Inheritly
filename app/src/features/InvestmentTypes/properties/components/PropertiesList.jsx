import { useGetPropertiesQuery } from '../services/propertiesApiSlice'
import PropertyCard from './PropertyCard.jsx'
import Properties from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../../components/CardSkeleton.jsx'
import AddNewContainer from '../../../../components/AddNewContainer.jsx'

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
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <Properties>
        <CardSkeleton />
      </Properties>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Properties>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Properties</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/properties/new'>
              <ModalAddButton />
            </Link>
          </div>
        </div>
        <p className={errClass}>{error?.data?.message}</p>
        {
          (error?.data?.error === 'Forbidden token')
            ? (
              <Link to='/login' className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login Again</Link>
              )
            : null
        }
      </Properties>
    )
  }

  if (isSuccess) {
    const { properties: propertiesData, balanceAmount } = properties || {} // Extract properties and balanceAmount from the properties data object
    console.log('propertiesData: ', propertiesData)
    console.log('balanceAmount: ', balanceAmount)

    const listContent = propertiesData?.length
      ? propertiesData.map(property => <PropertyCard key={property.id} property={property} />)
      : null

    content = (
      <Properties backTo='/investments'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Properties</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='property' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
        {/* <p>Balance Amount: {balanceAmount}</p> Display the balanceAmount */}
      </Properties>
    )
  }

  return content
}

export default PropertiesList
