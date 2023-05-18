import AssetList from '../components/AssetList'
import MapChart from '../components/HoverMap'

const Balance = ({ price }) => {
  return (
    <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
      <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Total Asset Balance</p>
      <div className='flex justify-end rounded-lg p-5'>
        <div className='text-sm lg:text-lg font-semibold p-2 mr-3'>
          <p className='text-green-500'>▴ 21%</p>
        </div>
        <h1 className='flex justify-end text-lg lg:text-4xl font-semibold text-slate-800 dark:text-slate-100 mt-1'>
          {price}
        </h1>
      </div>
    </div>
  )
}

const Overview = () => {
  const priceData = '$ 1,543,453' // Test price data, replace it with actual data

  return (
    <>
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Overview</h1>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Balance price={priceData} />
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
              <p className='text-lg lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Quarterly Report</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-2 col-span-1 sm:col-span-1 sm:row-span-2 dark:bg-slate-800 shadow-lg'>
              <div className='items-center'>
                <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Asset Distribution</p>
              </div>
              <div className='p-5 rounded-lg'>
                <div className='bg-slate-100 dark:bg-slate-700 rounded-lg shadow-xl'>
                  <MapChart />
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Best Performers</p>
            </div>
            <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
              <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>My Digital Will</p>
            </div>
          </div>
        </div>
      </div>
      <AssetList />
    </>
  )
}

export default Overview
