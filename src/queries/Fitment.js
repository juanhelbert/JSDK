import gql from 'graphql-tag'

export const GET_INITIAL_OPTIONS = gql`
  query getInitialOptions ($inStock: Boolean) {
    getInitialOptions (inStock: $inStock) {
      _id
      year
      make
      model
      }
    }
  `

export const GET_RESULTS = gql`
  query getResults ($years: [Int], $makes: [String], $models: [String], $filter: JSONObject!, $targetOrganizationId: String, $offset: Int, $limit: Int) {
    getResults (years: $years, makes: $makes, models: $models, filter: $filter, targetOrganizationId: $targetOrganizationId, offset: $offset, limit: $limit)
  }
`