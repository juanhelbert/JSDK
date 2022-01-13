import React from 'react'
import Slider from 'rc-slider'
import styled from 'styled-components'
import { useFitment, useShopData } from '../hooks'
import SliderCSS from 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

export const FitPriceRange = ({ item }) => {
  const { primary_color } = useShopData() || {}
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
    <Wrapper color={primary_color || '#000'}>
      <Range
        min={aMin}
        max={aMax}
        marks={marks}
        tipFormatter={val => `$${val}`}
        onAfterChange={e => handleChange(e)}
        defaultValue={[cMin || aMin, cMax || aMax]}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
    ${SliderCSS}
    margin: 5px 20px 40px 15px;
    
    *:empty {
      display: unset;
    }
    
    .rc-slider-track {
      background-color: ${({ color }) => color ? color : ''};
    }

    .rc-slider-handle {
      border-color: ${({ color }) => color ? color : ''};
    }

    .rc-slider-handle-dragging {
      box-shadow: 0 0 0 2px ${({ color }) => color ? color : ''} !important;
      border-color: ${({ color }) => color ? color : ''} !important;
    }
`