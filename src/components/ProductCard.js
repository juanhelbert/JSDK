import axios from 'axios'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export const ProductCard = ({ item }) => {
  const { facets, guid, channels } = item || {}
  const { price, brand } = facets || {}
  const { shopify } = channels || {}
  const { url, path } = shopify || {}

  const [data, setData] = useState({ hits: [] })
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${path}${url}.json`)
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <Card className='product'>
      <a href={url}>
        <img src={data?.data?.product?.image?.src} />
        <span className='brand'>{brand}</span>
        <span className='name'>{guid}</span>
        <strong className='price'>${price}</strong>
      </a>
    </Card>
  )
}

const Card = styled.article`
  width: calc((100% - 45px) / 4);

  a {
    display: block;
    text-decoration: none;
  }

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }

  span {
    width: 100%;
    display: block;
  }
`