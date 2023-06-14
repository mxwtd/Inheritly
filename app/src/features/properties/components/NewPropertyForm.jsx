import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Properties from '../index.jsx'

import { useAddNewPropertyMutation } from '../services/propertiesApiSlice'

const NewPropertyForm = () => {
  const [addNewProperty, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewPropertyMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [date, setDate] = useState('')
  const [value, setValue] = useState('')
  const [taxStatus, setTaxStatus] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('')
  const [photo, setPhoto] = useState('')
  const [files, setFiles] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setCountry('')
      setCurrency('')
      setDate('')
      setValue('')
      setTaxStatus('')
      setType('')
      setCity('')
      setAddress('')
      setZip('')
      setPhoto('')

      navigate('/investments/properties')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onCountryChanged = e => setCountry(e.target.value)
  const onCurrencyChanged = e => setCurrency(e.target.value)
  const onDateChanged = e => setDate(e.target.value)
  const onValueChanged = e => setValue(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onTypeChanged = e => setType(e.target.value)
  const onCityChanged = e => setCity(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onZipChanged = e => setZip(e.target.value)
  const onPhotoChanged = e => setPhoto(e.target.files[0])
  const onFilesChanged = e => setFiles(e.target.files)

  const canSave = [name, country, currency, date, value, taxStatus, type, city, address, zip].every(Boolean) && !isLoading

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    console.log('create button clicked')

    if (canSave) {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('country', country)
      formData.append('currency', currency)
      formData.append('date', date)
      formData.append('value', value)
      formData.append('taxStatus', taxStatus)
      formData.append('type', type)
      formData.append('city', city)
      formData.append('address', address)
      formData.append('zip', zip)
      formData.append('photo', photo)

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i])
        }
      }

      console.log('formData name', formData.get('name'))
      console.log('Call the add new property API')
      await addNewProperty(formData)
    }
  }

  const errClass = isError ? 'error msg' : 'offscreen'
  // const validNameClass = !name ? 'form__input--incomplete' : ''
  // const validCountryClass = !country ? 'form__input--incomplete' : ''

  const content = (
    <Properties backTo='/investments/properties'>
      <p className={errClass}>{error?.data?.message}</p>
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Property</h1>
        </div>
        <form onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6' action='#'>
          <div className='md:flex md:justify-between'>
            <div className='md:w-1/2 md:pr-2'>
              <div className='mb-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your name</label>
                <input
                  type='text'
                  value={name}
                  name='name'
                  id='name'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Property name'
                  onChange={onNameChanged}
                  required=''
                />
              </div>
              <div>
                <label htmlFor='type' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Type</label>
                <input
                  type='type'
                  value={type}
                  name='type'
                  id='type'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onTypeChanged}
                  required=''
                />
              </div>
            </div>
            <div className='md:w-1/2 md:pl-2'>
              <div className='mb-2'>
                <label htmlFor='currency' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Currency</label>
                <input
                  type='text'
                  value={currency}
                  name='currency'
                  id='currency'
                  placeholder='USD'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onCurrencyChanged}
                  required=''
                />
              </div>
              <div>
                <label htmlFor='value' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Value</label>
                <input
                  type='value'
                  value={value}
                  name='value'
                  id='value'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onValueChanged}
                  required=''
                />
              </div>
            </div>
          </div>
          <div className='md:flex md:justify-between'>
            <div className='md:w-1/2 md:pr-2'>
              <label htmlFor='date' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Date</label>
              <input
                type='date'
                value={date}
                name='date'
                id='date'
                className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={onDateChanged}
                required=''
              />
            </div>
            <div className='md:w-1/2 md:pl-2'>
              <label htmlFor='taxStatus' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Tax Status</label>
              <input
                type='taxStatus'
                value={taxStatus}
                name='taxStatus'
                id='taxStatus'
                className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={onTaxStatusChanged}
                required=''
              />
            </div>
          </div>
          <div className='md:flex md:justify-between'>
            <div className='md:w-1/2 md:pr-2'>
              <div className='mb-2'>
                <label htmlFor='address' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Address</label>
                <input
                  type='address'
                  value={address}
                  name='address'
                  id='address'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onAddressChanged}
                  required=''
                />
              </div>
              <div>
                <label htmlFor='city' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>City</label>
                <input
                  type='city'
                  value={city}
                  name='city'
                  id='city'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onCityChanged}
                  required=''
                />
              </div>
            </div>
            <div className='md:w-1/2 md:pl-2'>
              <div className='mb-2'>
                <label htmlFor='zip' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Postcode / Zip</label>
                <input
                  type='zip'
                  value={zip}
                  name='zip'
                  id='zip'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onZipChanged}
                  required=''
                />
              </div>
              <div>
                <label htmlFor='country' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Country</label>
                <input
                  type='text'
                  value={country}
                  name='country'
                  id='country'
                  placeholder='Country Name'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onCountryChanged}
                  required=''
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor='photo' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Photo</label>
            <label htmlFor='photo' className='flex flex-col items-center justify-center w-full h-44 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:text-white  dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg aria-hidden='true' className='w-10 h-10 mb-3 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
                </svg>
                <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                <p className='text-xs text-slate-500 dark:text-slate-400'>PDF, PNG, JPG or GIF</p>
              </div>
              <input
                type='file'
                name='photo'
                accept='image/*'
                id='photo'
                className='hidden'
                onChange={onPhotoChanged}
                required=''
              />
            </label>
          </div>
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
                accept='*.pdf'
                id='files'
                className='hidden'
                onChange={onFilesChanged}
              />
            </label>
          </div>
          <button className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'>Create</button>
        </form>
      </div>

    </Properties>
  )

  return content
}

export default NewPropertyForm
