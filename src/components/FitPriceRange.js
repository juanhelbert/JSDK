import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useFitment } from '../hooks/useFitment'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

export const FitPriceRange = ({ item }) => {
  const { min, max } = item || {}
  const { activeFilters, addFilter, removeFilter } = useFitment()
  const { price } = activeFilters || {}

  // Absolute values. The min and max of the entire amount of results, comes from backend.
  const aMin = Math.floor(min)
  const aMax = Math.ceil(max)

  // Current filtered values. Comes from the URL filters.
  const cMin = price?.split('-')?.[0]
  const cMax = price?.split('-')?.[1]

  const marks = { [aMin]: `$${aMin}`, [aMax]: `$${aMax}` }

  const getMin = e => {
    if (e === 0) return 0
    return e || cMin || aMin
  }

  const handleChange = e => {
    const { price } = activeFilters || {}
    const val = `${getMin(e[0])}-${e[1] || cMax || aMax}`
    if (price) removeFilter('price', price)
    addFilter('price', val)
  }

  return (
    <div style={{ margin: '5px 20px 40px 15px' }}>
      <Range
        min={aMin}
        max={aMax}
        marks={marks}
        tipFormatter={val => `$${val}`}
        onAfterChange={e => handleChange(e)}
        defaultValue={[cMin || aMin, cMax || aMax]}
      />
    </div>
  )
}
