
import { useGetFundsQuery } from '../services/fundsApiSlice'
import FundCard from './FundCard.jsx'
import Funds from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../../components/CardSkeleton.jsx'
import AddNewContainer from '../../../../components/AddNewContainer.jsx'

const FundsList = () => {
  const {
    data: funds,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFundsQuery('fundsList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <Funds>
        <CardSkeleton />
      </Funds>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Funds>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Funds</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/funds/new'>
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
      </Funds>
    )
  }

  if (isSuccess) {
    const listContent = funds?.length
      ? funds.map(fund => <FundCard key={fund.id} fund={fund} />)
      : null

    content = (
      <Funds backTo='/investments'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Funds</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='fund' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
      </Funds>
    )
  }

  return content
}
export default FundsList
