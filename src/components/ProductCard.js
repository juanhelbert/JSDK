import React from 'react'

export const ProductCard = ({ item }) => {
  const { facets, guid, channels } = item || {}
  const { price, brand } = facets || {}
  console.log(channels.shopify.url)

  return (
    <div className='product' style={{ width: 'calc((100% - 45px) / 4)' }}>
      <h6 className='mt-2 text-muted'>
        {brand}
      </h6>
      <h6 className='name mb-n2'>
        {guid}
      </h6>
      <h5 className='price'>
        ${price}
      </h5>
      <a href={channels.shopify.url}>Go to product</a>
    </div>
  )
}
