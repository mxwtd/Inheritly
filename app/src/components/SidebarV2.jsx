import { useEffect, useState, useRef } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import NotificationsDropdown from './NotificationsDropdown'

import { useSelector } from 'react-redux'
import { useSendLogoutMutation } from '../features/authentication/services/authApiSlice'

const SidebarV2 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const navigate = useNavigate()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  const user = useSelector((state) => state.auth.userInformation)

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon.classList.remove('hidden')
    } else {
      themeToggleDarkIcon.classList.remove('hidden')
    }

    const themeToggleBtn = document.getElementById('theme-toggle')

    const handleThemeToggle = () => {
      themeToggleDarkIcon.classList.toggle('hidden')
      themeToggleLightIcon.classList.toggle('hidden')

      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        } else {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        }
      }
    }

    themeToggleBtn.addEventListener('click', handleThemeToggle)

    return () => {
      themeToggleBtn.removeEventListener('click', handleThemeToggle)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) navigate('/login')
  }, [isSuccess, navigate])

  const onLogoutClicked = () => sendLogout()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>{error.data?.message}</div>

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const content = (
    <>
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700'>
        <div className='px-3 py-4 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button data-drawer-target='logo-sidebar' data-drawer-toggle='logo-sidebar' aria-controls='logo-sidebar' type='button' className='inline-flex items-center p-2 text-sm text-slate-500 rounded-lg sm:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600'>
                <span className='sr-only'>Open sidebar</span>
                <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path clipRule='evenodd' fillRule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z' />
                </svg>
              </button>
              <Link to='/' className='flex ml-2 md:mr-24'>
                <img className='w-10 h-10 md:w-12 md:h-12 mr-2' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684267350/Inheritly_-_Third_design_qodghx.png' />
                <span className='self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white'>Inheritly</span>
              </Link>
            </div>
            <div className='flex items-center' ref={ref}>
              <div className='flex items-center ml-3'>
                <div className='flex items-center space-x-1 md:space-x-2'>
                  <div className='border-r-[1.5px] border-slate-500 dark:border-slate-400 pr-1 md:pr-3'>
                    <div className='mt-2.5 relative'>
                      <NotificationsDropdown />
                    </div>
                  </div>
                  <div className='pl-1'>
                    <button id='theme-toggle' type='button' className='text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-sm p-2'>
                      <svg id='theme-toggle-dark-icon' className='hidden w-5 h-5 md:w-6 md:h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' /></svg>
                      <svg id='theme-toggle-light-icon' className='hidden w-5 h-5 md:w-6 md:h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' fillRule='evenodd' clipRule='evenodd' /></svg>
                    </button>
                  </div>
                  <button type='button' onClick={toggleMenu} className='flex text-sm bg-slate-800 rounded-full focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600' aria-expanded='false' data-dropdown-toggle='dropdown-user'>
                    <span className='sr-only'>Open user menu</span>
                    <div className='w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden'>
                      <img className='w-full h-full object-cover' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' alt='user photo' />
                    </div>
                  </button>
                </div>
                {isOpen && (
                  <div className='z-50 fixed right-2 top-20 mt-3 text-base list-none bg-white divide-y divide-slate-100 rounded-lg shadow dark:bg-slate-700 dark:divide-slate-600' id='dropdown-user'>
                    <div className='px-4 py-3 bg-slate-100 dark:bg-slate-500 rounded-t-lg' role='none'>
                      <p className='text-sm text-slate-900 dark:text-white' role='none'>
                        {`${user.name} ${user.lastNames}`}
                      </p>
                      <p className='text-sm font-medium text-slate-600 truncate dark:text-slate-300' role='none'>
                        {user.email}
                      </p>
                    </div>
                    <ul className='py-1' role='none'>
                      <li>
                        <Link to='/' className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white' role='menuitem'>Dashboard</Link>
                      </li>
                      <li>
                        <Link to='/settings' className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white' role='menuitem'>Settings</Link>
                      </li>
                      <li>
                        <Link
                          className='block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white'
                          role='menuitem'
                          onClick={onLogoutClicked}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside id='logo-sidebar' className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-slate-200 sm:translate-x-0 dark:bg-slate-800 dark:border-slate-700' aria-label='Sidebar'>
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-800'>
          <h2 className='text-slate-900 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 py-4 mb-3'>Dashboard</h2>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link to='/overview' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg aria-hidden='true' className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z' /><path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z' /></svg>
                <span className='ml-3'>Overview</span>
              </Link>
            </li>
            <li>
              <Link to='/investments' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg aria-hidden='true' className='flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' /></svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Investments</span>
                <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-slate-800 bg-slate-200 rounded-full dark:bg-slate-700 dark:text-slate-300'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/inbox' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg aria-hidden='true' className='flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z' /><path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z' /></svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Inbox</span>
                <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>3</span>
              </Link>
            </li>
            <li>
              <Link to='/beneficiaries' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg aria-hidden='true' className='flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' /></svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Beneficiaries</span>
              </Link>
            </li>
          </ul>
          <h2 className='text-slate-900 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 py-4 mb-3 mt-3'>My Will</h2>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link to='/manage' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg fill='none' stroke='currentColor' className='w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' strokeWidth='1.5' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' /></svg>
                <span className='ml-3 mt-1'>Manage</span>
              </Link>
            </li>
            <li>
              <Link to='/generate' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg className='flex-shrink-0 w-5 h-5 ml-1 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' />
                </svg>
                <span className='flex-1 ml-3 mt-1 whitespace-nowrap'>Generate</span>
                <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-slate-800 bg-slate-200 rounded-full dark:bg-slate-700 dark:text-slate-300'>New</span>
              </Link>
            </li>
          </ul>
          <h2 className='text-slate-900 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 py-4 mb-3 mt-3'>Account</h2>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link to='/settings' className='flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg fill='none' className='flex-shrink-0 w-6 h-6 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495' /></svg>
                <span className='flex-1 ml-3 mt-1 whitespace-nowrap'>Settings</span>
                <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-slate-800 bg-slate-200 rounded-full dark:bg-slate-700 dark:text-slate-300'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/report' className='flex items-center p-2 mt-2.5 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700'>
                <svg fill='none' stroke='currentColor' strokeWidth={1.5} className='flex-shrink-0 w-5 h-5 ml-1 text-slate-500 transition duration-75 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' d='M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5' /></svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Report</span>
                <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300'>1</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <Outlet />
    </>
  )

  return content
}

export default SidebarV2
