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
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdatePropertyMutation()

  // const [updateProperty, { isLoading, isSuccess, isError, error }] = useUpdatePropertyMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/investments/properties')
    }
  }, [isSuccess, navigate])

  const property = properties.find(property => property.id === id)

  const [name, setName] = useState(property.name)
  const [country, setCountry] = useState(property.country)
  const [currency, setCurrency] = useState(property.currency)
  const [date, setDate] = useState(property.date)
  const [value, setValue] = useState(property.value)
  const [taxStatus, setTaxStatus] = useState(property.taxStatus)
  const [type, setType] = useState(property.type)
  const [city, setCity] = useState(property.city)
  const [address, setAddress] = useState(property.address)
  const [zip, setZip] = useState(property.zip)

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

  // const canSave = [name, country, currency, date, value, taxStatus, type, city, address, zip].every(Boolean) && !isLoading

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    const propertyData = { name, country, currency, date, value, taxStatus, type, city, address, zip }

    // if (canSave) {
    console.log('Update property')
    await updateProperty({ id, propertyData })
    // }
  }

  const errClass = isError ? 'error msg' : 'offscreen'

  const content = (
    <Properties title='Edit Property'>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6' action='#'>
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
        <button className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Save</button>
      </form>
    </Properties>
  )

  return content
}

export default EditProperty
