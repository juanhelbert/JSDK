import React, { useState } from 'react'
import { FitPriceRange } from '.'
import { useFitment } from '../hooks/useFitment'
// import 'rc-slider/assets/index.css'

const amountOfInitialOptions = 5

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
      <li className='menu-item pr-3' key={idx}>
        <div className='mb-0'>
          <label check className='custom-control custom-checkbox mb-0' style={{ cursor: 'pointer' }}>
            <input
              type='checkbox'
              checked={isChecked(item)}
              className='custom-control-input'
              onChange={e => handleCheck(e, item)}
            />
            <span className='custom-control-label d-flex'>
              {sanitized}
              <span style={{ fontSize: '85%', marginTop: '2px' }} className='ml-1'>({count})</span>
            </span>
          </label>
        </div>
      </li>
    )
  }

  return (options?.length > 0 && !allOptionsAreNull &&
    <>
      <ul className='menu pl-3 pr-0 py-2'>
        <li className='menu-item has-child has-open'>
          <label tag='legend' className='mb-1'>{id}</label>
          <ul className='menu group'>
            {options.slice(0, sliceEnd).map((item, idx) => sanitizeItem(item, idx))}
            {viewMore &&
              <button color='link' size='xs' className='pl-0 mt-1' onClick={() => setSliceEnd(500)}>
                View more
              </button>}
          </ul>
        </li>
      </ul>
      <hr className='my-2' />
    </>
  )
}

export const FixedFilterGroup = ({ title, value }) => {
  return (
    <>
      <ul className='menu pl-3 pr-0 py-0 my-0'>
        <li className='menu-item has-child has-open'>
          <label tag='legend' className='mb-1'>{title}</label>
          <ul className='menu group'>
            <li className='menu-item pr-3'>
              <div className='mb-0'>
                <label check className='custom-control custom-checkbox mb-0' style={{ opacity: 0.6 }}>
                  <input
                    defaultChecked
                    type='checkbox'
                    className='custom-control-input'
                    style={{ pointerEvent: 'none' }}
                  />
                  <span className='custom-control-label d-flex'>{value}
                  </span>
                </label>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <hr className='my-2' />
    </>
  )
}
