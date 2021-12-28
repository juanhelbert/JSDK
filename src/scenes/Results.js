import React from 'react'
import { Aside } from '../components'
import { useQuery, gql } from '@apollo/client'

export const Results = () => {
  // const { loading, error, data } = useQuery(EXCHANGE_RATES)

  return (
    <div className='fitment-results'>
      <Aside />
      {/* <FitResults /> */}
    </div>
  )
}
