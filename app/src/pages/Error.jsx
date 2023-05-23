import { Link } from 'react-router-dom'

const Error = ({ type }) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683277801/Light_ekxcia.svg')] dark:bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683278025/Dark_b0r36s.svg')] bg-cover bg-center bg-no-repeat overflow-y-hidden relative">
        <div className='absolute top-0 left-0 m-8'>
          <Link to='/' className='text-lg font-semibold text-slate-800 dark:text-slate-100'>❮ Go back</Link>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Link to='/' className='flex items-center mb-12 text-4xl font-semibold text-slate-700 dark:text-white'>
            <img className='w-14 h-14 mr-2' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684267350/Inheritly_-_Third_design_qodghx.png' />
            <h1>Inheritly</h1>
          </Link>
          <div className='px-6 py-8 mx-auto bg-white/[.09] backdrop-blur-md rounded-xl shadow dark:border sm:max-w-md xl:p-0 dark:bg-slate-800/[.3] dark:border-slate-700'>
            <div className='flex flex-col items-center justify-center p-12 gap-6'>
              <h1 className='text-2xl lg:text-6xl text-slate-800 dark:text-slate-200 font-bold'>Error!</h1>
              <h1 className='text-[4rem] lg:text-[10rem] text-slate-800 dark:text-slate-200 font-bold'>404</h1>
              <h2 className='text-lg lg:text-2xl text-slate-800 dark:text-slate-200'>{type}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error
