import { Link } from 'react-router-dom'

const Investments = () => {
  return (
    <>
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Investment Type</h1>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Stocks</p>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Bonds</p>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Funds</p>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Commodities</p>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Crypto</p>
            </div>
            <Link to='/properties' className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Property</p>
            </Link>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Vehicles</p>
            </div>
            <Link to='/jewelery' className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Jewelery</p>
            </Link>
            <div className='flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-300 to-blue-300 dark:bg-gradient-to-b dark:from-slate-800 dark:to-blue-300 h-48 md:hover:scale-102 transition-all cursor-pointer'>
              <p className='text-md lg:text-2xl text-slate-600 dark:text-slate-200'>Miscellaneous</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Investments
