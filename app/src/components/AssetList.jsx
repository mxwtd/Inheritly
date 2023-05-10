const AssetList = () => {
  return (
    <>
      <div className='p-4 sm:ml-64 h-screen'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>Your {'{'} Assets {'}'}</h1>
          </div>
          <div className='relative overflow-x-auto rounded-xl'>
            <div className='pb-4 flex justify-between items-center'>
              <label htmlFor='table-search' className='sr-only'>Search</label>
              <div className='relative mt-1'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg className='w-5 h-5 text-slate-500 dark:text-slate-400' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' /></svg>
                </div>
                <input type='text' id='table-search' className='block p-2 pl-10 ml-0.5 text-sm text-slate-900 border border-slate-300 rounded-lg w-60 lg:w-80 bg-slate-50 focus:ring-slate-600 focus:border-slate-700 dark:bg-slate-700 dark:border-slate-400 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-200' placeholder='Search...' />
              </div>
              <button className='ml-2 mt-1 py-2 px-3 bg-blue-600 hover:bg-blue text-white font-semibold rounded-lg shadow-md'>
                <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' clipRule='evenodd' d='M11 9V5a1 1 0 00-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z' /></svg>
              </button>
            </div>
            <table className='w-full text-sm text-left text-slate-500 dark:text-slate-400'>
              <thead className='text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-500 dark:text-slate-800'>
                <tr>
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-all-search' type='checkbox' className='w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:focus:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600' />
                      <label htmlFor='checkbox-all-search' className='sr-only'>checkbox</label>
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Asset Name
                  </th>
                  <th scope='col' className='px-6 py-3 hidden lg:table-cell'>
                    Identification
                  </th>
                  <th scope='col' className='px-6 py-3 hidden lg:table-cell'>
                    Category
                  </th>
                  <th scope='col' className='px-6 py-3 hidden lg:table-cell'>
                    Units
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-table-search-1' type='checkbox' className='w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:focus:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600' />
                      <label htmlFor='checkbox-table-search-1' className='sr-only'>checkbox</label>
                    </div>
                  </td>
                  <th scope='row' className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white'>
                    S&P 500 - Vanguard
                  </th>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    $VOO
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    Funds
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    78
                  </td>
                  <td className='px-6 py-4'>
                    <a href='#' className='font-medium text-blue-600 dark:text-blue-300 hover:underline'>Edit</a>
                  </td>
                </tr>
                <tr className='bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-table-search-2' type='checkbox' className='w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:focus:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600' />
                      <label htmlFor='checkbox-table-search-2' className='sr-only'>checkbox</label>
                    </div>
                  </td>
                  <th scope='row' className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white'>
                    Microsoft
                  </th>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    $MSFT
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    Stocks
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    27
                  </td>
                  <td className='px-6 py-4'>
                    <a href='#' className='font-medium text-blue-600 dark:text-blue-300 hover:underline'>Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssetList
