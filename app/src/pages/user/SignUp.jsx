import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Template from '../../components/form/user/Template'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authentication/hooks/authSlice'
import { useCreateUserMutation } from '../../features/users/services/usersApiSlice'
import { useLoginMutation } from '../../features/authentication/services/authApiSlice'
// import HCaptcha from '@hcaptcha/react-hcaptcha'
import usePersist from '../../hook/usePersist'

const SignUp = ({ toggleSignUp }) => {
  const userRef = useRef()
  const errRef = useRef()

  const [step, setStep] = useState(0)
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

  const [createUser, { isLoading: createUserIsLoading }] = useCreateUserMutation()
  const [login, { isLoading: loginIsLoading }] = useLoginMutation()

  const errClass = errMsg ? 'errMsg' : 'offscreen'
  // const [hCaptchaToken, setHCaptchaToken] = useState(null)

  // const handleVerificationSuccess = (token, ekey) => {
  //   setHCaptchaToken(token)
  // }

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [userData])

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()

    if (createUserIsLoading || loginIsLoading) {
      return
    }

    const { email, name, username, question, answer, password, lastNames, repeatPassword } = userData
    if (password !== repeatPassword) {
      setErrMsg('Passwords do not match.')
      return
    }

    if (step === 2) {
      // if (!hCaptchaToken) {
      //   setErrMsg('Please verify the captcha before proceeding.')
      //   return
      // }

      try {
        const userCreated = await createUser({ email, name, username, question, answer, password, lastNames }).unwrap()
        console.log('userCreated', userCreated)
        setPersist(true)
        const accessToken = await login({ email, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        navigate('/')
      } catch (err) {
        if (!err.status) {
          setErrMsg('No server response. Try again later.')
        } else {
          setErrMsg(err.data?.message)
        }
        errRef.current.focus()
      }
    } else {
      setStep(step + 1)
    }
  }

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleBackClick = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  let content

  if (createUserIsLoading) {
    content = <div>Loading... (Creating User)</div>
  } else if (loginIsLoading) {
    content = <div>Loading... (Logging In)</div>
  } else {
    content = (
      <form onSubmit={handleSignUpSubmit} className='min-w-full'>
        <div className='flex flex-col min-w-full'>
          {step === 0 && (
            <>
              <div className='flex flex-row mb-4 gap-4'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>First Name</label>
                  <input type='text' name='name' placeholder='First Name' value={userData.name} onChange={handleInputChange} required className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor='lastNames' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Surname</label>
                  <input type='text' name='lastNames' placeholder='Surname' value={userData.lastNames} onChange={handleInputChange} required className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                </div>
              </div>

              <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Email</label>
              <input ref={userRef} type='email' name='email' placeholder='Your Email' value={userData.email} onChange={handleInputChange} required className='mb-4 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

              <label htmlFor='username' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Username</label>
              <input type='text' name='username' placeholder='Pick a Username' value={userData.username} onChange={handleInputChange} required className='mb-8 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

              <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Next</button>
            </>
          )}
          {step === 1 && (
            <>
              <div className='full mb-4'>
                <button type='button' onClick={handleBackClick} className='mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100'>❮ Go back</button>
                <label htmlFor='question' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Security Question</label>
                <input type='text' name='question' placeholder={"What was your dog's first name?"} value={userData.question} onChange={handleInputChange} required className='mb-4 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                <label htmlFor='answer' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Answer</label>
                <input type='text' name='answer' placeholder='Venus' value={userData.answer} onChange={handleInputChange} required className='mb-8 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                <button type='submit' className='min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Next</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className='full mb-4'>
                <button type='button' onClick={handleBackClick} className='mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100'>❮ Go back</button>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Choose a Password</label>
                <input type='password' name='password' placeholder='●●●●●●●●' value={userData.password} onChange={handleInputChange} required className='mb-4 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                <label htmlFor='repeatPassword' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Confirm Password</label>
                <input type='password' name='repeatPassword' placeholder='●●●●●●●●' value={userData.repeatPassword} onChange={handleInputChange} required className='mb-8 bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                <div className='pb-4 flex justify-center items-center'>
                  {/* <HCaptcha
                    sitekey=''
                    onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
                  /> */}
                </div>
                <button type='submit' className='min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit</button>
              </div>
            </>
          )}
        </div>
      </form>

    )
  }

  return (
    <Template toggleSignUp={toggleSignUp} formTitle='Create an account'>
      <div className='px-3'>
        <div className='flex justify-center w-full'>
          <ol className='flex w-full'>
            <li className={step >= 1 ? 'flex items-center text-blue-600 dark:text-blue-500 after:content-[""] after:w-full after:h-1 after:border-b after:border-blue-200 after:border-4 after:inline-block dark:after:border-blue-800 flex-grow' : 'flex items-center text-blue-600 dark:text-blue-500 after:content-[""] after:w-full after:h-1 after:border-b after:border-slate-100 after:border-4 after:inline-block dark:after:border-blue-800 flex-grow'}>
              <div className='flex items-center justify-center w-10 h-10 bg-blue-200/90 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0'>
                <svg aria-hidden='true' className='w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z' clipRule='evenodd' /></svg>
              </div>
            </li>
            <li className={step >= 2 ? 'flex items-center text-blue-600 dark:text-blue-500 after:w-full after:h-1 after:border-b after:border-blue-200/80 after:border-4 after:inline-block dark:after:border-blue-800 flex-grow' : 'flex items-center text-gray-500 dark:text-gray-500 after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700 flex-grow'}>
              <div className={step >= 1 ? 'flex items-center justify-center w-10 h-10 bg-blue-200/90 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0' : 'flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-800 shrink-0'}>
                <svg aria-hidden='true' className={step >= 1 ? 'w-5 h-5 text-blue-600 lg:w-6 lg:h-6' : 'w-5 h-5 text-gray-600 lg:w-6 lg:h-6'} fill='none' strokeWidth={2} stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' /></svg>
              </div>
            </li>
            <li className='flex items-center'>
              <div className={step === 2 ? 'flex items-center justify-center w-10 h-10 bg-blue-200/90 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0' : 'flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-800 shrink-0'}>
                <svg aria-hidden='true' className={step === 2 ? 'w-5 h-5 text-blue-600 lg:w-6 lg:h-6' : 'w-5 h-5 text-gray-600 lg:w-6 lg:h-6'} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' /><path fillRule='evenodd' d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className='flex justify-center items-center min-w-full px-3'>
        <div className='form min-w-full'>
          {content}
        </div>
      </div>
      <p className={errClass} ref={errRef}>{errMsg}</p>
      <p className='text-sm font-light text-slate-500 dark:text-slate-400 text-center'>
        <Link to='/login' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Already have an account?</Link>
      </p>
    </Template>
  )
}

