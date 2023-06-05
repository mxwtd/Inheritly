import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Template from '../../components/form/user/template'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authentication/hooks/authSlice'
import { useCreateUserMutation } from '../../features/users/services/usersApiSlice'
import { useLoginMutation } from '../../features/authentication/services/authApiSlice'

import usePersist from '../../hook/usePersist'

const SignUp = ({ toggleSignUp }) => {
  const userRef = useRef()
  const errRef = useRef()

  const [userData, setUserData] = useState({
    email: '',
    name: '',
    lastNames: '',
    username: '',
    question: '',
    answer: '',
    password: '',
    repeatPassword: ''
  })

  const [errMsg, setErrMsg] = useState('')
  const [, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createUser, { createUserIsLoading }] = useCreateUserMutation()
  const [login, { loginIsLoading }] = useLoginMutation()

  const errClass = errMsg ? 'errMsg' : 'offscreen'

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [userData])

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()

    try {
      const { email, name, username, question, answer, password, lastNames, repeatPassword } = userData
      if (password !== repeatPassword) {
        setErrMsg('Passwords do not match.')
        return
      }

      const userCreated = await createUser({ email, name, username, question, answer, password, lastNames }).unwrap()

      console.log('userCreated', userCreated)

      setPersist(true)
      const accessToken = await login({ email, password }).unwrap()
      dispatch(setCredentials({ accessToken }))

      setUserData({
        email: '',
        name: '',
        lastNames: '',
        username: '',
        question: '',
        answer: '',
        password: '',
        repeatPassword: ''
      })

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

  const handleEmailInput = (e) => setUserData({ ...userData, email: e.target.value })
  const handleNameInput = (e) => setUserData({ ...userData, name: e.target.value })
  const handleLastNamesInput = (e) => setUserData({ ...userData, lastNames: e.target.value })
  const handleUsernameInput = (e) => setUserData({ ...userData, username: e.target.value })
  const handleQuestionInput = (e) => setUserData({ ...userData, question: e.target.value })
  const handleAnswerInput = (e) => setUserData({ ...userData, answer: e.target.value })
  const handlePasswordInput = (e) => setUserData({ ...userData, password: e.target.value })
  const handleRepeatPasswordInput = (e) => setUserData({ ...userData, repeatPassword: e.target.value })

  let content

  if (createUserIsLoading || loginIsLoading) {
    content = <div>Loading...</div>
  }

  content = (
    <Template formTitle='Sign up'>
      <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
      <form onSubmit={handleSignUpSubmit} className='space-y-4 md:space-y-1' action='#'>
        <div>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
          <input
            type='email'
            name='email'
            ref={userRef}
            value={userData.email}
            onChange={handleEmailInput}
            id='email'
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@company.com'
            required=''
          />
        </div>
        <div>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={userData.name}
            onChange={handleNameInput}
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your name'
            required=''
          />
        </div>
        <div>
          <label htmlFor='lastNames' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your Last Names</label>
          <input
            type='text'
            name='lastNames'
            id='lastNames'
            value={userData.lastNames}
            onChange={handleLastNamesInput}
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your Last Names'
            required=''
          />
        </div>
        <div>
          <label htmlFor='username' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>User name</label>
          <input
            type='text'
            name='username'
            id='username'
            value={userData.username}
            onChange={handleUsernameInput}
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Username'
            required=''
          />
        </div>
        <div>
          <label htmlFor='question' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Question</label>
          <input
            type='text'
            name='question'
            id='question'
            value={userData.question}
            onChange={handleQuestionInput}
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='What is the name of my first dog?'
            required=''
          />
        </div>
        <div>
          <label htmlFor='answer' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Answer</label>
          <input
            type='text'
            name='answer'
            id='answer'
            value={userData.answer}
            onChange={handleAnswerInput}
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Venus'
            required=''
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={userData.password}
            onChange={handlePasswordInput}
            placeholder='••••••••'
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required=''
          />
        </div>
        <div>
          <label htmlFor='repeatPassword' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Repeat password</label>
          <input
            type='password'
            name='repeatPassword'
            id='repeatPassword'
            value={userData.repeatPassword}
            onChange={handleRepeatPasswordInput}
            placeholder='••••••••'
            className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required=''
          />
        </div>
        <div className='flex items-center justify-between'>
          <button type='submit' className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Sign up</button>
        </div>
        <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
          <Link to='/login' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Already have an account?</Link>
        </p>
      </form>
    </Template>
  )

  return content
}

export default SignUp
