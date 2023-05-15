import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Send email to server
    console.log(email)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6' action='#'>
      <div>
        <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
        <input type='email' name='email' id='email' onChange={handleEmailChange} className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@company.com' required='' />
      </div>
      <div>
        <button type='submit' className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Send reset link</button>
      </div>
      <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
        <Link to='/login' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Return to sign in</Link>
      </p>
    </form>
  )
}

export default ForgotPassword
