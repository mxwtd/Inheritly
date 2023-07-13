import { useGetEntitiesQuery } from '../services/entitiesApiSlice'
import EntityCard from './EntityCard.jsx'
import Entities from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../../components/CardSkeleton.jsx'
import AddNewContainer from '../../../../components/AddNewContainer.jsx'

const EntitiesList = () => {
  const {
    data: entities,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetEntitiesQuery('entitiesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <Entities>
        <CardSkeleton />
      </Entities>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Entities>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Entities</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/entities/new'>
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
      </Entities>
    )
  }

  if (isSuccess) {
    const { entities: entitiesData, balanceAmount } = entities || {}
    console.log('entitiesData: ', entitiesData)
    console.log('balanceAmount: ', balanceAmount)

    const listContent = entitiesData?.length
      ? entitiesData.map(entity => <EntityCard key={entity.id} entity={entity} />)
      : null

    content = (
      <Entities backTo='/'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Entities</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='entity' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
        {/* <p>Balance Amount: {balanceAmount}</p> Display the balanceAmount */}
      </Entities>
    )
  }

  return content
}

export default EntitiesList
