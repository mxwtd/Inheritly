import { Link } from 'react-router-dom'

const Template = ({ children, formTitle }) => {
  return (
    <>
      <div className="px-8 lg:px-4 bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683277801/Light_ekxcia.svg')] dark:bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683278025/Dark_b0r36s.svg')] bg-cover bg-center bg-no-repeat max-h-screen overflow-y-hidden">
        <div className='flex flex-col items-center justify-center mx-auto min-h-screen'>
          <Link to='/' className='flex items-center mb-8 text-4xl font-semibold text-slate-700 dark:text-white'>
            <img className='w-10 h-10 md:w-12 md:h-12 mr-2' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684267350/Inheritly_-_Third_design_qodghx.png' />
            <span className='text-2xl md:text-4xl font-semibold whitespace-nowrap dark:text-white'>Inheritly</span>
          </Link>
          <div className='w-full bg-white/[.09] backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-800/[.3] dark:border-slate-700'>
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
