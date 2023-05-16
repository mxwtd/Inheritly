import { useState } from 'react'
import ModalCloseButton from '../components/ModalCloseButton'
import MemberCircles from '../components/MemberCircles'

const Beneficiaries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardInfo, setCardInfo] = useState({})

  const handleButtonClick = (info) => {
    setCardInfo(info)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className='p-4 sm:ml-64'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Beneficiaries</h1>
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
            <div className='relative bg-white dark:bg-slate-800 py-6 px-6 rounded-xl w-64 my-4 shadow-xl'>
              <div className=' text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' />
                </svg>
              </div>
              <div className='mt-8'>
                <p className='text-xl font-semibold my-2 text-slate-800 dark:text-white'>{'{ Family Estate }'}</p>
                <div className='flex space-x-2 text-slate-600 dark:text-slate-400 text-sm my-3'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
                  </svg>
                  <p className='text-slate-600 dark:text-slate-400'>{'{ Family Surname }'}</p>
                </div>
                <div className='border-t dark:border-slate-500' />
                <div className='flex justify-between'>
                  <div className='my-5'>
                    <MemberCircles />
                  </div>
                  <div className='my-3'>
                    <p className='font-semibold text-base text-slate-600 dark:text-white'>Members</p>
                    <div className='text-base text-slate-400 font-semibold'>
                      <p>{'{ 7 }'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='w-full text-slate-600 hover:text-slate-100 bg-slate-400/[.3] hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-blue-500 dark:text-slate-300 dark:hover:text-slate-100 transition duration-200'
                    onClick={() => handleButtonClick({ title: 'Family Estate', surname: '{ Family Surname }', members: '{ 7 }' })}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <>
              <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className='bg-white dark:bg-slate-800 py-6 px-6 rounded-lg w-3/4 h-3/4 my-4 shadow-xl overflow-y-auto'>
                  <div className='flex flex-end'>
                    <ModalCloseButton onClick={() => setIsModalOpen(false)} />
                  </div>
                  <div>
                    <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>{cardInfo.title}</h1>
                  </div>
                  <div
                    className='grid grid-cols-3 grid-rows-3 gap-6 h-[70%]'
                    style={{
                      gridTemplateAreas: `
                        "item1 item3 item4"
                        "item2 item3 item4"
                        "item2 item3 item4"
                      `
                    }}
                  >
                    <div
                      className='bg-slate-300 dark:bg-slate-500 dark:text-white p-4 rounded-xl col-span-1 row-span-1'
                      style={{ gridArea: 'item1' }}
                    >
                      <h1>{cardInfo.surname}</h1>
                    </div>
                    <div
                      className='bg-slate-300 dark:bg-slate-500 dark:text-white p-4 rounded-xl col-span-1 row-span-2'
                      style={{ gridArea: 'item2' }}
                    >
                      <h1>Members</h1>
                      <p>{cardInfo.members}</p>
                    </div>
                    <div
                      className='bg-slate-300 dark:bg-slate-500 dark:text-white p-4 rounded-xl col-span-1 row-span-3'
                      style={{ gridArea: 'item3' }}
                    >
                      <span>Item 3</span>
                    </div>
                    <div
                      className='bg-slate-300 dark:bg-slate-500 dark:text-white p-4 rounded-xl col-span-1 row-span-3'
                      style={{ gridArea: 'item4' }}
                    >
                      <span>Item 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Beneficiaries
