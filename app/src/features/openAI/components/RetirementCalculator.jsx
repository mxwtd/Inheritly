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
  const [calculatorContent, setCalculatorContent] = useState({
    message: '',
    monthlyContributions: '',
    requiredCapital: '',
    yearsUntilRetirement: ''
  })

  const [retirementCalculator, { data, isLoading, isError, error }] = useGetRetirementCalculatorMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await retirementCalculator({ currentAge, ageOfRetirement, yearlyPensionGrowth, currentCapital, desiredYearlyCapital, considerations })
      // Assuming the API response is stored in response.data
      setCalculatorContent(response.data)
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

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'currentCapital' || name === 'desiredYearlyCapital') {
      value = value.replace(/,/g, '')
      if (value.length > 0) {
        if (name === 'currentCapital') {
          setCurrentCapital(parseFloat(value).toLocaleString())
        } else if (name === 'desiredYearlyCapital') {
          setDesiredYearlyCapital(parseFloat(value).toLocaleString())
        }
      } else {
        if (name === 'currentCapital') {
          setCurrentCapital('')
        } else if (name === 'desiredYearlyCapital') {
          setDesiredYearlyCapital('')
        }
      }
    } else if (name === 'yearlyPensionGrowth') {
      value = value.replace('%', '')
      if (value.length > 0) {
        setYearlyPensionGrowth(value + '%')
      } else {
        setYearlyPensionGrowth(value)
      }
    }
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
                          type='text'
                          name='yearlyPensionGrowth'
                          id='yearlyPensionGrowth'
                          value={yearlyPensionGrowth}
                          onChange={handleChange}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Yearly Pension Growth'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Current Capital</label>
                        <input
                          type='text'
                          name='currentCapital'
                          id='currentCapital'
                          value={currentCapital}
                          onChange={handleChange}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Current Capital'
                        />
                      </div>
                    </div>
                    <div className='mt-6 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Desired Yearly Capital for Retirement</label>
                        <input
                          type='text'
                          name='desiredYearlyCapital'
                          id='desiredYearlyCapital'
                          value={desiredYearlyCapital}
                          onChange={handleChange}
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
                <button
                  type='submit'
                  className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer min-w-full w-full'
                  disabled={isLoading}
                >
                  {isLoading
                    ? (
                      <div role='status' className='flex justify-center items-center'>
                        <svg aria-hidden='true' className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                          <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      )
                    : (
                        'View'
                      )}
                </button>
              </div>
            </div>
          </form>
          {!isLoading && calculatorContent.monthlyContributions && (
            <>
              <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 mb-8 mt-12'>Your Result</h1>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
                <div className='p-4 pb-10 bg-blue-500 text-white rounded-2xl shadow-2xl'>
                  <h1 className='font-bold lg:text-2xl'>Monthly Contributions</h1>
                  <div className='h-full flex justify-end items-end text-2xl font-bold'>
                    ${calculatorContent.monthlyContributions}
                  </div>
                </div>
                <div className='p-4 pb-10 bg-blue-500 text-white rounded-2xl shadow-2xl'>
                  <h1 className='font-bold lg:text-2xl'>Required Capital</h1>
                  <div className='h-full flex justify-end items-end text-2xl font-bold'>
                    ${calculatorContent.requiredCapital}
                  </div>
                </div>
                <div className='p-4 pb-10 bg-blue-500 text-white rounded-2xl shadow-2xl'>
                  <h1 className='font-bold lg:text-2xl'>Years Until Retirement</h1>
                  <div className='h-full flex justify-end items-end text-2xl font-bold'>
                    {calculatorContent.yearsUntilRetirement} Years
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
                <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 col-span-2'>
                  <p
                    className='text-slate-800 dark:text-white p-2'
                    dangerouslySetInnerHTML={{ __html: calculatorContent.message.split('\n').join('<br/>') }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RetirementCalculator
