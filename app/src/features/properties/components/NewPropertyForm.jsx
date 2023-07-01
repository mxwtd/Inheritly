import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Properties from '../index.jsx'

import { useAddNewPropertyMutation } from '../services/propertiesApiSlice'

import BasicInformation from '../../../components/form/InvestmentType/BasicInformation.jsx'
import ContactInformation from '../../../components/form/InvestmentType/ContactInformation.jsx'
import FilesList from '../../../components/form/InvestmentType/FilesList.jsx'
import FileInput from '../../../components/ui/FileInput.jsx'
import FieldInput from '../../../components/ui/FieldInput.jsx'

const NewPropertyForm = () => {
  const [addNewProperty, {
    isSuccess,
    isError,
    error
  }] = useAddNewPropertyMutation()

  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [taxStatus, setTaxStatus] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')

  const [files, setFiles] = useState([]) // changed to array for the file upload

  useEffect(() => {
    if (isSuccess) {
      setFiles([]) // reset files array

      navigate('/investments/properties')
    }
  }, [isSuccess, navigate])

  const onDateChanged = e => setDate(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onCityChanged = e => setCity(e.target.value)
  const onZipChanged = e => setZip(e.target.value)
  const onCountryChanged = e => setCountry(e.target.value)

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  /// /////////////////////////////////////////////////////////////
  // The following handles the visual error queues for the user //
  /// ///////////////////////////////////////////////////////////

  const [errors, setErrors] = useState({ name: false, type: false, photo: false })

  const onSavePropertyClicked = async (e) => {
    e.preventDefault()

    const newErrors = {
      country: !country,
      date: !date,
      taxStatus: !taxStatus,
      city: !city,
      address: !address,
      zip: !zip
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)

    if (!hasErrors) {
      const formData = new FormData(e.target)

      if (files) {
        formData.delete('files')
        files.forEach(file => {
          formData.append('files', file)
        })
      }

      await addNewProperty(formData)
    }
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Properties backTo='/investments/properties'>
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Property</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSavePropertyClicked} className='space-y-4 md:space-y-6' action='#'>
          <p className={errClass}>
            {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
            }
          </p>
          <BasicInformation errors={errors} />
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
              <div className='md:w-1/2 md:pr-2'>
                <div className='mb-2'>
                  <FieldInput label='Address' value={address} onChange={onAddressChanged} name='address' type='text' placeholder='Street Address' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='City' value={city} onChange={onCityChanged} name='city' type='text' placeholder='City Name' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-2'>
                  <FieldInput label='Postcode / Zip' value={zip} onChange={onZipChanged} name='zip' type='text' placeholder='Postcode / Zip Code' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Country' value={country} onChange={onCountryChanged} name='country' type='text' placeholder='Country Name' errors={errors} isRequire />
                </div>
              </div>
            </div>
          </div>
          <ContactInformation errors={errors} />
          {files.length > 0
            ? (
              <FilesList files={files} setFiles={setFiles} />
              )
            : null}
          <FileInput onFilesChanged={onFilesChanged} />
          <button className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'>Create</button>
        </form>
      </div>
    </Properties>
  )

  return content
}

export default NewPropertyForm
