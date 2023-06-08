import { Link } from 'react-router-dom'

const LoginAgain = ({ errorMsg }) => {
  // using tailwind create a screen that cover the whole screen but also show the footer at bottom that said the errorMsg and a button blue link to the login page
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-2xl text-red-500'>{errorMsg}</div>
      <Link to='/login' className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </Link>
    </div>

  )
}

export default LoginAgain
