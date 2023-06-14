import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Properties from '../index.jsx'

import { useAddNewPropertyMutation } from '../services/propertiesApiSlice'
// import { uploadPhotoToCloudStorage } from '../../../services/gcp/uploadToCloudStorage.js'
// import { useSelector } from 'react-redux'
// import { userInformation } from '../../authentication/hooks/authSlice.js'

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
  const [photo, setPhoto] = useState({})
  const [files, setFiles] = useState('')

  // const userInformationData = useSelector(userInformation)

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
  const onFilesChanged = e => setFiles(e.target.files)
  const onPhotoChanged = e => setPhoto(e.target.files[0])

  const canSave = [name, country, currency, date, value, taxStatus, type, city, address, zip].every(Boolean) && !isLoading

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    console.log('create button clicked')

    if (canSave) {
      const formData = new FormData(e.target)
      // const formData = new FormData()

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i])
        }
      }

      console.log('photo state', photo)

      console.log('photo', formData.get('photo'))

      const responseWithBody = await addNewProperty(formData)

      console.log('responseWithBody', responseWithBody)
    }
  }

  const errClass = isError ? 'error msg' : 'offscreen'
  // const validNameClass = !name ? 'form__input--incomplete' : ''
  // const validCountryClass = !country ? 'form__input--incomplete' : ''

  const content = (
    <Properties backTo='/investments/properties'>
      <p className={errClass}>{error?.data?.message}</p>
      <div className='bg-white dark:bg-slate-800 shadow-lg p-10 rounded-lg mx-4'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Property</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6' action='#'>
          <div>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Your name</label>
            <input
              type='text'
              value={name}
              name='name'
              id='name'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Property name'
              onChange={onNameChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='currency' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Currency</label>
            <input
              type='text'
              value={currency}
              name='currency'
              id='currency'
              placeholder='USD'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onCurrencyChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='date' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Date</label>
            <input
              type='date'
              value={date}
              name='date'
              id='date'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onDateChanged}
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
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onValueChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='taxStatus' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Tax Status</label>
            <input
              type='taxStatus'
              value={taxStatus}
              name='taxStatus'
              id='taxStatus'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onTaxStatusChanged}
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
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onTypeChanged}
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
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onCityChanged}
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
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onCountryChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='address' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Address</label>
            <input
              type='address'
              value={address}
              name='address'
              id='address'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onAddressChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='zip' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Zip</label>
            <input
              type='zip'
              value={zip}
              name='zip'
              id='zip'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={onZipChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='photo' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Photo</label>
            <input
              type='file'
              name='photo'
              accept='image/*'
              id='photo'
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-4 focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 text-center dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-4 dark:focus:border-blue-500'
              onChange={onPhotoChanged}
              required=''
            />
          </div>
          <div>
            <label htmlFor='files' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Add files</label>
            <input
              type='file'
              name='files'
              accept='*.pdf'
              id='files'
              onChange={onFilesChanged}
              className='bg-slate-50/[.3] border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-4 focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 text-center dark:bg-slate-700/[.3] dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-4 dark:focus:border-blue-500'
            />
          </div>
          <button className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Create</button>
        </form>
      </div>
    </Properties>
  )

  return content
}

export default NewPropertyForm
