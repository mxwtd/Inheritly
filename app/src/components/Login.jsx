const Login = () => {
  return (
    <>
      <div className="p-4 sm:ml-64 bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683277801/Light_ekxcia.svg')] dark:bg-[url('https://res.cloudinary.com/djr22sgp3/image/upload/v1683278025/Dark_b0r36s.svg')] bg-cover bg-center bg-no-repeat">
        <div className='p-4 mt-14'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a href='#' className='flex items-center mb-12 text-4xl font-semibold text-slate-700 dark:text-white'>
              Inheritly
            </a>
            <div className='w-full bg-white/[.09] backdrop-blur-md rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-800/[.3] dark:border-slate-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-slate-700 md:text-2xl dark:text-white'>
                  Sign in to your account
                </h1>
                <form className='space-y-4 md:space-y-6' action='#'>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your email</label>
                    <input type='email' name='email' id='email' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@company.com' required='' />
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Password</label>
                    <input type='password' name='password' id='password' placeholder='••••••••' className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required='' />
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
                    <a href='#' className='text-sm font-medium text-slate-600 hover:underline dark:text-slate-400'>Forgot password?</a>
                  </div>
                  <button type='submit' className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Sign in</button>
                  <p className='text-sm font-light text-slate-500 dark:text-slate-400'>
                    <button href='#' className='p-2 rounded-lg font-medium text-slate-600 hover:underline dark:text-slate-500'>Sign up</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
