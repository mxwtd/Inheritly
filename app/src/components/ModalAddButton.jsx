const ModalAddButton = ({ onClick, children }) => {
  return (
    <div className='bg-slate-300 dark:bg-slate-400 hover:bg-blue-400 hover:dark:bg-blue-100 transition-all ease-in-out duration-150 rounded-full p-1'>
      <button id='defaultModalButton' className='p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full shadow-md' onClick={onClick}>
        <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' clipRule='evenodd' d='M11 9V5a1 1 0 00-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z' />
        </svg>
        {children}
      </button>
    </div>
  )
}

export default ModalAddButton
