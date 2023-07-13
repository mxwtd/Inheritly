import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetRetirementCalculatorMutation } from '../services/openAIApiSlice'
import axios from 'axios'

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState('')
  const [ageOfRetirement, setAgeOfRetirement] = useState('')
  const [yearlyPensionGrowth, setYearlyPensionGrowth] = useState('')
  const [currentCapital, setCurrentCapital] = useState('')
  const [desiredYearlyCapital, setDesiredYearlyCapital] = useState('')
  const [considerations, setConsiderations] = useState('')
  const token = useSelector(state => state.auth.token)
  const [calculatorContent, setCalculatorContent] = useState('')

  const [retirementCalculator, { data, isLoading, isError, error }] = useGetRetirementCalculatorMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await retirementCalculator({ currentAge, ageOfRetirement, yearlyPensionGrowth, currentCapital, desiredYearlyCapital, considerations })
      setCalculatorContent(response.data.message)
    } catch (error) {
      console.error(error.response ? error.response.data : error)
    }
  }

  useEffect(() => {
    setContent(calculatorContent)
  }, [calculatorContent])

  const [content, setContent] = useState(calculatorContent)

  const handleContentEdit = (e) => {
    setContent(e.target.innerHTML)
  }

  return (
    <>
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Retirement Calculator</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
                <h3 className='mb-4 text-xl font-semibold text-slate-800 dark:text-slate-100 text-left'>Your Info</h3>
                <div>
                  <div>
                    <div className='mb-4 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Current Age</label>
                        <input
                          type='number'
                          name='currentAge'
                          id='currentAge'
                          value={currentAge}
                          onChange={e => setCurrentAge(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Current Age'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Age Of Retirement</label>
                        <input
                          type='number'
                          name='ageOfRetirement'
                          id='ageOfRetirement'
                          value={ageOfRetirement}
                          onChange={e => setAgeOfRetirement(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Age Of Retirement'
                        />
                      </div>
                    </div>
                    <div className='mb-4 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Yearly Pension Growth</label>
                        <input
                          type='number'
                          name='yearlyPensionGrowth'
                          id='yearlyPensionGrowth'
                          value={yearlyPensionGrowth}
                          onChange={e => setYearlyPensionGrowth(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Yearly Pension Growth'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Current Capital</label>
                        <input
                          type='number'
                          name='currentCapital'
                          id='currentCapital'
                          value={currentCapital}
                          onChange={e => setCurrentCapital(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Current Capital'
                        />
                      </div>
                    </div>
                    <div className='mt-6 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Desired Yearly Capital for Retirement</label>
                        <input
                          type='number'
                          name='desiredYearlyCapital'
                          id='desiredYearlyCapital'
                          value={desiredYearlyCapital}
                          onChange={e => setDesiredYearlyCapital(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Desired Yearly Capital'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
                <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Retirement Information</h3>
                <div className='bg-blue-500 text-white my-4 p-4 rounded-xl flex flex-row items-center gap-3'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    className='w-5 h-5'
                    strokeWidth='1.5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                    />
                  </svg>
                  <h1>
                    Add any details you would like to be included in your calculator. <br /><span className='text-xs'>(E.g. expected inflation, life expectancy, etc.)</span>
                  </h1>
                </div>
                <div>
                  <div className='mb-3 w-full'>
                    <textarea
                      name='considerations'
                      id='considerations'
                      value={considerations}
                      onChange={e => setConsiderations(e.target.value)}
                      className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 h-40 resize-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Details...'
                    />
                  </div>
                </div>
              </div>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 col-span-2'>
                <button type='submit' className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer min-w-full w-full'>
                  View
                </button>
              </div>
            </div>
          </form>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 mb-8 mt-12'>Your Result</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
            <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 col-span-2'>
              <p
                className='text-slate-800 dark:text-white p-2'
                contentEditable='true'
                onInput={handleContentEdit}
                dangerouslySetInnerHTML={{ __html: content.split('\n').join('<br/>') }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RetirementCalculator