export default SignUp

// import { Link, useNavigate } from 'react-router-dom'
// import { useState, useRef, useEffect } from 'react'
// import Template from '../../components/form/user/template'

// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../../features/authentication/hooks/authSlice'
// import { useCreateUserMutation } from '../../features/users/services/usersApiSlice'
// import { useLoginMutation } from '../../features/authentication/services/authApiSlice'

// import usePersist from '../../hook/usePersist'

// const SignUp = ({ toggleSignUp }) => {
//   const userRef = useRef()
//   const errRef = useRef()

//   const [userData, setUserData] = useState({
//     email: '',
//     name: '',
//     lastNames: '',
//     username: '',
//     question: '',
//     answer: '',
//     password: '',
//     repeatPassword: ''
//   })

//   const [errMsg, setErrMsg] = useState('')
//   const [, setPersist] = usePersist()

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const [createUser, { createUserIsLoading }] = useCreateUserMutation()
//   const [login, { loginIsLoading }] = useLoginMutation()

//   const errClass = errMsg ? 'errMsg' : 'offscreen'

//   useEffect(() => {
//     userRef.current.focus()
//   }, [])

//   useEffect(() => {
//     setErrMsg('')
//   }, [userData])

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const { email, name, username, question, answer, password, lastNames, repeatPassword } = userData
//       if (password !== repeatPassword) {
//         setErrMsg('Passwords do not match.')
//         return
//       }

