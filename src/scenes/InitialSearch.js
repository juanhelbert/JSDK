import React, { useState, useEffect } from 'react'
// import { fakeData } from '../fakeData'
import { FitSelect } from '../components'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { GET_INITIAL_OPTIONS } from '../queries/Fitment'

const uniqueValues = (array, key) => [...new Set(array?.map(i => i?.[key]))]

const getSuredoneID = () => {
  const req = new XMLHttpRequest()
  req.open('GET', document.location, false)
  req.send(null)
  const headers = req.getAllResponseHeaders().toLowerCase()
  const uid = headers?.split('\r\n')?.filter(i => i.includes('suredone-uid'))
  if (uid?.length === 0) {
    console.log('Your SureDone ID could not be successfully received')
    return null
  }
  const suredoneUID = uid?.[0].split(': ')?.[1]
  console.log({ suredoneUID })
  return suredoneUID
}

getSuredoneID()


export const InitialSearch = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState({})

  const { data, loading } = useQuery(GET_INITIAL_OPTIONS, {
    variables: {
      inStock: false,
      userId: 687558
    }
  })
  const { getInitialOptions: options } = data || {}

  const getOptions = key => {
    if (key === 'year') {
      const years = uniqueValues(options, key)
      return years?.sort((a, b) => b - a)
    }
    if (key === 'make') {
      const filtered = options?.filter(i => i?.year === selected?.year?.value)
      const makes = uniqueValues(filtered, key)
      return makes
    }
    if (key === 'model') {
      const filtered = options?.filter(i => i?.year === selected?.year?.value && i?.make === selected?.make?.value)
      const models = uniqueValues(filtered, key)
      return models
    }
  }

  const handleChange = e => {
    const { type } = e || {}
    setSelected(prev => ({ ...prev, [type]: e }))
    if (type === 'year') {
      setSelected(prev => ({ ...prev, make: undefined, model: undefined }))
    }
    if (type === 'make') {
      setSelected(prev => ({ ...prev, model: undefined }))
    }
  }

  useEffect(() => {
    const { year, make, model } = selected || {}
    if (model) navigate(`/fitment/result?filters={"year":"${year.value}","make":"${make.value}","model":"${model.value}","page":0}`)
  }, [selected, navigate])

  const section = { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }

  return (
    <section style={section}>
      <p style={{ width: '100%' }} >Find your part</p>
      <FitSelect
        autoFocus
        id='year'
        label='Year'
        loading={loading}
        disabled={loading}
        placeholder='2020'
        value={selected.year}
        onChange={handleChange}
        options={getOptions('year')}
      />
      <FitSelect
        id='make'
        label='Make'
        loading={loading}
        placeholder='Jeep'
        value={selected.make}
        onChange={handleChange}
        disabled={!selected?.year}
        options={getOptions('make')}
      />
      <FitSelect
        id='model'
        label='Model'
        loading={loading}
        placeholder='Wrangler'
        value={selected.model}
        onChange={handleChange}
        disabled={!selected?.make}
        options={getOptions('model')}
      />
    </section>
  )
}
