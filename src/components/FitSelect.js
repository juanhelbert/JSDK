import React from 'react'
import Select from 'react-select'

const formatOptions = (options, type) => options?.map(i => ({ value: i, label: i, type }))

const selectWrapper = { width: '32%' }

export const FitSelect = ({ id, label, options, placeholder, autoFocus, loading, value, onChange, disabled }) => {
  return (
    <div className='select-wrapper' style={selectWrapper}>
      <legend>{label}</legend>
      <Select
        value={value}
        clearable={false}
        onChange={onChange}
        autoFocus={autoFocus}
        isDisabled={disabled || loading}
        options={formatOptions(options, id)}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
      // placeholder={loading ? <Spinner size='sm' className='spinner' /> : placeholder}
      />
    </div>
  )
}
