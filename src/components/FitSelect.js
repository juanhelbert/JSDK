import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

const formatOptions = (options, type) => options?.map(i => ({ value: i, label: i, type }))

export const FitSelect = ({ id, label, options, placeholder, autoFocus, loading, value, onChange, disabled }) => {
  return (
    <Wrapper className='select-wrapper'>
      <span>{label}</span>
      <StyledSelect
        value={value}
        clearable={false}
        onChange={onChange}
        autoFocus={autoFocus}
        isDisabled={disabled || loading}
        options={formatOptions(options, id)}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
        placeholder={loading ? 'Loading...' : placeholder}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 32%;
`

const StyledSelect = styled(Select)`
  &:focus-visible {
    box-shadow: none;
  }
`