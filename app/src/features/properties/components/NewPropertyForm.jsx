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

  // Create form with a content variable that will be a form using tailwind where I should get: name, currency, date, value, taxStatus, type, city, country, address, zip code.

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

  // const [userId, setUserId] = useState(users[0].id)

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

      // setUserId('')
      navigate('/properties')
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

  const canSave = [name, country, currency, date, value, taxStatus, type, city, address, zip].every(Boolean) && !isLoading

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewProperty({ name, country, currency, date, value, taxStatus, type, city, address, zip })
    }
  }

  const errClass = isError ? 'error msg' : 'offscreen'
  const validNameClass = !name ? 'form__input--incomplete' : ''
  const validCountryClass = !country ? 'form__input--incomplete' : ''

  const content = (
    <Properties title='Create new Property'>
      <p className={errClass}>{error?.data?.message}</p>

      {/* <form className='form' onSubmit={onSavePropertyClicked}>
        <div className='form__name-row'>
          <h2>New Property</h2>
          <div className='form__action-buttons'>
            <button
              name='Save'
              disabled={!canSave}
            />
          </div>

        </div>
        <label className='form__label' htmlFor='name'>
          Name:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id='name'
          name='name'
          type='text'
          autoComplete='off'
          value={name}
          onChange={onNameChanged}
        />

        <label className='form__label' htmlFor='country'>
          Country:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='country'
          name='country'
          type='text'
          autoComplete='off'
          value={country}
          onChange={onCountryChanged}
        />

        <label className='form__label' htmlFor='currency'>
          Currency:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='currency'
          name='currency'
          type='text'
          autoComplete='off'
          value={currency}
          onChange={onCurrencyChanged}
        />

        <label className='form__label' htmlFor='date'>
          Date:
        </label>

        <input
          className={`form__input ${validCountryClass}`}
          id='date'
          name='date'
          type='date'
          autoComplete='off'
          value={date}
          onChange={onDateChanged}
        />

        <label className='form__label' htmlFor='value'>
          Value:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='value'
          name='value'
          type='number'
          autoComplete='off'
          value={value}
          onChange={onValueChanged}
        />

        <label className='form__label' htmlFor='taxStatus'>
          Tax Status:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='taxStatus'
          name='taxStatus'
          type='text'
          autoComplete='off'
          value={taxStatus}
          onChange={onTaxStatusChanged}
        />

        <label className='form__label' htmlFor='type'>
          Type:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='type'
          name='type'
          type='text'
          autoComplete='off'
          value={type}
          onChange={onTypeChanged}
        />

        <label className='form__label' htmlFor='city'>
          City:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='city'
          name='city'
          type='text'
          autoComplete='off'
          value={city}
          onChange={onCityChanged}
        />

        <label className='form__label' htmlFor='address'>
          Address:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='address'
          name='address'
          type='text'
          autoComplete='off'
          value={address}
          onChange={onAddressChanged}
        />

        <label className='form__label' htmlFor='zip'>
          Zip:
        </label>
        <input
          className={`form__input ${validCountryClass}`}
          id='zip'
          name='zip'
          type='text'
          autoComplete='off'
          value={zip}
          onChange={onZipChanged}
        />
      </form> */}
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
        <button className='w-full text-slate-600 hover:text-slate-300 bg-slate-400/[.3] hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800 dark:text-slate-300 dark:hover:text-slate-100'>Create</button>
      </form>
    </Properties>
  )

  return content
}

export default NewPropertyForm
