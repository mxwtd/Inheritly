import { Link } from 'react-router-dom'

const Error = ({ type }) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683277801/Light_ekxcia.svg')] dark:bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683278025/Dark_b0r36s.svg')] bg-cover bg-center bg-no-repeat overflow-y-hidden relative">
        <div className='absolute top-0 left-0 m-8'>
          <Link to='/' className='text-lg font-semibold text-gray-800 dark:text-gray-100'>❮ Go back</Link>
        </div>
        <div className='px-6 py-8 mx-auto bg-white/[.09] backdrop-blur-md rounded-xl shadow dark:border sm:max-w-md xl:p-0 dark:bg-slate-800/[.3] dark:border-slate-700'>
          <div className='flex flex-col items-center justify-center p-12 gap-6'>
            <h1 className='text-6xl text-slate-800 dark:text-slate-200 font-bold'>Error!</h1>
            <h2 className='text-2xl text-slate-800 dark:text-slate-200'>{type}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error
