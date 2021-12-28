import { useQuery } from '@apollo/client'
import { GET_RESULTS } from '../queries/Fitment'
import { useNavigate, useLocation } from 'react-router'

let activeFilters
const pageSize = 48 // Amount of results shown per page

const offset = (pageSize, currentPage) => pageSize * currentPage

const urlFilters = search => {
  if (!search) return {}
  const decoded = decodeURI(search?.split('?filters=')[1])
  try {
    activeFilters = JSON.parse(decoded)
  } catch (e) {
    // Something went wrong with the url filters. Let activeFilters continue to be undefined.
  }
}

const prepareYears = y => y?.split('*')?.map(i => parseInt(i))
const prepareMakes = m => m?.split('*')
const prepareModels = m => m?.split('*')
const prepareFacets = filter => {
  const keys = Object.keys(filter)?.filter(k => k !== 'page')
  const groupsByKey = keys.map(k => filter?.[k]?.split('*')?.map(i => {
    if (k === 'price') {
      const min = i.split('-')[0]
      const max = i.split('-')[1]
      return {
        filterType: 'AND',
        filters: [
          { key: k, opr: '>=', val: min },
          { key: k, opr: '<=', val: max }
        ]
      }
    }

    if (i === 'Other') {
      return {
        filterType: 'OR',
        filters: [
          { key: k, opr: '=', val: '' },
          { key: k, opr: '=', val: null }
        ]
      }
    }

    return { key: k, opr: '=', val: `${i}` }
  }))

  return {
    filterType: 'AND',
    filters: groupsByKey?.map(i => ({ filterType: 'OR', filters: i }))
  }
}

export const useFitment = () => {
  const navigate = useNavigate()
  const search = useLocation().search
  urlFilters(search)
  const { year, make, model, page: currentPage, ...rest } = activeFilters || {}

  const { data: dataR, loading: loadingR, error: errorR } = useQuery(GET_RESULTS, {
    variables: {
      years: prepareYears(year),
      makes: prepareMakes(make),
      models: prepareModels(model),
      filter: prepareFacets(rest),
      limit: pageSize,
      offset: offset(pageSize, currentPage)
    }
  })

  const { getResults } = dataR || []
  const results = getResults?.[0] || {}

  const updateURL = (id, newVal) => {
    let newSearch
    if (newVal || newVal === 0) newSearch = { ...activeFilters, page: 0, [id]: newVal }
    if (newVal === '') {
      delete activeFilters[id]
      newSearch = { ...activeFilters, page: 0 }
    }
    // eslint-disable-next-line
    const sortedObject = newSearch && Object.keys(newSearch)?.sort()?.reduce((r, k) => (r[k] = newSearch[k], r), {})
    const searchAsString = JSON.stringify(sortedObject)
    navigate({
      // pathname: "listing", TODO: check this
      search: `filters=${searchAsString}`
    })
  }

  /**
   * @param {string} id
   * @param {string} val
   */
  const addFilter = (id, val) => {
    const currentVal = activeFilters[id]
    const newVal = currentVal ? currentVal + '*' + val : val
    updateURL(id, newVal)
  }

  /**
   * @param {string} id
   * @param {string} val
   */
  const removeFilter = (id, val) => {
    const parsed = activeFilters[id]?.split('*').map(i => i.replaceAll(',', ' '))
    const newVal = parsed?.filter(i => i !== val).join('*')
    updateURL(id, newVal)
  }

  return { activeFilters, updateURL, addFilter, removeFilter, results, loadingResults: loadingR, errorResults: errorR, pageSize, currentPage, offset }
}
