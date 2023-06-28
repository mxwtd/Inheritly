const FileInput = ({ onFilesChanged }) => {
  return (
    <div>
      <label htmlFor='files' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Add files</label>
      <label htmlFor='files' className='flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:text-white  dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600'>
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <svg aria-hidden='true' className='w-10 h-10 mb-3 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' /></svg>
          <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
          <p className='text-xs text-slate-500 dark:text-slate-400'>PDF, PNG, JPG or GIF</p>
        </div>
        <input
          type='file'
          name='files'
          accept='*.pdf *.png *.jpg *.gif *.jpeg *.doc *.docx *.xls *.xlsx *.ppt *.pptx *.txt'
          id='files'
          className='hidden'
          multiple
          onChange={onFilesChanged}
        />
      </label>
    </div>
  )
}

export default FileInput
