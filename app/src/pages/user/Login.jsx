import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Template from '../../components/form/user/template'

import { useLoginMutation } from '../../features/authentication/services/authApiSlice'

import usePersist from '../../hook/usePersist'

const Login = () => {
  const [login, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useLoginMutation()

  const userRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  // const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      setEmail('')
      setPassword('')

      navigate('/')
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await login({ email, password }).unwrap()
  }

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleToggle = () => {
    setPersist(prev => !prev)
    console.log('handleToggle', persist)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <>
      <Template formTitle='Sign in to your account'>
        <p className={errClass}>
          {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
          }
        </p>
        <form onSubmit={handleLoginSubmit} className='space-y-4 md:space-y-6' action='#'>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
            <input
              type='email'
              id='email'
              ref={userRef}
              value={email}
              name='email'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@company.com'
              onChange={handleEmailInput}
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
              onChange={handlePasswordInput}
              required=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  onChange={handleToggle}
                  checked={persist}
                  className='w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-slate-600 dark:ring-offset-slate-800'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='remember' className='text-slate-600 dark:text-slate-300'>Trust This Device</label>
              </div>
            </div>
            <Link to='/forgotPassword' className='text-sm font-medium text-slate-600 hover:underline dark:text-slate-400'>Forgot password?</Link>
          </div>
          <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Login</button>
          <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
            <Link to='/signUp' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Sign Up</Link>
          </p>
        </form>
      </Template>
    </>
  )

  return content
}

export default Login
