import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Bonds from '../index.jsx'

import { useAddNewBondMutation } from '../services/bondsApiSlice.js'

import BasicInformation from '../../../../components/form/InvestmentType/BasicInformation.jsx'
import ContactInformation from '../../../../components/form/InvestmentType/ContactInformation.jsx'
import FilesList from '../../../../components/form/InvestmentType/FilesList.jsx'
import FileInput from '../../../../components/ui/FileInput.jsx'
import FieldInput from '../../../../components/ui/FieldInput.jsx'

const NewBondForm = () => {
  const [addNewBond, {
    isSuccess,
    isError,
    error
  }] = useAddNewBondMutation()

  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [taxStatus, setTaxStatus] = useState('')
  const [issuer, setIssuer] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [details, setDetails] = useState('')
  const [couponRate, setCouponRate] = useState('')
  const [purchasedAt, setPurchasedAt] = useState('')

  const [files, setFiles] = useState([]) // changed to array for the file upload

  useEffect(() => {
    if (isSuccess) {
      setFiles([]) // reset files array

      navigate('/investments/bonds')
    }
  }, [isSuccess, navigate])

  const onDateChanged = e => setDate(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onIssuerChanged = e => setIssuer(e.target.value)
  const onPurchasePriceChanged = e => setPurchasePrice(e.target.value)
  const onDetailsChanged = e => setDetails(e.target.value)
  const onCouponRateChanged = e => setCouponRate(e.target.value)
  const onPurchasedAtChanged = e => setPurchasedAt(e.target.value)

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  /// /////////////////////////////////////////////////////////////
  // The following handles the visual error queues for the user //
  /// ///////////////////////////////////////////////////////////

  const [errors, setErrors] = useState({ name: false, type: false, photo: false })

  const onSaveBondClicked = async (e) => {
    e.preventDefault()

    console.log('Create button clicked')

    const newErrors = {
      couponRate: !couponRate,
      date: !date,
      taxStatus: !taxStatus,
      purchasePrice: !purchasePrice,
      issuer: !issuer
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

      await addNewBond(formData)
    }
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Bonds backTo='/investments/bonds'>
      <div className='bg-white backdrop-blur-md rounded-3xl shadow-xl dark:border md:mt-0 p-6 dark:bg-slate-800 dark:border-slate-700'>
        <div className='mb-10'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Add a Bond</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveBondClicked} className='space-y-4 md:space-y-6' action='#'>
          <p className={errClass}>
            {
            (error?.data?.message) ? error?.data?.message : error?.data?.error
            }
          </p>
          <BasicInformation errors={errors} investmentType='Bond' />
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Bond Information</h3>
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
                  <FieldInput label='Issuer' value={issuer} onChange={onIssuerChanged} name='issuer' type='text' placeholder='Issuer' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Purchase Price' value={purchasePrice} onChange={onPurchasePriceChanged} name='purchasePrice' type='number' placeholder='Purchase Price' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-2'>
                  <FieldInput label='Additional Details' value={details} onChange={onDetailsChanged} name='details' type='text' placeholder='Details' errors={errors} />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Purchased at' value={purchasedAt} onChange={onPurchasedAtChanged} name='purchasedAt' type='text' placeholder='Purchased at' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Coupon Rate' value={couponRate} onChange={onCouponRateChanged} name='couponRate' type='number' placeholder='Coupon Rate' errors={errors} isRequire />
                </div>
              </div>
            </div>
          </div>
          <ContactInformation errors={errors} />
          {files.length > 0
            ? (
              <FilesList files={files} setFiles={setFiles} type='bonds' />
              )
            : null}
          <FileInput onFilesChanged={onFilesChanged} />
          <button
            className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'
          >
            Create
          </button>
        </form>
      </div>
    </Bonds>
  )

  return content
}

export default NewBondForm
