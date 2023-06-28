import Vehicles from '../index'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUpdateVehicleMutation, useGetVehicleByIdQuery, useDeleteFileMutation, useRenameFileMutation } from '../services/vehiclesApiSlice'
import { getFileNameFromUrl } from '../../../hook/getFileNameFromUrl.js'

const EditVehicle = () => {
  const { id } = useParams()

  const {
    data: vehicle
  } = useGetVehicleByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 900000
  })

  const [
    deleteVehicleFile
  ] = useDeleteFileMutation()

  const [
    renameVehicleFile
  ] = useRenameFileMutation()

  const [updateVehicle, {
    isSuccess,
    isError,
    error
  }] = useUpdateVehicleMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name)
      setCountry(vehicle.country)
      setCurrency(vehicle.currency)
      setDate(formatDate(new Date(vehicle.date)))
      setValue(vehicle.value)
      setTaxStatus(vehicle.taxStatus)
      setType(vehicle.type)
      setCity(vehicle.city)
      setAddress(vehicle.address)
      setZip(vehicle.zip)

      setContactInformation({
        accountNumber: vehicle.contactInformation.accountNumber,
        email: vehicle.contactInformation.email,
        phone: vehicle.contactInformation.phone,
        companyAddress: vehicle.contactInformation.companyAddress
      })
    }
  }, [vehicle, id])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/investments/vehicles/${id}`)
    }
  }, [id, isSuccess, navigate])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [name, setName] = useState(vehicle?.name || '')
  const [country, setCountry] = useState(vehicle?.country || '')
  const [currency, setCurrency] = useState(vehicle?.currency || '')
  const [date, setDate] = useState(() => {
    const originalDate = new Date(vehicle?.date)
    return formatDate(originalDate)
  })
  const [value, setValue] = useState(vehicle?.value || '')
  const [taxStatus, setTaxStatus] = useState(vehicle?.taxStatus || '')
  const [type, setType] = useState(vehicle?.type || '')
  const [city, setCity] = useState(vehicle?.city || '')
  const [address, setAddress] = useState(vehicle?.address || '')
  const [zip, setZip] = useState(vehicle?.zip || '')

  const [contactInformation, setContactInformation] = useState({
    accountNumber: vehicle?.contactInformation.accountNumber || '',
    email: vehicle?.contactInformation.email || '',
    phone: vehicle?.contactInformation.phone || '',
    companyAddress: vehicle?.contactInformation.companyAddress || ''
  } || {})

  const [photo, setPhoto] = useState(vehicle?.photo || null)
  const [files, setFiles] = useState(vehicle?.files || [])

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

  const onSaveVehicleClicked = async (e) => {
    e.preventDefault()

    const vehicleData = { name, country, currency, date, value, taxStatus, type, city, address, zip }

    console.log('Update vehicle')
    await updateVehicle({ id, vehicleData })
  }

  const handleRenameFile = async (file, index) => {
    const newFileName = window.prompt('Enter new name for the file:', files[index].name)
    if (newFileName) {
      const oldName = getFileNameFromUrl(file.url)
      const newFiles = [...files]
      newFiles[index] = { ...newFiles[index], name: newFileName }
      setFiles(newFiles)

      console.log('old name: ', oldName)
      console.log('new name: ', newFileName)

      if (file._id) {
        renameVehicleFile({ id, fileId: file._id, oldName, newName: newFileName })
      }
    }
  }

  const handleDeleteFile = async (file, index) => {
    const confirmation = window.confirm('Are you sure you want to delete this file?')
    if (confirmation) {
      const newFiles = [...files]
      newFiles.splice(index, 1)
      setFiles(newFiles)

      if (file._id) {
        await deleteVehicleFile({ id, fileId: file._id })
      }
    }
  }

  const [currentPage, setCurrentPage] = useState(0) // page state
  const itemsPerPage = 4 // items per page

  const handleNext = () => {
    console.log('handle next')
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const handlePrevious = () => {
    console.log('handle previous')
    setCurrentPage((currentPage) => currentPage - 1)
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('#dropdownDotsHorizontal') && e.target.id !== 'dropdownMenuIconButton') {
        setOpenedDropdown(-1)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', closeDropdown)
    }
  }, [])

  const [openedDropdown, setOpenedDropdown] = useState(-1)

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const content = (
    <Vehicles backTo={`/investments/vehicles/${id}`}>
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
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Edit {vehicle?.name}</h1>
        </div>
        <form encType='multipart/form-data' onSubmit={onSaveVehicleClicked} className='space-y-4 md:space-y-6' action='#'>
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
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Vehicle name</label>
                <input
                  type='text'
                  value={name}
                  name='name'
                  id='name'
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Vehicle name'
                  onChange={onNameChanged}
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
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='E.g. House, Apartment, etc.'
                  onChange={onTypeChanged}
                  required=''
                />
              </div>
            </div>
            <div className='md:w-1/2 md:pl-2'>
              <div className='mb-3'>
                <label htmlFor='currency' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Currency</label>
                <input
                  type='text'
                  value={currency}
                  name='currency'
                  id='currency'
                  placeholder='E.g. USD'
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Vehicle Value'
                  onChange={onValueChanged}
                  required=''
                />
              </div>
            </div>
          </div>
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Vehicle Information</h3>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2 mt-2'>
                <label htmlFor='date' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Date Of Purchase</label>
                <input
                  type='date'
                  value={date}
                  name='date'
                  id='date'
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={onDateChanged}
                  required=''
                />
              </div>
              <div className='md:w-1/2 md:pl-2 mt-2'>
                <label htmlFor='taxStatus' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Tax Status</label>
                <input
                  type='taxStatus'
                  value={taxStatus}
                  name='taxStatus'
                  id='taxStatus'
                  className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='E.g. Taxable, Tax Free, etc.'
                  onChange={onTaxStatusChanged}
                  required=''
                />
              </div>
            </div>
            <div className='md:flex md:justify-between'>
              <div className='md:w-1/2 md:pr-2 my-4'>
                <div className='mb-2'>
                  <label htmlFor='address' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Address</label>
                  <input
                    type='address'
                    value={address}
                    name='address'
                    id='address'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Street Address'
                    onChange={onAddressChanged}
                    required=''
                  />
                </div>
                <div className='mt-3'>
                  <label htmlFor='city' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>City</label>
                  <input
                    type='city'
                    value={city}
                    name='city'
                    id='city'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='City Name'
                    onChange={onCityChanged}
                    required=''
                  />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2 my-4'>
                <div className='mb-2'>
                  <label htmlFor='zip' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Postcode / Zip</label>
                  <input
                    type='zip'
                    value={zip}
                    name='zip'
                    id='zip'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Postcode / Zip Code'
                    onChange={onZipChanged}
                    required=''
                  />
                </div>
                <div className='mt-3'>
                  <label htmlFor='country' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Country</label>
                  <input
                    type='text'
                    value={country}
                    name='country'
                    id='country'
                    placeholder='Country Name'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={onCountryChanged}
                    required=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
            <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Contact Information</h3>
            <div className='md:flex md:justify-between items-center'>
              <div className='md:w-1/2 md:pr-2'>
                <div className='mb-3'>
                  <label htmlFor='accountNumber' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Account number</label>
                  <input
                    type='text'
                    value={contactInformation.accountNumber}
                    name='accountNumber'
                    id='accountNumber'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='E.g. xxxxxxx99'
                    onChange={onContactInformationChanged}
                    required=''
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Email</label>
                  <input
                    type='email'
                    value={contactInformation.email}
                    name='email'
                    id='email'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='E.g. example@inheritly.com'
                    onChange={onContactInformationChanged}
                    required=''
                  />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-3'>
                  <label htmlFor='phone' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Phone</label>
                  <input
                    type='text'
                    value={contactInformation.phone}
                    name='phone'
                    id='phone'
                    placeholder='E.g. +44 1234 567890'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={onContactInformationChanged}
                    required=''
                  />
                </div>
                <div>
                  <label htmlFor='companyAddress' className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>Company Address</label>
                  <input
                    type='companyAddress'
                    value={contactInformation.companyAddress}
                    name='companyAddress'
                    id='companyAddress'
                    className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Company Address'
                    onChange={onContactInformationChanged}
                    required=''
                  />
                </div>
              </div>
            </div>
          </div>
          {files?.length > 0
            ? (
              <div className='py-2 px-4 mt-4 xl:mt-8 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded-xl shadow-lg pb-6'>
                <h1 className='py-2 text-md md:text-lg font-semibold pb-4'>Files</h1>
                <div className='relative shadow-md sm:rounded-lg'>
                  <table className='w-full text-sm text-left text-slate-500 dark:text-slate-400'>
                    <thead className='text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400'>
                      <tr>
                        <th scope='col' className='px-6 py-4'>
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {files?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((file, index) => (
                        <tr key={index} className={(index + currentPage * itemsPerPage) % 2 === 0 ? 'bg-white border-b dark:bg-slate-800 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900'}>
                          <td className='px-6 py-4'>
                            <div className='flex justify-between items-center'>
                              {
                                (file.name) ? file.name : getFileNameFromUrl(file.url)
                              }
                              <div className='relative'>
                                <button id='dropdownMenuIconButton' data-dropdown-toggle='dropdownDots' className=' inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600' type='button' onClick={() => setOpenedDropdown(index + currentPage * itemsPerPage)}>
                                  <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' style={{ pointerEvents: 'none' }}><path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' /></svg>
                                </button>
                                {openedDropdown === index + currentPage * itemsPerPage && (
                                  <div id='dropdownDotsHorizontal' className='absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'>
                                    <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownMenuIconHorizontalButton'>
                                      <li>
                                        <button
                                          type='button'
                                          className='block px-4 py-2 min-w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left'
                                          onClick={() => handleRenameFile(file, index)}
                                        >
                                          Rename
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type='button'
                                          className='block px-4 py-2 min-w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left'
                                          onClick={() => handleDeleteFile(file, index)}
                                        >
                                          Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {currentPage !== 0 && <button onClick={handlePrevious}>Previous</button>}
                {(currentPage + 1) * itemsPerPage < files.length && <button onClick={handleNext}>Next</button>}
              </div>
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
    </Vehicles>
  )

  return content
}

export default EditVehicle
