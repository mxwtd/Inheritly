import { Link } from 'react-router-dom'

const InvestmentCard = ({ cardName, path }) => {
  return (
    <Link to={path} className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300/20 h-48 md:hover:scale-102 transition-all cursor-pointer'>
      <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>{cardName}</p>
    </Link>
  )
}

export default InvestmentCard
