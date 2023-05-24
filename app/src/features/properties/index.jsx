import { Link } from 'react-router-dom'

const Properties = ({ children, title }) => {
  return (
    <>
      <div className='p-4 sm:ml-64'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8'>{title}</h1>

            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Properties