//       const userCreated = await createUser({ email, name, username, question, answer, password, lastNames }).unwrap()

//       console.log('userCreated', userCreated)

//       setPersist(true)
//       const accessToken = await login({ email, password }).unwrap()
//       dispatch(setCredentials({ accessToken }))

//       setUserData({
//         email: '',
//         name: '',
//         lastNames: '',
//         username: '',
//         question: '',
//         answer: '',
//         password: '',
//         repeatPassword: ''
//       })

//       navigate('/')
//     } catch (err) {
//       if (!err.status) {
//         setErrMsg('No server response. Try again later.')
//       } else {
//         setErrMsg(err.data?.message)
//       }
//       errRef.current.focus()
//     }
//   }

//   const handleEmailInput = (e) => setUserData({ ...userData, email: e.target.value })
//   const handleNameInput = (e) => setUserData({ ...userData, name: e.target.value })
//   const handleLastNamesInput = (e) => setUserData({ ...userData, lastNames: e.target.value })
//   const handleUsernameInput = (e) => setUserData({ ...userData, username: e.target.value })
//   const handleQuestionInput = (e) => setUserData({ ...userData, question: e.target.value })
//   const handleAnswerInput = (e) => setUserData({ ...userData, answer: e.target.value })
//   const handlePasswordInput = (e) => setUserData({ ...userData, password: e.target.value })
//   const handleRepeatPasswordInput = (e) => setUserData({ ...userData, repeatPassword: e.target.value })

//   let content

//   if (createUserIsLoading || loginIsLoading) {
//     content = <div>Loading...</div>
//   }

//   content = (
//     <Template formTitle='Sign up'>
//       <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
//       <form onSubmit={handleSignUpSubmit} className='space-y-4 md:space-y-1' action='#'>
//         <div>
//           <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
//           <input
//             type='email'
//             name='email'
//             ref={userRef}
//             value={userData.email}
//             onChange={handleEmailInput}
//             id='email'
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='name@company.com'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>First Name</label>
//           <input
//             type='text'
//             name='name'
//             id='name'
//             value={userData.name}
//             onChange={handleNameInput}
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='Your First Name'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='lastNames' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Surname</label>
//           <input
//             type='text'
//             name='lastNames'
//             id='lastNames'
//             value={userData.lastNames}
//             onChange={handleLastNamesInput}
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='Your Surname'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='username' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>User name</label>
//           <input
//             type='text'
//             name='username'
//             id='username'
//             value={userData.username}
//             onChange={handleUsernameInput}
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='Username'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='question' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Question</label>
//           <input
//             type='text'
//             name='question'
//             id='question'
//             value={userData.question}
//             onChange={handleQuestionInput}
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='What is the name of my first dog?'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='answer' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Answer</label>
//           <input
//             type='text'
//             name='answer'
//             id='answer'
//             value={userData.answer}
//             onChange={handleAnswerInput}
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='Venus'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Password</label>
//           <input
//             type='password'
//             name='password'
//             id='password'
//             value={userData.password}
//             onChange={handlePasswordInput}
//             placeholder='••••••••'
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             required=''
//           />
//         </div>
//         <div>
//           <label htmlFor='repeatPassword' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Repeat password</label>
//           <input
//             type='password'
//             name='repeatPassword'
//             id='repeatPassword'
//             value={userData.repeatPassword}
//             onChange={handleRepeatPasswordInput}
//             placeholder='••••••••'
//             className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             required=''
//           />
//         </div>
//         <div className='flex items-center justify-between'>
//           <button type='submit' className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Sign up</button>
//         </div>
//         <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
//           <Link to='/login' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Already have an account?</Link>
//         </p>
//       </form>
//     </Template>
//   )

//   return content
// }

// export default SignUp
