import React from 'react'
import styled from 'styled-components'
import { Aside, FitResults } from '../components'

export const Results = () => {
  return (
    <Wrapper shopify className='fitment-results'>
      <Aside />
      <FitResults />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
`