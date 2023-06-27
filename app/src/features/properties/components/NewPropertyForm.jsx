import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Properties from '../index.jsx'

import { useAddNewPropertyMutation } from '../services/propertiesApiSlice'

import BasicInformation from '../../../components/form/InvestmentType/BasicInformation.jsx'
import ContactInformation from '../../../components/form/InvestmentType/ContactInformation.jsx'
import FieldInput from '../../../components/ui/FieldInput.jsx'

const NewPropertyForm = () => {
  const [addNewProperty, {
    isLoading,
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
      zip: !zip,
      accountNumber: !accountNumber,
      email: !email,
      phone: !phone,
      companyAddress: !companyAddress
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

  /// ////////////////////////////////////////////////////////////////////////
  // The following handles the amount of file on one page of the file list ///
  /// ////////////////////////////////////////////////////////////////////////

  const [currentPage, setCurrentPage] = useState(0) // page state
  const itemsPerPage = 4 // items per page

  const handleNext = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const handlePrevious = () => {
    setCurrentPage((currentPage) => currentPage - 1)
  }

  /// /////////////////////////////////////////////////////////
  // The following closes the edit modal on the file list ///
  /// ////////////////////////////////////////////////////////

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

  const errClass = isError ? 'errorMsg text-red-500' : 'offscreen'

  const [openedDropdown, setOpenedDropdown] = useState(-1)

  /// /////////////////////////////////////////////////////////
  // The following handles the file rename on the file list //
  /// ////////////////////////////////////////////////////////

  const handleRenameFile = (index) => {
    const newFileName = window.prompt('Please enter a new file name')
    if (newFileName === null) {
      return
    }

    setFiles(prevFiles => {
      const newFiles = [...prevFiles]
      const oldFile = newFiles[index]
      const newFile = new File([oldFile], newFileName, {
        type: oldFile.type,
        lastModified: oldFile.lastModified
      })
      newFiles[index] = newFile
      return newFiles
    })

    // Close the dropdown
    setOpenedDropdown(-1)
  }

  /// ///////////////////////////////////////////////////////////
  // The following handles the file deletion on the file list //
  /// /////////////////////////////////////////////////////////

  const handleDeleteFile = (index) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles]
      newFiles.splice(index, 1)
      return newFiles
    })

    // Close the dropdown
    setOpenedDropdown(-1)
  }

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
              <div className='md:w-1/2 md:pr-2 my-4'>
                <div className='mb-2'>
                  <FieldInput label='Address' value={address} onChange={onAddressChanged} name='address' type='text' placeholder='Street Address' errors={errors} isRequire />
                </div>
                <div className='mt-3'>
                  <FieldInput label='City' value={city} onChange={onCityChanged} name='city' type='text' placeholder='City Name' errors={errors} isRequire />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2 my-4'>
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
                      {files.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((file, index) => (
                        <tr key={index} className={(index + currentPage * itemsPerPage) % 2 === 0 ? 'bg-white border-b dark:bg-slate-800 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900'}>
                          <td className='px-6 py-4'>
                            <div className='flex justify-between items-center'>
                              {file.name}
                              <div className='relative'>
                                <button id='dropdownMenuIconButton' data-dropdown-toggle='dropdownDots' className=' inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600' type='button' onClick={() => setOpenedDropdown(index + currentPage * itemsPerPage)}>
                                  <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' style={{ pointerEvents: 'none' }}><path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' /></svg>
                                </button>
                                {openedDropdown === index + currentPage * itemsPerPage && (
                                  <div id='dropdownDotsHorizontal' className='absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'>
                                    <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownMenuIconHorizontalButton'>
                                      <li>
                                        <button className='block px-4 py-2 min-w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left' onClick={() => handleRenameFile(index + currentPage * itemsPerPage)}>
                                          Rename
                                        </button>
                                      </li>
                                      <li>
                                        <button className='block px-4 py-2 min-w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left' onClick={() => handleDeleteFile(index + currentPage * itemsPerPage)}>
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
          <button className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500'>Create</button>
        </form>
      </div>
    </Properties>
  )

  return content
}

export default NewPropertyForm
