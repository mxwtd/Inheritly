const Inbox = () => {
  return (
    <>
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div className='p-4 mt-14'>
          <h1 className='text-3xl mt-6 md:text-4xl font-bold text-slate-800 dark:text-white'>Inbox</h1>
          <div className='relative overflow-x-auto shadow-md sm:rounded-2xl mt-10'>
            <div className='flex items-center justify-between py-4 bg-white dark:bg-gray-800 pr-8'>
              <div className='px-8'>
                <button id='dropdownActionButton' data-dropdown-toggle='dropdownAction' className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' type='button'>
                  <span className='sr-only'>Action button</span>
                  Action
                  <svg className='w-3 h-3 ml-2' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' /></svg>
                </button>
                <div id='dropdownAction' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'>
                  <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownActionButton'>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Reward</a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Promote</a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Activate account</a>
                    </li>
                  </ul>
                  <div className='py-1'>
                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>Delete User</a>
                  </div>
                </div>
              </div>
            </div>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-all-search' type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                      <label htmlFor='checkbox-all-search' className='sr-only'>checkbox</label>
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Message
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-table-search-1' type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
                      <label htmlFor='checkbox-table-search-1' className='sr-only'>checkbox</label>
                    </div>
                  </td>
                  <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
                    <img className='w-10 h-10 rounded-full' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684267350/Inheritly_-_Third_design_qodghx.png' alt='Inheritly Logo' />
                    <div className='pl-3'>
                      <div className='text-base font-semibold'>Inheritly</div>
                      <div className='font-normal text-gray-500'>admin@inheritly.com</div>
                    </div>
                  </th>
                  <td className='px-6 py-4'>
                    Thank you for joining!
                  </td>
                  <td className='px-6 py-4'>
                    <a href='#' type='button' data-modal-target='editUserModal' data-modal-show='editUserModal' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit user</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div id='editUserModal' tabIndex='-1' aria-hidden='true' className='fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
              <div className='relative w-full max-w-2xl max-h-full'>
                <h1>Message</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Inbox
