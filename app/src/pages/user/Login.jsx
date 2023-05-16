import { useState } from 'react'
import { Link } from 'react-router-dom'
import Template from '../../components/form/user/template'
import { loginRequest } from '../../services/login'
import { useAuth } from '../../features/authentication/hooks/authProvider'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useAuth()

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    console.log('handleLoginSubmit')
    console.log('email', email)
    console.log('password', password)

    const user = await loginRequest({ email, password })

    window.localStorage.setItem(
      'loggedReviewAppUser', JSON.stringify(user)
    )
    // setToken(user.token)
    auth.login(user)

    // setUser(user)
    setEmail('')
    setPassword('')

    // try {
    //   const user = await loginRequest({ email, password })

    //   window.localStorage.setItem(
    //     'loggedReviewAppUser', JSON.stringify(user)
    //   )
    //   // setToken(user.token)
    //   auth.login(user)

    //   // setUser(user)
    //   setEmail('')
    //   setPassword('')
    // } catch (error) {
    //   // setError('Wrong credentials')
    //   // setTimeout(() => {
    //   //   setError(null)
    //   // }
    //   // , 5000)
    //   console.log('login error')
    // }
  }

  return (
    <>
      <Template formTitle='Sign in to your account'>
        <form onSubmit={handleLoginSubmit} className='space-y-4 md:space-y-6' action='#'>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
            <input
              type='email'
              value={email}
              name='email'
              id='email'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@company.com'
              onChange={({ target }) => setEmail(target.value)}
              required=''
            />
          </div>
          <div>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Password</label>
            <input
              type='password'
              value={password}
              name='password'
              id='password'
              placeholder='••••••••'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={({ target }) => setPassword(target.value)}
              required=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input id='remember' aria-describedby='remember' type='checkbox' className='w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-slate-600 dark:ring-offset-slate-800' required='' />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='remember' className='text-slate-600 dark:text-slate-300'>Remember me</label>
              </div>
            </div>
            <Link to='/forgotPassword' className='text-sm font-medium text-slate-600 hover:underline dark:text-slate-400'>Forgot password?</Link>
          </div>
          <button className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Login</button>
          <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
            <Link to='/signUp' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Sign Up</Link>
          </p>
        </form>
      </Template>
    </>
  )
}

export default Login
