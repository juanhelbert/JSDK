import React from 'react'
import { ProductCard } from '.'
import { useFitment } from '../hooks/useFitment'

export const FitResults = () => {
  const { loadingResults, results } = useFitment()
  const { raw: products, totalFacetedProducts: resultsCount } = results || {}
  const amountOfResults = resultsCount?.[0]?.total

  return loadingResults ? 'Loading...' : (
    <section style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {amountOfResults > 0 && <p style={{ width: '100%' }}><b>{amountOfResults}</b> items were found</p>}
      {amountOfResults > 0 && products.map(i => <ProductCard key={i._id} item={i} />)}
    </section>
  )
}
