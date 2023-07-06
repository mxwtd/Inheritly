import { Link } from 'react-router-dom'

const InvestmentCard = ({ cardName, path, balance, currency }) => {
  return (
    <Link to={`/investments/${path}`} className='rounded-xl bg-slate-400/20 backdrop-blur-md border border-slate-300 dark:border-slate-700 h-48 md:hover:scale-102 transition-all ease-in-out duration-50 cursor-pointer shadow-lg hover:shadow-2xl hover:brightness-110 dark:hover:brightness-150'>
      <div className='flex flex-col justify-between h-full p-6 back'>
        <p className='text-lg lg:text-3xl text-slate-700 dark:text-slate-200 font-semibold'>{cardName}</p>
        <div className='flex justify-end'>
          <div className='flex flex-col text-right rounded-2xl'>
            <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200 font-bold'>Balance</p>
            <p className='text-sm lg:text-lg text-slate-500 dark:text-slate-200'>${(balance) || 0}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InvestmentCard
