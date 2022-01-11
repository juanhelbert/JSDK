import React, { useState } from 'react'
import { FitPriceRange } from '.'
import styled from 'styled-components'
import { useFitment } from '../hooks/useFitment'

// TODO: fix this
// const amountOfInitialOptions = 5
const amountOfInitialOptions = 0

export const FilterGroup = ({ id }) => {
  const { results, activeFilters, addFilter, removeFilter } = useFitment()
  delete results.__typename
  const [sliceEnd, setSliceEnd] = useState(amountOfInitialOptions)
  const options = results?.[id]?.map(({ _id, count }) => ({ _id, count }))?.filter(i => i !== 'totalFacetedProducts')
  const allOptionsAreNull = options?.every(i => i._id === null)
  const viewMore = options?.length > amountOfInitialOptions && sliceEnd <= amountOfInitialOptions

  const isChecked = val => {
    const parsed = activeFilters && activeFilters[id]?.split('*')?.map(i => i.replaceAll(',', ' '))
    if (!val) return parsed?.includes('Other')
    return parsed?.includes(val)
  }

  const handleCheck = (e, val) => {
    let formatted
    if (id === 'price') formatted = `${val?.min}-${val?.max}`
    if (!val) formatted = 'Other'
    const wasChecked = e.target.checked
    if (wasChecked) { return addFilter(id, formatted || val) }
    return removeFilter(id, formatted || val)
  }

  const sanitizeItem = (i, idx) => {
    let sanitized
    const { _id: item, count } = i
    if (!item && item !== 0) sanitized = 'Other'
    if (id === 'price') return <FitPriceRange item={item} />
    if (item && (typeof item === 'string')) sanitized = item

    return (
      <Item className='menu__item' key={idx}>
        <Label check className='menu__value'>
          <input
            type='checkbox'
            checked={isChecked(item)}
            onChange={e => handleCheck(e, item)}
          />
          <span>
            {sanitized}
            <Count className='menu__count'>({count})</Count>
          </span>
        </Label>
      </Item>
    )
  }

  return (options?.length > 0 && !allOptionsAreNull &&
    <>
      <Menu className='menu'>
        <Item className='menu__item'>
          <Title className='menu__title'>{id}</Title>
          <Menu className='menu__group'>
            {options.slice(0, sliceEnd).map((item, idx) => sanitizeItem(item, idx))}
            {viewMore &&
              <button onClick={() => setSliceEnd(500)}>
                View more
              </button>}
          </Menu>
        </Item>
      </Menu>
      <Hr />
    </>
  )
}

export const FixedFilterGroup = ({ title, value }) => {
  return (
    <>
      <Menu className='menu'>
        <Item className='menu__item'>
          <Title className='menu__title'>{title}</Title>
          <Label className='menu__value' check disabled>
            <input defaultChecked type='checkbox' />
            <span>{value}</span>
          </Label>
        </Item>
      </Menu>
      <Hr />
    </>
  )
}

const Menu = styled.ul`
  list-style: none;
  `
const Item = styled.li`
  list-style: none;
`

const Title = styled.span`
  display: block;
  font-weight: bold;

  &::first-letter {
    text-transform: uppercase;
  }
`

const Label = styled.label`
  display: block;
  opacity: ${p => p.disabled ? 0.6 : 1};
  ${p => p.disabled ? 'pointer-events: none;' : 'cursor: pointer;'}
`

const Count = styled.span`
  font-size: 80%;
`

const Hr = styled.hr`
  margin: 10px 0;
`