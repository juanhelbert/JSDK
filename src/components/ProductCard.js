import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const ProductCard = ({ item }) => {
  const { facets, guid, channels } = item || {}
  const { price, brand } = facets || {}
  const { shopify } = channels || {}
  const { url, path } = shopify || {}

  const Card = styled.a`
    width: calc((100% - 45px) / 4);
    /* TODO: delete this */
    background: ${props => props.theme.shop === 'shopify' ? 'green' : 'blue'};
  `;

  // cometic-85-5mm-bore-head-gasket-mitsubishi-4g63-dsm-eclipse-gst-gsx-talon-tsi-c4233-051

  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${path}${url}.json`)
      setData(result);
    };

    fetchData();
  }, []);
  console.log(data)

  return (
    <Card className='product' href={url}>
      <img src={data?.data?.product?.image?.src} style={{ maxWidth: '100%', height: '75%', objectFit: 'cover' }} />
      <h6 className='mt-2 text-muted'>
        {brand}
      </h6>
      <h6 className='name mb-n2'>
        {guid}
      </h6>
      <h5 className='price'>
        ${price}
      </h5>
      <a href={url}>Go to product</a>
    </Card>
  )
}
