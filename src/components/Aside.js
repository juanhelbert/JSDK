import React from 'react'
import styled from 'styled-components'
import { useFitment } from '../hooks/useFitment'
import { FilterGroup, FixedFilterGroup } from '.'

export const Aside = ({ showFilters, setShowFilters }) => {
  const { activeFilters, results, loadingResults } = useFitment()
  const { year, make, model } = activeFilters || {}
  const groups = results && Object.keys(results)?.filter(i => i !== 'raw' && i !== 'totalFacetedProducts')

  return (
    <StyledAside active={showFilters}>
      <Wrapper>
        <Button
          className='btn button'
          onClick={() => setShowFilters(false)}
        >
          Close
        </Button>
      </Wrapper>
      <Nav>
        <FixedFilterGroup title='Year' value={year} />
        <FixedFilterGroup title='Make' value={make} />
        <FixedFilterGroup title='Model' value={model} />
        {loadingResults ? 'Loading...' : groups?.map(i => <FilterGroup key={i} id={i} />)}
      </Nav>
    </StyledAside>
  )
}

const StyledAside = styled.aside`
  width: 20%;

  @media (max-width: 576px) {
    top: 0;
    width: 100%;
    z-index: 999;
    height: 100%;
    overflow: auto;
    position: fixed;
    transition: .3s ease;
    background-color: white;
    box-shadow: 0px -5px 20px #00000080;
    left: ${({ active }) => active ? 0 : '-110%'};
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  @media (min-width: 577px) {
    display: none;
  }
`

const Nav = styled.nav``