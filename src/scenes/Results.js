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
  display: flex;
`