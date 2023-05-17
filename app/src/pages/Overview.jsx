import AssetList from '../components/AssetList'

const Overview = () => {
  return (
    <>
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Overview</h1>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='flex justify-start rounded-xl bg-slate-50 h-48 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 py-2 text-slate-400 dark:text-slate-500'>Total Asset Balance</p>
            </div>
            <div className='flex justify-start rounded-xl bg-slate-50 h-48 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 py-2 text-slate-400 dark:text-slate-500'>Quarterly Report</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <div className='flex justify-start rounded-xl bg-slate-50 h-full col-span-1 sm:col-span-1 sm:row-span-2 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 py-2 text-slate-400 dark:text-slate-500'>Asset Distribution</p>
            </div>
            <div className='flex justify-start rounded-xl bg-slate-50 h-52 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 py-2 text-slate-400 dark:text-slate-500'>Best Performers</p>
            </div>
            <div className='flex justify-start rounded-xl bg-slate-50 h-52 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 py-2 text-slate-400 dark:text-slate-500'>My Digital Will</p>
            </div>
          </div>
        </div>
      </div>
      <AssetList />
    </>
  )
}

export default Overview
