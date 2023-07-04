import { Link } from 'react-router-dom'

const Commodities = ({ children, title, backTo }) => {
  return (
    <>
      <div className='p-4 sm:ml-64'>
        <div className='p-4 mt-14'>
          <div>
            <div className='my-5'>
              <Link to={backTo} className='text-slate-800 dark:text-white'>❮ Go back</Link>
            </div>
            <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>{title}</h1>

            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Commodities
