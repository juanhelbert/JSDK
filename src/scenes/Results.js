import React from 'react'
import { Aside, FitResults } from '../components'

const wrapper = { display: 'flex' }
const aside = { width: '20%' }

export const Results = () => {
  return (
    <div className='fitment-results' style={wrapper}>
      <Aside />
      <FitResults />
    </div>
  )
}
