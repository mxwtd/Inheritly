const SignUp = ({ toggleSignUp }) => {
  return (
    <form className='space-y-4 md:space-y-6' action='#'>
      <div>
        <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your name</label>
        <input type='text' name='name' id='name' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Your name' required='' />
      </div>
      <div>
        <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
        <input type='email' name='email' id='email' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@company.com' required='' />
      </div>
      <div>
        <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Password</label>
        <input type='password' name='password' id='password' placeholder='••••••••' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required='' />
      </div>
      <div>
        <label htmlFor='repeatPassword' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Repeat password</label>
        <input type='password' name='repeatPassword' id='repeatPassword' placeholder='••••••••' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required='' />
      </div>
      <div className='flex items-center justify-between'>
        <button type='submit' className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Sign up</button>
      </div>
      <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
        <button onClick={toggleSignUp} className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Already have an account?</button>
      </p>
    </form>
  )
}

export default SignUp
