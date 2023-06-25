import { Link } from 'react-router-dom'

const LoginAgain = ({ errorMsg }) => {
  return (
    <div style={{ height: '100vh', overflowY: 'hidden' }} className='flex flex-col items-center justify-center'>
      <div className='bg-white dark:bg-slate-700 p-8 rounded-2xl flex flex-col items-center justify-center gap-6 shadow-xl'>
        <img className='w-10 h-10 md:w-12 md:h-12 mr-2' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1684267350/Inheritly_-_Third_design_qodghx.png' />
        <span className='self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white'>Inheritly</span>
        <div className='bg-slate-200 dark:bg-slate-800 p-6 rounded-xl'>
          <p className='text-2xl text-red-500'>{errorMsg}</p>
        </div>
        <Link to='/login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'>
          Login Again
        </Link>
      </div>
    </div>
  )
}

export default LoginAgain
