const AddButton = ({ onClick, children }) => {
  return (
    <button id='defaultModalButton' className='py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md' onClick={onClick}>
      <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
        <path fillRule='evenodd' clipRule='evenodd' d='M11 9V5a1 1 0 00-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z' />
      </svg>
      {children}
    </button>
  )
}

export default AddButton
