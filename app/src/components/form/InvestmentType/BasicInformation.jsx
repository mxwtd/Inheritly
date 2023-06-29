import { useState } from 'react'
import PhotoInput from '../../ui/PhotoInput'
import FieldInput from '../../ui/FieldInput'

const BasicInformation = ({ errors }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [currency, setCurrency] = useState('')
  const [value, setValue] = useState('')

  const onTypeChanged = e => setType(e.target.value)
  const onCurrencyChanged = e => setCurrency(e.target.value)
  const onValueChanged = e => setValue(e.target.value)
  const onNameChanged = e => setName(e.target.value)

  return (
    <div className='md:flex md:justify-between items-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-5'>
      <PhotoInput />
      <div className='md:w-1/2 md:pr-2'>
        <div className='mb-3'>
          <FieldInput label='Property name' value={name} onChange={onNameChanged} name='name' type='text' placeholder='Property name' errors={errors} isRequire />
        </div>
        <div>
          <FieldInput label='Type' value={type} onChange={onTypeChanged} name='type' type='text' placeholder='E.g. Property, Vehicle, etc.' errors={errors} isRequire />
        </div>
      </div>
      <div className='md:w-1/2 md:pl-2'>
        <div className='mb-3'>
          <FieldInput label='Currency' value={currency} onChange={onCurrencyChanged} name='currency' type='text' placeholder='E.g. USD' errors={errors} isRequire />
        </div>
        <div>
          <FieldInput label='Value' value={value} onChange={onValueChanged} name='value' type='text' placeholder='Property Value' errors={errors} isRequire />
        </div>
      </div>
    </div>
  )
}

export default BasicInformation
