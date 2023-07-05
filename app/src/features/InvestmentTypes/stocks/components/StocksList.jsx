
import { useGetStocksQuery } from '../services/stocksApiSlice'
import StockCard from './StockCard.jsx'
import Stocks from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../../components/CardSkeleton.jsx'
import AddNewContainer from '../../../../components/AddNewContainer.jsx'

const StocksList = () => {
  const {
    data: stocks,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetStocksQuery('stocksList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <Stocks>
        <CardSkeleton />
      </Stocks>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Stocks>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Stocks</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/stocks/new'>
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
      </Stocks>
    )
  }

  if (isSuccess) {
    const listContent = stocks?.length
      ? stocks.map(stock => <StockCard key={stock.id} stock={stock} />)
      : null

    content = (
      <Stocks backTo='/investments'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Stocks</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='stock' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
      </Stocks>
    )
  }

  return content
}
export default StocksList
