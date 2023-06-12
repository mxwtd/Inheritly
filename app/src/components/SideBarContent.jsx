import { Link } from 'react-router-dom'

const SideBarContent = () => {
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
}

export default SideBarContent
