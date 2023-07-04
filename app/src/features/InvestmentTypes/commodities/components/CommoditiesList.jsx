
import { useGetCommoditiesQuery } from '../services/commoditiesApiSlice'
import CommodityCard from './CommodityCard.jsx'
import Commodities from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../../components/CardSkeleton.jsx'
import AddNewContainer from '../../../../components/AddNewContainer.jsx'

const CommoditiesList = () => {
  const {
    data: commodities,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCommoditiesQuery('commoditiesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <Commodities>
        <CardSkeleton />
      </Commodities>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Commodities>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Commodities</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/commodities/new'>
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
      </Commodities>
    )
  }

  if (isSuccess) {
    const listContent = commodities?.length
      ? commodities.map(commodity => <CommodityCard key={commodity.id} commodity={commodity} />)
      : null

    content = (
      <Commodities backTo='/investments'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Commodities</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='commodity' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
      </Commodities>
    )
  }

  return content
}
export default CommoditiesList
