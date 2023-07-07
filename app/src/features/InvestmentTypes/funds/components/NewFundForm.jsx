import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Funds from '../index.jsx'

import { useAddNewFundMutation } from '../services/fundsApiSlice.js'

import BasicInformation from '../../../../components/form/InvestmentType/BasicInformation.jsx'
import ContactInformation from '../../../../components/form/InvestmentType/ContactInformation.jsx'
import FilesList from '../../../../components/form/InvestmentType/FilesList.jsx'
import FileInput from '../../../../components/ui/FileInput.jsx'
import FieldInput from '../../../../components/ui/FieldInput.jsx'

const NewFundForm = () => {
  const [addNewFund, {
    isSuccess,
    isError,
    error
  }] = useAddNewFundMutation()

  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [taxStatus, setTaxStatus] = useState('')
  const [description, setDescription] = useState('')

  const [files, setFiles] = useState([]) // changed to array for the file upload

  useEffect(() => {
    if (isSuccess) {
      setFiles([]) // reset files array

      navigate('/investments/funds')
    }
  }, [isSuccess, navigate])

  const onDateChanged = e => setDate(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  /// /////////////////////////////////////////////////////////////
  // The following handles the visual error queues for the user //
  /// ///////////////////////////////////////////////////////////

  const [errors, setErrors] = useState({ name: false, type: false, photo: false })

  const onSaveFundClicked = async (e) => {
    e.preventDefault()

    const newErrors = {
      date: !date,
      taxStatus: !taxStatus
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

      await addNewFund(formData)
    }
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Funds backTo='/investments/funds'>
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Fund</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveFundClicked} className='space-y-4 md:space-y-6' action='#'>
          <p className={errClass}>
            {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
            }
          </p>
          <BasicInformation errors={errors} investmentType='Fund' />
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Fund Information</h3>
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
                  <FieldInput label='Description' value={description} onChange={onDescriptionChanged} name='description' type='text' placeholder='Description' errors={errors} />
                </div>
              </div>
            </div>
          </div>
          <ContactInformation errors={errors} />
          {files.length > 0
            ? (
              <FilesList files={files} setFiles={setFiles} type='funds' />
              )
            : null}
          <FileInput onFilesChanged={onFilesChanged} />
          <button className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'>Create</button>
        </form>
      </div>
    </Funds>
  )

  return content
}

export default NewFundForm
