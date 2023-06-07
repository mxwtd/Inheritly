import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Template from '../../components/form/user/template'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authentication/hooks/authSlice'
import { useLoginMutation } from '../../features/authentication/services/authApiSlice'

import usePersist from '../../hook/usePersist'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const errClass = errMsg ? 'errMsg' : 'offscreen'

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const accessToken = await login({ email, password }).unwrap()

      console.log('accessToken', accessToken)

      dispatch(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No server response. Try again later.')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
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

  const content = (
    <>
      <Template formTitle='Sign in to your account'>
        <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
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
          <button className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Login</button>
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
