import { useState } from 'react'
import PhotoInput from '../../ui/PhotoInput'
import FieldInput from '../../ui/FieldInput'

const BasicInformation = ({ errors, investmentType }) => {
  const [name, setName] = useState('')
  const [, setType] = useState('')
  const [currency, setCurrency] = useState('')
  const [value, setValue] = useState('')

  const onTypeChanged = e => setType(investmentType)
  const onCurrencyChanged = e => setCurrency(e.target.value)
  const onValueChanged = e => setValue(e.target.value)
  const onNameChanged = e => setName(e.target.value)

  return (
    <div className='lg:flex lg:justify-between items-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
      <PhotoInput />
      <div className='lg:w-1/2 lg:pr-2'>
        <div className='mb-3'>
          <FieldInput label='Investment name' value={name} onChange={onNameChanged} name='name' type='text' placeholder='Investment name' errors={errors} isRequire />
        </div>
        <div>
          <FieldInput label='Type' value={investmentType} onChange={onTypeChanged} name='type' type='text' errors={errors} isRequire />
        </div>
      </div>
      <div className='lg:w-1/2 lg:pl-2'>
        <div className='mb-3'>
          <FieldInput label='Currency' value={currency} onChange={onCurrencyChanged} name='currency' type='text' placeholder='E.g. USD' errors={errors} isRequire />
        </div>
        <div>
          <FieldInput label='Value' value={value} onChange={onValueChanged} name='value' type='text' placeholder='Value' errors={errors} isRequire />
        </div>
      </div>
    </div>
  )
}

export default BasicInformation
