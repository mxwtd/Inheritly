import { useState, useEffect } from 'react'
import { useDeleteFileMutation, useRenameFileMutation } from '../../../features/InvestmentTypes/properties/services/propertiesApiSlice'
import { getFileNameFromUrl } from '../../../hook/getFileNameFromUrl'

const FilesList = ({ id, files, setFiles, type }) => {
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

  const [openedDropdown, setOpenedDropdown] = useState(-1)

  const [
    deletePropertyFile
  ] = useDeleteFileMutation()

  const [
    renamePropertyFile
  ] = useRenameFileMutation()

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

  const handleRenameFile = async (file, index) => {
    const newFileName = window.prompt('Enter new name for the file:', files[index].name)

    if (newFileName) {
      if (file._id) {
        const oldName = getFileNameFromUrl(file.url)
        const newFiles = [...files]
        newFiles[index] = { ...newFiles[index], name: newFileName }
        setFiles(newFiles)

        await renamePropertyFile({ id, fileId: file._id, oldName, newName: newFileName, type })
      } else {
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
    }
  }

  const handleDeleteFile = async (file, index) => {
    const confirmation = window.confirm('Are you sure you want to delete this file?')
    if (confirmation) {
      const newFiles = [...files]
      newFiles.splice(index, 1)
      setFiles(newFiles)

      if (file._id) {
        console.log('File has an id')
        await deletePropertyFile({ id, fileId: file._id, type })
      }
    }
  }

  return (
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
                                onClick={() => handleRenameFile(file, (index + currentPage * itemsPerPage))}
                              >
                                Rename
                              </button>
                            </li>
                            <li>
                              <button
                                type='button'
                                className='block px-4 py-2 min-w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left'
                                onClick={() => handleDeleteFile(file, (index + currentPage * itemsPerPage))}
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
}

export default FilesList
