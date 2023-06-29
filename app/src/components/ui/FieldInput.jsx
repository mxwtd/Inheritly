const FieldInput = ({ label, value, onChange, name, type, placeholder, errors, isRequire }) => {
  return (
    <>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-slate-700 dark:text-white'>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        className={`bg-slate-200 border ${errors.name ? 'border-red-500' : 'border-slate-500'} text-slate-700 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-slate-700 dark:${errors.name ? 'border-red-500' : 'border-slate-600'} dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        onChange={onChange}
        {...(isRequire ? { required: true } : {})}
      />
    </>
  )
}

export default FieldInput
