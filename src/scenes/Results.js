import React, { useState } from 'react'
import styled from 'styled-components'
import { Aside, FitResults } from '../components'

export const Results = () => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Wrapper shopify className='fitment-results'>
      <Aside showFilters={showFilters} setShowFilters={setShowFilters} />
      <FitResults>
        <Button
          className='btn button'
          className='show-filters'
          onClick={() => setShowFilters(s => !s)}
        >
          Filters
        </Button>
      </FitResults>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
`

const Button = styled.button`
  @media (min-width: 577px) {
    display: none;
  }
`