import { useState } from 'react'
import FieldInput from '../../ui/FieldInput'

const ContactInformation = ({ errors }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')

  const onAccountNumberChanged = e => setAccountNumber(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onPhoneChanged = e => setPhone(e.target.value)
  const onCompanyAddressChanged = e => setCompanyAddress(e.target.value)

  return (
    <div className='bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
      <h3 className='text-xl font-semibold text-slate-800 dark:text-slate-100 text-left mb-2'>Contact Information</h3>
      <div className='md:flex md:justify-between items-center'>
        <div className='md:w-1/2 md:pr-2'>
          <div className='mb-3'>
            <FieldInput label='Account number' value={accountNumber} onChange={onAccountNumberChanged} name='accountNumber' type='text' placeholder='E.g. xxxxxxx99' errors={errors} />
          </div>
          <div>
            <FieldInput label='Email' value={email} onChange={onEmailChanged} name='email' type='email' placeholder='E.g. example@inheritly.com' errors={errors} />
          </div>
        </div>
        <div className='md:w-1/2 md:pl-2'>
          <div className='mb-3'>
            <FieldInput label='Phone' value={phone} onChange={onPhoneChanged} name='phone' type='text' placeholder='E.g. +44 1234 567890' errors={errors} />
          </div>
          <div>
            <FieldInput label='Company Address' value={companyAddress} onChange={onCompanyAddressChanged} name='companyAddress' type='text' placeholder='Company Address' errors={errors} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInformation
