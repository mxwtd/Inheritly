import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetWillMutation } from '../services/openAIApiSlice'

const GenerateWill = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [jurisdiction, setJurisdiction] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [address, setAddress] = useState('')
  const [considerations, setConsiderations] = useState('')
  const [willContent, setWillContent] = useState('')

  const [willGenerator, {
    isSuccess
  }] = useGetWillMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await willGenerator({name, surname, jurisdiction, dateOfBirth, address, considerations})
      setWillContent(response.data.message)
    } catch (error) {
      console.error(error.response ? error.response.data : error)
    }
  };
  
  useEffect(() => {
    setContent(willContent)
  }, [willContent])

  const [content, setContent] = useState(willContent)

  const handleContentEdit = (e) => {
    setContent(e.target.innerHTML)
  }

  const handleSave = () => {
    // Save the content to local storage, a database, etc. Here is an example using local storage:
    localStorage.setItem('willContent', content)
  }

  return (
    <>
      <div className='p-4 sm:ml-64 min-h-screen'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Generate</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
                <h3 className='mb-4 text-xl font-semibold text-slate-800 dark:text-slate-100 text-left'>Your Info</h3>
                <div>
                  <div>
                    <div className='mb-3 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>First Name</label>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='First Name'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Surname</label>
                        <input
                          type='text'
                          name='surname'
                          id='surname'
                          value={surname}
                          onChange={e => setSurname(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Surname'
                        />
                      </div>
                    </div>
                    <div className='mb-3 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Jurisdiction of Will</label>
                        <input
                          type='text'
                          name='jurisdiction'
                          id='jurisdiction'
                          value={jurisdiction}
                          onChange={e => setJurisdiction(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Jurisdiction'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Date of Birth</label>
                        <input
                          type='date'
                          name='dateOfBirth'
                          id='dateOfBirth'
                          value={dateOfBirth}
                          onChange={e => setDateOfBirth(e.target.value)}
                          className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                      </div>
                    </div>
                    <div className='mb-3 flex flex-row w-full gap-4'>
                      <div className='flex flex-col w-full'>
                        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Address</label>
                        <textarea
                          name='address'
                          id='address'
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          className='bg-slate-200 border h-40 border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Address'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
                <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Will Details</h3>
                <div className='bg-blue-500 text-white my-4 p-4 rounded-xl flex flex-row items-center gap-3'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    className='w-5 h-5'
                    strokeWidth='1.5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                    />
                  </svg>
                  <h1>
                    Add any details you would like to be included in your will. <br /><span className='text-xs'>(E.g. who gets what, Proportions, etc.)</span>
                  </h1>
                </div>
                <div>
                  <div>
                    <div className='mb-3 w-full'>
                      <textarea
                        name='considerations'
                        id='considerations'
                        value={considerations}
                        onChange={e => setConsiderations(e.target.value)}
                        className='bg-slate-200 border border-slate-500 text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 h-40 resize-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Details...'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 col-span-2'>
                <button type='submit' className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer min-w-full w-full'>
                  Generate
                </button>
              </div>
            </div>
          </form>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 mb-8 mt-12'>Your Wills</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
            <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 col-span-2'>
              <p
                className='text-slate-800 dark:text-white p-2'
                contentEditable='true'
                onInput={handleContentEdit}
                dangerouslySetInnerHTML={{ __html: content.split('\n').join('<br/>') }}
              />
            </div>
            <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 flex flex-row gap-4 col-span-2'>
              <button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer'>
                Create PDF
              </button>
              <button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer'>
                Export PDF
              </button>
              <button onClick={handleSave} className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 active:bg-blue-700 cursor-pointer'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenerateWill
