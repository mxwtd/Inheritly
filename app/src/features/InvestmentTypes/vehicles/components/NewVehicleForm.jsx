import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Vehicles from '../index.jsx'

import { useAddNewVehicleMutation } from '../services/vehiclesApiSlice.js'

import BasicInformation from '../../../../components/form/InvestmentType/BasicInformation.jsx'
import ContactInformation from '../../../../components/form/InvestmentType/ContactInformation.jsx'
import FilesList from '../../../../components/form/InvestmentType/FilesList.jsx'
import FileInput from '../../../../components/ui/FileInput.jsx'
import FieldInput from '../../../../components/ui/FieldInput.jsx'

const NewVehicleForm = () => {
  const [addNewVehicle, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewVehicleMutation()

  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [taxStatus, setTaxStatus] = useState('')

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')

  const [files, setFiles] = useState([]) // changed to array for the file upload

  useEffect(() => {
    if (isSuccess) {
      setBrand('')
      setDate('')
      setTaxStatus('')
      setBrand('')
      setModel('')
      setYear('')

      setFiles([]) // reset files array

      navigate('/investments/vehicles')
    }
  }, [isSuccess, navigate])

  const onDateChanged = e => setDate(e.target.value)

  const onTaxStatusChanged = e => setTaxStatus(e.target.value)

  const onBrandChanged = e => setBrand(e.target.value)
  const onModelChanged = e => setModel(e.target.value)
  const onYearChanged = e => setYear(e.target.value)

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  const canSave = [taxStatus, brand, model, year].every(Boolean) && !isLoading

  const [errors, setErrors] = useState({ name: false, type: false, photo: false })

  const onSaveVehicleClicked = async (e) => {
    e.preventDefault()

    const newErrors = {
      date: !date,
      taxStatus: !taxStatus,
      brand: !brand,
      model: !model,
      year: !year
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)

    if (canSave && !hasErrors) {
      const formData = new FormData(e.target)

      if (files) {
        formData.delete('files')
        files.forEach(file => {
          formData.append('files', file)
        })
      }

      await addNewVehicle(formData)
    }
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Vehicles backTo='/investments/vehicles'>
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Vehicle</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveVehicleClicked} className='space-y-4 md:space-y-6' action='#'>
          <p className={errClass}>
            {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
            }
          </p>
          <BasicInformation errors={errors} investmentType='Vehicle' />
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Vehicle Information</h3>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2'>
                <FieldInput label='Date Of Purchase' value={date} onChange={onDateChanged} name='date' type='date' placeholder='Date Of Purchase' errors={errors} isRequire />
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <FieldInput label='Tax Status' value={taxStatus} onChange={onTaxStatusChanged} name='taxStatus' type='text' placeholder='E.g. Taxable, Tax Free, etc.' errors={errors} isRequire />
              </div>
            </div>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2'>
                <div className='mb-2'>
                  <FieldInput label='Year' value={year} onChange={onYearChanged} name='year' type='year' placeholder='Year' errors={errors} isRequire />
                </div>
                <div>
                  <FieldInput label='Model' value={model} onChange={onModelChanged} name='model' type='model' placeholder='Model Name' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div>
                  <FieldInput label='Brand' value={brand} onChange={onBrandChanged} name='brand' type='text' placeholder='Brand Name' errors={errors} isRequire />
                </div>
              </div>
            </div>
          </div>
          <ContactInformation errors={errors} />
          {files.length > 0
            ? (
              <FilesList files={files} setFiles={setFiles} type='properties' />
              )
            : null}
          <FileInput onFilesChanged={onFilesChanged} />
          <button className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'>Create</button>
        </form>
      </div>
    </Vehicles>
  )

  return content
}

export default NewVehicleForm
