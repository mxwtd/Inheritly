import { useState } from 'react'
import FieldInput from '../../ui/FieldInput'

const ContactInformation = ({ errors }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)

  const onAccountNumberChanged = e => setAccountNumber(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onPhoneChanged = e => setPhone(e.target.value)
  const onCompanyAddressChanged = e => setCompanyAddress(e.target.value)

  const handleToggle = () => {
    setIsPrivate(prevIsPrivate => !prevIsPrivate)
    console.log(isPrivate)
  }

  return (
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
                  <FieldInput label='Account number' value={accountNumber} onChange={onAccountNumberChanged} name='accountNumber' type='text' placeholder='E.g. xxxxxxx99' errors={errors} isRequire={isPrivate} />
                </div>
                <div>
                  <FieldInput label='Email' value={email} onChange={onEmailChanged} name='email' type='email' placeholder='E.g. example@inheritly.com' errors={errors} isRequire={isPrivate} />
                </div>
              </div>
              <div className='md:w-1/2 md:pl-2'>
                <div className='mb-3'>
                  <FieldInput label='Phone' value={phone} onChange={onPhoneChanged} name='phone' type='text' placeholder='E.g. +44 1234 567890' errors={errors} isRequire={isPrivate} />
                </div>
                <div>
                  <FieldInput label='Company Address' value={companyAddress} onChange={onCompanyAddressChanged} name='companyAddress' type='text' placeholder='Company Address' errors={errors} isRequire={isPrivate} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ContactInformation
