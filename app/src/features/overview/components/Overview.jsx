import MapChart from '../../../components/HoverMap'
import { useState, useEffect } from 'react'
import { useGetAssetsQuery } from '../services/assetsApiSlice'

const Balance = ({ price, pricesVisible }) => {
  return (
    <div className='rounded-xl bg-blue-500 aspect-w-1 aspect-h-1 shadow-lg'>
      <p className='text-md lg:text-xl px-4 pt-4 text-white'>Total Asset Balance</p>
      <div className='p-2 lg:p-5'>
        <div className='flex flex-col justify-end rounded-lg p-5'>
          <div className='text-sm lg:text-xl font-semibold flex justify-end'>
            <p className='text-green-400'>▴ 21%</p>
          </div>
          <h1 className={`flex justify-end text-lg lg:text-xl xl:text-3xl 2xl:text-4xl font-semibold text-white mt-1 ${pricesVisible ? '' : 'blur-md'} select-none`}>
            {pricesVisible ? price : 'X'.repeat(price.length)}
          </h1>
        </div>
      </div>
    </div>
  )
}

const NumberOfAssets = ({ numOfAssets, pricesVisible }) => {
  return (
    <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
      <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Total Asset Balance</p>
      <div className='p-2 lg:p-5'>
        <div className='flex flex-col justify-end rounded-lg p-5'>
          <div className='text-sm lg:text-xl font-semibold flex justify-end'>
            <p className='text-green-500'>▴ 6 YTD</p>
          </div>
          <h1 className={`flex justify-end text-lg lg:text-4xl font-semibold text-slate-800 dark:text-slate-100 mt-1 ${pricesVisible ? '' : 'blur-md'} select-none`}>
            {pricesVisible ? numOfAssets : 'X'.repeat(numOfAssets.length)}
          </h1>
        </div>
      </div>
    </div>
  )
}

const BestPerformingAssets = ({ Assets, stockPrices, pricesVisible }) => {
  return (
    <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
      <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Best Performers</p>
      <div>
        <div className='flex flex-col justify-between rounded-lg px-5'>
          <ul>
            {Assets.map((asset, index) => (
              <li key={index}>
                <div className='flex justify-between text-sm lg:text-lg font-semibold text-slate-800 dark:text-slate-100 mt-3'>
                  <p>{asset}</p>
                  <p className={`${pricesVisible ? '' : 'blur-md'} select-none`}>
                    {pricesVisible ? `$${stockPrices[index]}` : `$${'X'.repeat(String(stockPrices[index]).length)}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Overview = () => {
  const {
    data: assets,
    isLoading,
    isSuccess
  } = useGetAssetsQuery('assetsList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  const [pricesVisible, setPricesVisible] = useState(() => {
    const saved = localStorage.getItem('pricesVisible')
    return saved ? JSON.parse(saved) : true
  })

  // Update localStorage whenever pricesVisible changes
  useEffect(() => {
    localStorage.setItem('pricesVisible', JSON.stringify(pricesVisible))
  }, [pricesVisible])

  // const priceData = '$ 1,543,453' // Test price data, replace it with actual data
  // const totalAssets = '12' // Test number of assets data, replace it with actual data
  const bestPerformers = ['$RTX', '$TSLA', '$CRWD'] // Test number of assets data, replace it with actual data
  const stockPrices = [123, 456, 889] // Test number of assets data, replace it with actual data

  const togglePrices = () => {
    setPricesVisible(!pricesVisible)
  }

  if (isLoading) {
    content = (
      <>
        <p>Loading...</p>
      </>
    )
  }

  if (isSuccess) {
    const { totalBalance, totalAssets } = assets || {}

    content = (
      <>
        <div className='p-4 sm:ml-64 h-[100%]'>
          <div className='p-4 mt-14'>
            <div className='flex flex-row justify-between items-center'>
              <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Overview</h1>
              <div className='bg-blue-500 rounded-full'>
                <button className='w-10 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center p-1' onClick={togglePrices}>
                  {pricesVisible
                    ? (
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                      )
                    : (
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                      </svg>
                      )}
                </button>
              </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
              <Balance price={totalBalance} pricesVisible={pricesVisible} />
              <NumberOfAssets numOfAssets={totalAssets} pricesVisible={pricesVisible} />
              <BestPerformingAssets Assets={bestPerformers} stockPrices={stockPrices} pricesVisible={pricesVisible} />
              <NumberOfAssets numOfAssets={totalAssets} pricesVisible={pricesVisible} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
              <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-2 col-span-1 lg:col-span-1 lg:row-span-2 dark:bg-slate-800 shadow-lg'>
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
                <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>Quarterly Report</p>
              </div>
              <div className='rounded-xl bg-slate-50 aspect-w-1 aspect-h-1 dark:bg-slate-800 shadow-lg'>
                <p className='text-md lg:text-xl px-4 pt-4 text-slate-400 dark:text-slate-500'>My Digital Will</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return content
}

export default Overview
