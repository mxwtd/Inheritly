const Template = ({ children, formTitle }) => {
  return (
    <>
      <div className="p-4 bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683277801/Light_ekxcia.svg')] dark:bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683278025/Dark_b0r36s.svg')] bg-cover bg-center bg-no-repeat max-h-screen overflow-y-hidden">
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a href='#' className='flex items-center mb-12 text-4xl font-semibold text-slate-700 dark:text-white'>
            Inheritly
          </a>
          <div className='w-full bg-white/[.09] backdrop-blur-md rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-800/[.3] dark:border-slate-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl dark:text-white'>
                {formTitle}
              </h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Template
