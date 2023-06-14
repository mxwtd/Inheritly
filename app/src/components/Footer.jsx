const Footer = () => {
  return (
    <>
      <div className='p-4 sm:ml-64'>
        <div className='mt-14'>
          <footer className='sticky bg-white rounded-2xl shadow-xl m-4 dark:bg-slate-800'>
            <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
              <span className='text-sm text-slate-500 sm:text-center dark:text-slate-400'>© 2023 Inheritly.</span>
              <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 sm:mt-0'>
                <li>
                  <a href='#' className='mr-4 hover:underline md:mr-6 '>About</a>
                </li>
                <li>
                  <a href='#' className='mr-4 hover:underline md:mr-6'>Privacy Policy</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Contact</a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Footer
