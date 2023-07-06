
import Bonds from '../index'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUpdateBondMutation, useGetBondByIdQuery } from '../services/bondsApiSlice'

import FieldInput from '../../../../components/ui/FieldInput'
import FilesList from '../../../../components/form/InvestmentType/FilesList'
import FileInput from '../../../../components/ui/FileInput'

const EditBond = () => {
  const { id } = useParams()

  const {
    data: bond
  } = useGetBondByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 900000
  })

  const [updateBond, {
    isSuccess,
    isError,
    error
  }] = useUpdateBondMutation()

  const navigate = useNavigate()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [name, setName] = useState(bond?.name || '')
  const [currency, setCurrency] = useState(bond?.currency || '')
  const [date, setDate] = useState(() => {
    const originalDate = new Date(bond?.date)
    return formatDate(originalDate)
  })
  const [value, setValue] = useState(bond?.value || '')
  const [taxStatus, setTaxStatus] = useState(bond?.taxStatus || '')
  const [type, setType] = useState(bond?.type || '')

  const [issuer, setIssuer] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [details, setDetails] = useState('')
  const [couponRate, setCouponRate] = useState('')
  const [purchasedAt, setPurchasedAt] = useState('')

  const [contactInformation, setContactInformation] = useState({
    accountNumber: bond?.contactInformation?.accountNumber || '',
    email: bond?.contactInformation?.email || '',
    phone: bond?.contactInformation?.phone || '',
    companyAddress: bond?.contactInformation?.companyAddress || ''
  } || {})

  const [photo, setPhoto] = useState(bond?.photo || null)
  const [files, setFiles] = useState(bond?.files || [])

  const [isPrivate, setIsPrivate] = useState(() => {
    if (bond?.contactInformation) {
      return false
    } else {
      return true
    }
  })

  const [errors] = useState({ name: false, type: false, photo: false })

  useEffect(() => {
    console.log('bond change')
    if (bond) {
      setName(bond.name)
      setCurrency(bond.currency)
      setDate(formatDate(new Date(bond.date)))
      setValue(bond.value)
      setTaxStatus(bond.taxStatus)
      setType(bond.type)

      setIssuer(bond.issuer)
      setPurchasePrice(bond.purchasePrice)
      setDetails(bond.details)
      setCouponRate(bond.couponRate)
      setPurchasedAt(bond.purchasedAt)

      setPhoto(bond.photo)

      if (bond?.contactInformation) {
        setContactInformation({
          accountNumber: bond?.contactInformation.accountNumber || '',
          email: bond?.contactInformation.email || '',
          phone: bond?.contactInformation.phone || '',
          companyAddress: bond?.contactInformation.companyAddress || ''
        } || {})
      }

      setIsPrivate(() => {
        if (bond.contactInformation) {
          return false
        } else {
          return true
        }
      })

      setFiles(bond.files)
    }
  }, [bond, id])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/investments/bonds/${id}`)
    }
  }, [id, isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onCurrencyChanged = e => setCurrency(e.target.value)
  const onDateChanged = e => setDate(e.target.value)
  const onValueChanged = e => setValue(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onTypeChanged = e => setType(e.target.value)

  const onIssuerChanged = e => setIssuer(e.target.value)
  const onPurchasePriceChanged = e => setPurchasePrice(e.target.value)
  const onDetailsChanged = e => setDetails(e.target.value)
  const onCouponRateChanged = e => setCouponRate(e.target.value)
  const onPurchasedAtChanged = e => setPurchasedAt(e.target.value)

  const onFilesChanged = (event) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)])
  }

  const onContactInformationChanged = (e) => setContactInformation({ ...contactInformation, [e.target.name]: e.target.value })

  const handleToggle = () => {
    setIsPrivate(prevIsPrivate => !prevIsPrivate)
  }

  const onPhotoChanged = (event) => {
    console.log('Photo changed')
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

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

  const onSaveBondClicked = async (e) => {
    e.preventDefault()

    console.log('update button clicked')

    const bondData = new FormData(e.target)

    console.log('BondData name: ', bondData.get('name'))

    console.log('')

    if (files) {
      bondData.delete('files')
      files.forEach(file => {
        if (file instanceof File) {
          bondData.append('files', file)
        }
      })
    }

    await updateBond({ id, bondData })
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Bonds backTo={`/investments/bonds/${id}`}>
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
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Edit {bond?.name}</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveBondClicked} className='space-y-4 md:space-y-6' action='#'>
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
                <FieldInput label='Bond name' value={name} onChange={onNameChanged} name='name' type='text' placeholder='Bond name' errors={errors} isRequire />
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
                <FieldInput label='Value' value={value} onChange={onValueChanged} name='value' type='text' placeholder='Bond Value' errors={errors} isRequire />
              </div>
            </div>
          </div>
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2' />
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
                  <FieldInput label='Issuer' value={issuer} onChange={onIssuerChanged} name='issuer' type='text' placeholder='Street Issuer' errors={errors} isRequire />
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
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <div>
              <div className='flex flex-row justify-start items-center'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' value='' className='sr-only peer' onChange={handleToggle} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                </label>
                <h2 className='ml-3 text-lg font-medium text-gray-900 dark:text-gray-300'>Owned by a Company?</h2>
              </div>
              {!isPrivate && (
                <>
                  <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Contact Information</h3>
                  <div className='md:flex md:justify-between items-center'>
                    <div className='md:w-1/2 md:pr-2'>
                      <div className='mb-3'>
                        <FieldInput label='Account number' value={contactInformation.accountNumber} onChange={onContactInformationChanged} name='accountNumber' type='text' placeholder='E.g. xxxxxxx99' errors={errors} />
                      </div>
                      <div>
                        <FieldInput label='Email' value={contactInformation.email} onChange={onContactInformationChanged} name='email' type='email' placeholder='E.g. example@inheritly.com' errors={errors} />
                      </div>
                    </div>
                    <div className='md:w-1/2 md:pl-2'>
                      <div className='mb-3'>
                        <FieldInput label='Phone' value={contactInformation.phone} onChange={onContactInformationChanged} name='phone' type='text' placeholder='E.g. +44 1234 567890' errors={errors} />
                      </div>
                      <div>
                        <FieldInput label='Company Address' value={contactInformation.companyAddress} onChange={onContactInformationChanged} name='companyAddress' type='text' placeholder='Company Address' errors={errors} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {files?.length > 0
            ? (
              <FilesList id={id} files={files} setFiles={setFiles} type='bonds' />
              )
            : null}
          <FileInput onFilesChanged={onFilesChanged} />
          <button
            type='submit'
            className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'
          >
            Update
          </button>
        </form>
      </div>
    </Bonds>
  )

  return content
}

export default EditBond
