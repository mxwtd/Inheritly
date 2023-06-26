const AddNewContainer = () => {
  return (
    <>
      <div className='min-h-screen'>
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
            You have no added Properties yet.
          </h1>
        </div>
        <div className='bg-white dark:bg-slate-800 text-slate-800 dark:text-white my-4 p-4 rounded-xl'>
          <div className='flex flex-col justify-center items-center p-4 gap-4'>
            <svg className='w-14 h-14' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z' />
            </svg>
            <h1 className='text-2xl font-bold'>
              Add a New Property to your Portfolio.
            </h1>
            <h2 className='text-xl'>
              Click the button above to get started.
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewContainer
