import { Link } from 'react-router-dom'
import { formattedPrice } from '../../../../hook/formatted.js'

const StockCard = ({ stock }) => {
  return (
    <>
      <Link to={`./${stock.id}`}>
        <div key={stock.id} className='bg-white dark:bg-slate-800 shadow-lg rounded-xl'>
          <div className='z-5 relative flex flex-col rounded-xl bg-white dark:bg-slate-800 bg-clip-border shadow-3xl shadow-shadow-500 w-full p-4'>
            <div className='h-full w-full'>
              <div className='relative w-full'>
                <div className='mb-3 w-full rounded-lg overflow-hidden' style={{ aspectRatio: '1/1' }}>
                  <img
                    src={stock.photo.url}
                    className='object-cover w-full h-full transform transition-all duration-500 hover:scale-110'
                  />
                </div>
              </div>
              <div className='mb-3 flex flex-col items-start justify-between px-1 md:items-start'>
                <div className='mb-2 w-full'>
                  <p className='text-lg font-bold text-slate-800 dark:text-slate-300 break-words overflow-hidden'>{stock.name}</p>
                  <p className='mt-1 text-sm font-medium text-slate-600 dark:text-slate-400 md:mt-2'>{stock.symbol}, {stock.quantity}</p>
                </div>
              </div>
              <div className='flex items-center justify-between md:items-center lg:justify-between '>
                <div className='flex'>
                  <p className='mb-0 pl-1 text-sm font-bold text-slate-600 dark:text-slate-400'>${formattedPrice(stock.value)}</p>
                </div>
                <button className='text-slate-600 hover:text-slate-100 bg-slate-400/[.3] hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-blue-500 dark:text-slate-300 dark:hover:text-slate-100 transition duration-200'>View</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
export default StockCard
