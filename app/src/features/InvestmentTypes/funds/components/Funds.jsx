/// ///////////////////////
// NEW FUND CARDS ////
/// /////////////////////

import { useState, useEffect } from 'react'

import Fund from '../../../../components/Fund'

import { getAllFunds } from '../../../services/funds'
import ModalAddButton from '../../../../components/ModalAddButton'

const Funds = () => {
  const [funds, updateFunds] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFunds()
  }, [])

  const fetchFunds = async () => {
    const funds = await getAllFunds()
    try {
      updateFunds(funds)
    } catch {
      setError('Error')
      setTimeout(() => {
        setError(null)
      }
      , 5000)
    }
  }

  return (
    <>
      <div className='p-4 sm:ml-64'>
        <div className='p-4 mt-14'>
          <div>
            <div className='flex justify-between'>
              <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Funds</h1>
              <div className='flex justify-end items-center'>
                <ModalAddButton />
              </div>
            </div>
            {error &&
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                <strong className='font-bold'>Error!</strong>
                <span className='block sm:inline'> {error}</span>
                <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                  <svg className='fill-current h-6 w-6 text-red-500' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <title>Close</title>
                    <path d='M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 011.414-1.414l2.93 2.93 2.93-2.93a1 1 0 011.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z' />
                  </svg>
                </span>
              </div>}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
              {funds.map((fund) => (
                <Fund key={fund.id} fund={fund} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Funds
