import React from 'react'
import styled from 'styled-components'
import { FitPagination, ProductCard } from '.'
import { useFitment } from '../hooks/useFitment'

export const FitResults = () => {
  const { loadingResults, results } = useFitment()
  const { raw: products, totalFacetedProducts: resultsCount } = results || {}
  const amountOfResults = resultsCount?.[0]?.total

  return loadingResults
    ? 'Loading...'
    : (
      <Wrapper>
        {amountOfResults > 0 && <p style={{ width: '100%' }}><b>{amountOfResults}</b> items were found</p>}
        {amountOfResults > 0 && products.map(i => <ProductCard key={i._id} item={i} />)}
        <FitPagination />
      </Wrapper>
    )
}

const Wrapper = styled.section`
  gap: 15px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`