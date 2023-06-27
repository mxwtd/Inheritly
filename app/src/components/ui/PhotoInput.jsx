import { useState } from 'react'

const PhotoInput = () => {
  const [photo, setPhoto] = useState(null)

  const onPhotoChanged = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
        setPhoto(e.target.result)
      }

      reader.readAsDataURL(event.target.files[0])
    }
  }

  return (
    <div className='md:w-2/3 md:mr-12'>
      <label htmlFor='photo' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Photo</label>
      <label htmlFor='photo' className='flex flex-col items-center justify-center w-full h-60 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-200 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-300 dark:text-white  dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600'>
        {photo
          ? (
            <img src={photo} alt='Selected' className='object-cover w-full h-60 rounded-lg' />
            )
          : (
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg aria-hidden='true' className='w-10 h-10 mb-3 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
              </svg>
              <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
              <p className='text-xs text-slate-500 dark:text-slate-400'>PDF, PNG or JPG</p>
            </div>
            )}
        <input
          type='file'
          name='photo'
          accept='image/*'
          id='photo'
          className='hidden'
          onChange={onPhotoChanged}
        />
      </label>
    </div>
  )
}

export default PhotoInput
