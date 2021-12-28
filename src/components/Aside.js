import React from 'react'
import { useFitment } from '../hooks/useFitment'
import { FixedFilterGroup } from '.'

export const Aside = () => {
  const { activeFilters, results, loadingResults } = useFitment()
  console.log({ activeFilters, results, loadingResults })
  const { year, make, model } = activeFilters || {}
  const groups = results && Object.keys(results)?.filter(i => i !== 'raw' && i !== 'totalFacetedProducts')

  return (
    <aside>
      <nav style={{ width: '20%' }}>
        <FixedFilterGroup title='Year' value={year} />
        <FixedFilterGroup title='Make' value={make} />
        <FixedFilterGroup title='Model' value={model} />
        {/* <Loadable
              inline
              loading={loadingResults}
              style={{ marginTop: '4rem' }}
              content={groups?.map(i => <FilterGroup key={i} id={i} />)}
            /> */}
      </nav>
    </aside>
  )
}
