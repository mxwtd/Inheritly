import Properties from '../index'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUpdatePropertyMutation, useGetPropertyByIdQuery } from '../services/propertiesApiSlice'

import FieldInput from '../../../components/ui/FieldInput'
import FilesList from '../../../components/form/InvestmentType/FilesList'

const EditProperty = () => {
  const { id } = useParams()

  const {
    data: property
  } = useGetPropertyByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 900000
  })

  const [updateProperty, {
    isSuccess,
    isError,
    error
  }] = useUpdatePropertyMutation()

  const navigate = useNavigate()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [name, setName] = useState(property?.name || '')
  const [country, setCountry] = useState(property?.country || '')
  const [currency, setCurrency] = useState(property?.currency || '')
  const [date, setDate] = useState(() => {
    const originalDate = new Date(property?.date)
    return formatDate(originalDate)
  })
  const [value, setValue] = useState(property?.value || '')
  const [taxStatus, setTaxStatus] = useState(property?.taxStatus || '')
  const [type, setType] = useState(property?.type || '')
  const [city, setCity] = useState(property?.city || '')
  const [address, setAddress] = useState(property?.address || '')
  const [zip, setZip] = useState(property?.zip || '')

  const [contactInformation, setContactInformation] = useState({
    accountNumber: property?.contactInformation.accountNumber || '',
    email: property?.contactInformation.email || '',
    phone: property?.contactInformation.phone || '',
    companyAddress: property?.contactInformation?.companyAddress || ''
  } || {})

  const [photo, setPhoto] = useState(property?.photo || null)
  const [files, setFiles] = useState(property?.files || [])

  const [errors] = useState({ name: false, type: false, photo: false })

  useEffect(() => {
    console.log('property change')
    if (property) {
      setName(property.name)
      setCountry(property.country)
      setCurrency(property.currency)
      setDate(formatDate(new Date(property.date)))
      setValue(property.value)
      setTaxStatus(property.taxStatus)
      setType(property.type)
      setCity(property.city)
      setAddress(property.address)
      setZip(property.zip)
      setPhoto(property.photo)

      setContactInformation({
        accountNumber: property.contactInformation.accountNumber,
        email: property.contactInformation.email,
        phone: property.contactInformation.phone,
        companyAddress: property.contactInformation.companyAddress
      })

      setFiles(property.files)
    }
  }, [property, id])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/investments/properties/${id}`)
    }
  }, [id, isSuccess, navigate])

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

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  const onContactInformationChanged = (e) => setContactInformation({ ...contactInformation, [e.target.name]: e.target.value })

  const onPhotoChanged = (event) => {
    console.log('Photo changed')
    if (event.target.files && event.target.files[0]) {
      console.log('enter to conditional')
      const reader = new FileReader()

      console.log('result: ', event.target.result)
      console.log('old photo', photo)

      reader.onload = (e) => {
        setPhoto({
          ...photo,
          url: e.target.result
        })

        console.log('new photo', photo.url)
      }

      console.log('files: ', event.target.files[0])

      reader.readAsDataURL(event.target.files[0])
    }
  }

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    console.log('update button clicked')

    const propertyData = new FormData(e.target)

    console.log('PropertyData name: ', propertyData.get('name'))

    console.log('')

    if (files) {
      propertyData.delete('files')
      files.forEach(file => {
        if (file instanceof File) {
          propertyData.append('files', file)
          console.log('file: ', file)
        }
      })
    }

    await updateProperty({ id, propertyData })
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Properties backTo={`/investments/properties/${id}`}>
      <p className={errClass}>{error?.data?.message}</p>
      {
        (error?.data?.error === 'Forbidden token')
          ? (
            <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/login')}>Login Again</button>
            )
          : null
      }
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Edit {property?.name}</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6' action='#'>
          <p className={errClass}>
            {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
            }
          </p>
          <div className='md:flex md:justify-between items-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <div className='md:w-2/3 md:mr-12'>
              <label htmlFor='photo' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Photo</label>
              <label htmlFor='photo' className='flex flex-col items-center justify-center w-full h-60 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-200 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-300 dark:text-white  dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600'>
                {(photo?.url)
                  ? (
                    <img src={photo?.url} alt='Selected' className='object-cover w-full h-60 rounded-lg' />
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
                  required=''
                />
              </label>
            </div>
            <div className='md:w-1/2 md:pr-2'>
              <div className='mb-3'>
                <FieldInput label='Property name' value={name} onChange={onNameChanged} name='name' type='text' placeholder='Property name' errors={errors} isRequire />
              </div>
              <div>
                <FieldInput label='Type' value={type} onChange={onTypeChanged} name='type' type='text' placeholder='E.g. House, Apartment, etc.' errors={errors} isRequire />
              </div>
            </div>
            <div className='md:w-1/2 md:pl-2'>
              <div className='mb-3'>
                <FieldInput label='Currency' value={currency} onChange={onCurrencyChanged} name='currency' type='text' placeholder='E.g. USD' errors={errors} isRequire />
              </div>
              <div>
                <FieldInput label='Value' value={value} onChange={onValueChanged} name='value' type='text' placeholder='Property Value' errors={errors} isRequire />
              </div>
            </div>
          </div>
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Property Information</h3>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2 mt-2'>
                <FieldInput label='Date Of Purchase' value={date} onChange={onDateChanged} name='date' type='date' placeholder='Date Of Purchase' errors={errors} isRequire />
              </div>
              <div className='md:w-1/2 md:pl-2 mt-2'>
                <FieldInput label='Tax Status' value={taxStatus} onChange={onTaxStatusChanged} name='taxStatus' type='text' placeholder='E.g. Taxable, Tax Free, etc.' errors={errors} isRequire />
              </div>
            </div>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2 my-4'>
                <div className='mb-2'>
                  <FieldInput label='Address' value={address} onChange={onAddressChanged} name='address' type='text' placeholder='Street Address' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='City' value={city} onChange={onCityChanged} name='city' type='text' placeholder='City Name' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2 my-4'>
                <div className='mb-2'>
                  <FieldInput label='Postcode / Zip' value={zip} onChange={onZipChanged} name='zip' type='text' placeholder='Postcode / Zip Code' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Country' value={country} onChange={onCountryChanged} name='country' type='text' placeholder='Country Name' errors={errors} isRequire />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Contact Information</h3>
            <div className='md:flex md:justify-between items-center'>
              <div className='md:w-1/2 md:pr-2'>
                <div className='mb-3'>
                  <FieldInput label='Account number' value={contactInformation.accountNumber} onChange={onContactInformationChanged} name='accountNumber' type='text' placeholder='E.g. xxxxxxx99' errors={errors} isRequire />
                </div>
                <div>
                  <FieldInput label='Email' value={contactInformation.email} onChange={onContactInformationChanged} name='email' type='email' placeholder='E.g.example@inheritly.com' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-3'>
                  <FieldInput label='Phone' value={contactInformation.phone} onChange={onContactInformationChanged} name='phone' type='text' placeholder='E.g. +44 1234 567890' errors={errors} isRequire />
                </div>
                <div>
                  <FieldInput label='Company Address' value={contactInformation.companyAddress} onChange={onContactInformationChanged} name='companyAddress' type='text' placeholder='Company Address' errors={errors} isRequire />
                </div>
              </div>
            </div>
          </div>
          {files?.length > 0
            ? (
              <FilesList id={id} files={files} setFiles={setFiles} />
              )
            : null}
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
          <button
            type='submit'
            className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'
          >
            Update
          </button>
        </form>
      </div>
    </Properties>
  )

  return content
}

export default EditProperty
