import { Link } from 'react-router-dom'

const InvestmentCard = ({ cardName, path, balance, currency }) => {
  return (
    <Link to={`/investments/${path}`} className='rounded-xl bg-[url("https://res.cloudinary.com/djr22sgp3/image/upload/v1687594916/light_yju4xd.webp")] dark:bg-[url("https://res.cloudinary.com/djr22sgp3/image/upload/v1687594916/dark_ujrxi2.webp")] bg-cover bg-center bg-no-repeat h-48 md:hover:scale-102 transition-all ease-in-out duration-200 cursor-pointer shadow-md hover:shadow-xl hover:brightness-105'>
      <div className='flex flex-col justify-between h-full p-4 back'>
        <p className='text-lg lg:text-3xl text-slate-700 dark:text-slate-200 font-semibold'>{cardName}</p>
        <div className='flex justify-end'>
          <div className='flex flex-col text-right border border-slate-600 rounded-2xl px-4'>
            <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200 font-bold'>Balance</p>
            <p className='text-sm lg:text-lg text-slate-500 dark:text-slate-200'>$14,000</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InvestmentCard
