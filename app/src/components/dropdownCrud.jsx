import { useState, useEffect, useRef } from 'react'

const DropdownCrud = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button onClick={toggleDropdown} className='inline-flex items-center p-2 text-sm font-medium text-center text-slate-900 bg-white rounded-lg hover:bg-slate-100 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700' type='button'>
        <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' /></svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div ref={dropdownRef} className='z-10 mt-11 absolute bg-slate-100 divide-y divide-slate-200 rounded-lg shadow w-34 dark:bg-slate-700 dark:divide-slate-600'>
          <ul className='py-2 text-sm text-slate-700 dark:text-slate-200'>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-600 dark:hover:text-white'>Edit</a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-600 dark:hover:text-white'>Delete</a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default DropdownCrud
