
import Stocks from '../index'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUpdateStockMutation, useGetStockByIdQuery } from '../services/stocksApiSlice'

import FieldInput from '../../../../components/ui/FieldInput'
import FilesList from '../../../../components/form/InvestmentType/FilesList'
import FileInput from '../../../../components/ui/FileInput'

const EditStock = () => {
  const { id } = useParams()

  const {
    data: stock
  } = useGetStockByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 900000
  })

  const [updateStock, {
    isSuccess,
    isError,
    error
  }] = useUpdateStockMutation()

  const navigate = useNavigate()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [name, setName] = useState(stock?.name || '')
  const [currency, setCurrency] = useState(stock?.currency || '')
  const [date, setDate] = useState(() => {
    const originalDate = new Date(stock?.date)
    return formatDate(originalDate)
  })
  const [value, setValue] = useState(stock?.value || '')
  const [taxStatus, setTaxStatus] = useState(stock?.taxStatus || '')
  const [type, setType] = useState(stock?.type || '')

  const [symbol, setSymbol] = useState(stock?.symbol || '')
  const [quantity, setQuantity] = useState(stock?.quantity || '')
  const [purchasePrice, setPurchasePrice] = useState(stock?.purchasePrice || '')
  const [purchasedAt, setPurchasedAt] = useState(stock?.purchasedAt || '')
  const [detail, setDetail] = useState(stock?.detail || '')

  const [contactInformation, setContactInformation] = useState({
    accountNumber: stock?.contactInformation?.accountNumber || '',
    email: stock?.contactInformation?.email || '',
    phone: stock?.contactInformation?.phone || '',
    companyAddress: stock?.contactInformation?.companyAddress || ''
  } || {})

  const [photo, setPhoto] = useState(stock?.photo || null)
  const [files, setFiles] = useState(stock?.files || [])

  const [isPrivate, setIsPrivate] = useState(() => {
    if (stock?.contactInformation) {
      return false
    } else {
      return true
    }
  })

  const [errors] = useState({ name: false, type: false, photo: false })

  useEffect(() => {
    console.log('stock change')
    if (stock) {
      setName(stock.name)
      setCurrency(stock.currency)
      setDate(formatDate(new Date(stock.date)))
      setValue(stock.value)
      setTaxStatus(stock.taxStatus)
      setType(stock.type)

      setSymbol(stock.symbol)
      setQuantity(stock.quantity)
      setPurchasePrice(stock.purchasePrice)
      setPurchasedAt(stock.purchasedAt)
      setDetail(stock.detail)

      setPhoto(stock.photo)

      if (stock?.contactInformation) {
        setContactInformation({
          accountNumber: stock?.contactInformation.accountNumber || '',
          email: stock?.contactInformation.email || '',
          phone: stock?.contactInformation.phone || '',
          companyAddress: stock?.contactInformation.companyAddress || ''
        } || {})
      }

      setIsPrivate(() => {
        if (stock.contactInformation) {
          return false
        } else {
          return true
        }
      })

      setFiles(stock.files)
    }
  }, [stock, id])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/investments/stocks/${id}`)
    }
  }, [id, isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onCurrencyChanged = e => setCurrency(e.target.value)
  const onDateChanged = e => setDate(e.target.value)
  const onValueChanged = e => setValue(e.target.value)
  const onTaxStatusChanged = e => setTaxStatus(e.target.value)
  const onTypeChanged = e => setType(e.target.value)

  const onSymbolChanged = e => setSymbol(e.target.value)
  const onQuantityChanged = e => setQuantity(e.target.value)
  const onPurchasePriceChanged = e => setPurchasePrice(e.target.value)
  const onPurchasedAtChanged = e => setPurchasedAt(e.target.value)
  const onDetailChanged = e => setDetail(e.target.value)

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

  const onSaveStockClicked = async (e) => {
    e.preventDefault()

    console.log('update button clicked')

    const stockData = new FormData(e.target)

    console.log('StockData name: ', stockData.get('name'))

    console.log('')

    if (files) {
      stockData.delete('files')
      files.forEach(file => {
        if (file instanceof File) {
          stockData.append('files', file)
        }
      })
    }

    await updateStock({ id, stockData })
  }

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Stocks backTo={`/investments/stocks/${id}`}>
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
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Edit {stock?.name}</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveStockClicked} className='space-y-4 md:space-y-6' action='#'>
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
                <FieldInput label='Stock name' value={name} onChange={onNameChanged} name='name' type='text' placeholder='Stock name' errors={errors} isRequire />
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
                <FieldInput label='Value' value={value} onChange={onValueChanged} name='value' type='text' placeholder='Stock Value' errors={errors} isRequire />
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
                  <FieldInput label='Symbol' value={symbol} onChange={onSymbolChanged} name='symbol' type='text' placeholder='Symbol' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Quantity' value={quantity} onChange={onQuantityChanged} name='quantity' type='number' placeholder='Quantity' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-2'>
                  <FieldInput label='Purchase Price' value={purchasePrice} onChange={onPurchasePriceChanged} name='purchasePrice' type='number' placeholder='Purchase Price' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='Purchased At' value={purchasedAt} onChange={onPurchasedAtChanged} name='purchasedAt' type='text' placeholder='Purchased At' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mt-3'>
                  <FieldInput label='Detail' value={detail} onChange={onDetailChanged} name='detail' type='text' placeholder='Detail' errors={errors} />
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
              <FilesList id={id} files={files} setFiles={setFiles} type='stocks' />
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
    </Stocks>
  )

  return content
}

export default EditStock
