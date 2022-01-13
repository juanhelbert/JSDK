import React from 'react'
import { useFitment } from '../hooks'
import styled from 'styled-components'

export const FitPagination = () => {
  const { results, activeFilters, pageSize, updateURL } = useFitment()
  const { page: pageIndex } = activeFilters || {}
  const { totalFacetedProducts: resultsCount } = results || {}
  const amountOfResults = resultsCount?.[0]?.total
  const pageCount = Math.ceil(amountOfResults / pageSize)
  const canPreviousPage = pageIndex > 0
  const canNextPage = (pageIndex + 1) < pageCount
  const gotoPage = p => updateURL('page', p)

  return (
    <Wrapper>
      <Pagination>
        {pageCount > 3 && (
          <>
            <PaginationItem disabled={!canPreviousPage}><PaginationLink onClick={() => gotoPage(0)}>{`«`}</PaginationLink></PaginationItem>
            <PaginationItem disabled={!canPreviousPage}><PaginationLink onClick={() => gotoPage(pageIndex - 1)}>{`‹`}</PaginationLink></PaginationItem>
          </>
        )}
        {pageCount > 1 && [-2, -1, 0, 1, 2]
          .filter(index => pageIndex + 1 + index > 0 && pageIndex + 1 + index <= pageCount)
          .map(index =>
            <PaginationItem key={pageIndex + 1 + index} active={index === 0}>
              <PaginationLink onClick={() => gotoPage(pageIndex + index)}>{pageIndex + 1 + index}</PaginationLink>
            </PaginationItem>
          )}
        {pageCount > 3 && (
          <>
            <PaginationItem disabled={!canNextPage}><PaginationLink onClick={() => gotoPage(pageIndex + 1)}>{`›`}</PaginationLink></PaginationItem>
            <PaginationItem disabled={!canNextPage}><PaginationLink onClick={() => gotoPage(pageCount - 1)}>{`»`}</PaginationLink></PaginationItem>
          </>
        )}
      </Pagination>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Pagination = styled.ul`
  display: flex;
`

const PaginationItem = styled.li`
  margin: 10px 5px;
  ${p => p.active ? 'font-weight: bold' : ''};
`

const PaginationLink = styled.a`
  cursor: pointer;
`
