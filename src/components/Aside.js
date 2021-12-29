import React from 'react'
import { useFitment } from '../hooks/useFitment'
import { FilterGroup, FixedFilterGroup } from '.'

export const Aside = () => {
  const { activeFilters, results, loadingResults } = useFitment()
  const { year, make, model } = activeFilters || {}
  const groups = results && Object.keys(results)?.filter(i => i !== 'raw' && i !== 'totalFacetedProducts')

  return (
    <aside>
      <nav>
        <FixedFilterGroup title='Year' value={year} />
        <FixedFilterGroup title='Make' value={make} />
        <FixedFilterGroup title='Model' value={model} />
        {loadingResults ? 'Loading...' : groups?.map(i => <FilterGroup key={i} id={i} />)}
      </nav>
    </aside>
  )
}
