import axios from 'axios'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export const ProductCard = ({ item }) => {
  const { facets, channels } = item || {}
  const { price, brand } = facets || {}
  const { shopify } = channels || {}
  const { url, path } = shopify || {}

  const fetchShopifyProductData = async () => {
    const result = await axios.get(`${path}${url}.json`)
    setData(result)
  }

  const [data, setData] = useState()

  useEffect(() => {
    // if (shop === 'shopify') fetchShopifyProductData()
    fetchShopifyProductData()
  }, [fetchShopifyProductData])

  return (
    <Card className='product'>
      <Link href={url}>
        <Img src={data?.data?.product?.image?.src} alt={data?.data?.product?.image?.alt} loading='lazy' />
        <Span className='product__brand'>{brand}</Span>
        <Span className='product__name'>{data?.data?.product?.title}</Span>
        <Strong className='product__price'>${price}</Strong>
      </Link>
    </Card>
  )
}

const Card = styled.article`
  width: calc((100% - 45px) / 4);

  @media (max-width: 768px) {
    width: calc((100% - 15px) / 2)
  }

  @media (max-width: 576px) {
    width: 100%
  }
`

const Link = styled.a`
  color: unset;
  display: block;
  text-decoration: none;
`

const Img = styled.img`
  width: 100%;
  height: 175px;
  object-fit: cover;
`

const Span = styled.span`
  width: 100%;
  display: block;

  &.brand {
    font-size: 80%;
  }
`

const Strong = styled.strong`
  font-size: 120%;
`