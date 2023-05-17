import { useState, useEffect, useRef } from 'react'

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button onClick={toggleDropdown} id='dropdownNotificationButton' data-dropdown-toggle='dropdownNotification' className='inline-flex items-center text-sm font-medium text-center text-slate-700 hover:text-slate-900 focus:outline-none dark:hover:text-white dark:text-slate-400' type='button'>
        <svg className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' /></svg>
        <div className='relative flex'>
          <div className='relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-slate-900' />
        </div>
      </button>
      {isOpen && (
        <div ref={dropdownRef} id='dropdownNotification' className='z-20 fixed max-w-xs right-7 md:right-5 mt-8 bg-white divide-y divide-slate-100 rounded-lg shadow dark:bg-slate-800 dark:divide-slate-700' aria-labelledby='dropdownNotificationButton'>
          <div className='block px-4 py-2 font-medium text-center text-slate-700 rounded-t-lg bg-slate-50 dark:bg-slate-800 dark:text-white'>
            Notifications
          </div>
          <a href='#' className='flex px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700'>
            <div className='flex-shrink-0'>
              <img className='rounded-full w-11 h-11' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' alt='User Profile Picture' />
              <div className='absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-slate-900 border border-white rounded-full dark:border-slate-800'>
                <svg className='w-3 h-3 text-white' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' /></svg>
              </div>
            </div>
            <div className='w-full pl-3'>
              <div className='text-slate-500 text-sm mb-1.5 dark:text-slate-400'><span className='font-semibold text-slate-900 dark:text-white'>Santi Mr Worldwide</span> and <span className='font-medium text-slate-900 dark:text-white'>2 others</span> have joined {'{ Family Estate }'}</div>
              <div className='text-xs text-blue-600 dark:text-blue-500'>10 minutes ago</div>
            </div>
          </a>
        </div>
      )}
    </>
  )
}

export default NotificationsDropdown
