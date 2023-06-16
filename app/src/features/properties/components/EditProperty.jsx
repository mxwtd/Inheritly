import Properties from '../index'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUpdatePropertyMutation, useGetPropertiesQuery } from '../services/propertiesApiSlice'

const EditProperty = () => {
  const { id } = useParams()

  const {
    data: properties
  } = useGetPropertiesQuery('propertiesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 20000
  })

  const [updateProperty, {
    isSuccess,
    isError,
    error
  }] = useUpdatePropertyMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (properties) {
      const property = properties.find((property) => property.id === id)

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
      }
    }
  }, [properties, id])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/investments/properties/${id}`)
    }
  }, [id, isSuccess, navigate])

  const property = properties?.find(property => property.id === id)

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

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    const propertyData = { name, country, currency, date, value, taxStatus, type, city, address, zip }

    console.log('Update property')
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
        <h1 className='text-3xl md:text-4xl font-bold pb-6 pt-2 mg:pb-10 md:pt-4 text-slate-800 dark:text-white'>Edit Property</h1>
        <form onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6 flex flex-col gap-4' action='#'>
          <div className='w-full md:min-w-full flex flex-wrap justify-between space-y-4 md:space-y-0'>
            <div className='w-full md:w-1/2 space-y-4'>
              <div className='md:mr-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Name</label>
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
              <div className='md:mr-2'>
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
            <div className='w-full md:w-1/2 space-y-4'>
              <div>
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
          <div className='w-full md:min-w-full space-y-4'>
            <div>
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
            <div>
              <label htmlFor='taxStatus' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Tax Status</label>
              <input
                type='text'
                value={taxStatus}
                name='taxStatus'
                id='taxStatus'
                className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={onTaxStatusChanged}
                required=''
              />
            </div>
          </div>
          <div className='w-full md:min-w-full flex flex-wrap justify-between space-y-4 md:space-y-0'>
            <div className='w-full md:w-1/2 space-y-4'>
              <div className='md:mr-2'>
                <label htmlFor='address' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Address</label>
                <input
                  type='text'
                  value={address}
                  name='address'
                  id='address'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onAddressChanged}
                  required=''
                />
              </div>
              <div className='md:mr-2'>
                <label htmlFor='city' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>City</label>
                <input
                  type='text'
                  value={city}
                  name='city'
                  id='city'
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onCityChanged}
                  required=''
                />
              </div>
            </div>
            <div className='w-full md:w-1/2 space-y-4'>
              <div>
                <label htmlFor='zip' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Postcode / ZIP</label>
                <input
                  type='text'
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
                  className='bg-slate-100 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onCountryChanged}
                  required=''
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'
          >
            Save Property
          </button>
        </form>
      </div>
    </Properties>
  )

  return content
}

export default EditProperty
