import { useState } from 'react'

const AssetList = () => {
  // Modal Open and Close
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='p-4 sm:ml-64 h-screen'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Your {'{'} Assets {'}'}</h1>
          </div>
          <div>
            {/* Modal overlay */}
            {isModalOpen &&
              <div className='fixed inset-0 bg-black bg-opacity-70 z-40' />}
            {/* Main modal */}
            <div id='defaultModal' className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full ${isModalOpen ? '' : 'hidden'}`}>
              <div className='relative z-40 p-4 w-full max-w-2xl md:h-auto bg-white rounded-lg shadow dark:bg-slate-800 sm:p-5 mx-8'>
                {/* Modal content */}
                <div className='relative p-4 rounded-lg dark:bg-slate-800 sm:p-5'>
                  {/* Modal header */}
                  <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-slate-600'>
                    <h2 className='text-xl font-semibold text-slate-900 dark:text-white'>
                      Add Investment
                    </h2>
                    <button type='button' className='text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white' onClick={() => setIsModalOpen(false)}>
                      <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <form action='#'>
                    <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                      <div>
                        <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Name</label>
                        <input type='text' name='name' id='name' className='bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Investment Name (E.g. Microsoft)' required='' />
                      </div>
                      <div>
                        <label htmlFor='identification' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Identification</label>
                        <input type='text' name='identification' id='identification' className='bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Identification (E.g. Stock Ticker)' required='' />
                      </div>
                      <div>
                        <label htmlFor='units' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Units</label>
                        <input type='number' name='units' id='units' className='bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='45' required='' />
                      </div>
                      <div>
                        <label htmlFor='category' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Category</label>
                        <select id='category' className='bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                          <option selected=''><span className='text-slate-500 dark:text-slate-400'>Select Category</span></option>
                          <option value='Stocks' id='Stocks'>Stocks</option>
                          <option value='Bonds' id='Bonds'>Bonds</option>
                          <option value='Funds' id='Funds'>Funds</option>
                          <option value='Commodities' id='Commodities'>Commodities</option>
                          <option value='Crypto' id='Crypto'>Crypto</option>
                          <option value='Property' id='Property'>Property</option>
                          <option value='Vehicles' id='Vehicles'>Vehicles</option>
                          <option value='Jewelery' id='Jewelery'>Jewelery</option>
                          <option value='Miscellaneous' id='Miscellaneous'>Miscellaneous</option>
                        </select>
                      </div>
                      <div className='sm:col-span-2'>
                        <label htmlFor='description' className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Description</label>
                        <textarea id='description' rows='4' className='block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Write Investment description here' />
                      </div>
                      <div className='sm:col-span-2'>
                        <label className='block mb-2 text-sm font-medium text-slate-900 dark:text-white'>Add a file</label>
                        <label htmlFor='dropzone-file' className='flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600'>
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <svg aria-hidden='true' className='w-10 h-10 mb-3 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' /></svg>
                            <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>PDF, PNG, JPG or GIF</p>
                          </div>
                          <input id='dropzone-file' type='file' className='hidden' />
                        </label>
                      </div>
                    </div>
                    <button type='submit' className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                      <svg className='mr-1 -ml-1 w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' /></svg>
                      Add new Investment
                    </button>
                  </form>
                </div>
              </div>
            </div>
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
              <button id='defaultModalButton' onClick={() => setIsModalOpen(true)} className='ml-2 mt-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 hover:bg-blue text-white font-semibold rounded-lg shadow-md'>
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
                    Raytheon Technologies Corp
                  </th>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    $RTX
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    Stocks
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
