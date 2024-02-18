import React, { useRef } from 'react'
import TopProduct from './TopProduct'

const ProductCarousel = ({products}) => {
  const div = useRef()
  return (
    <div ref={div} className=''>
      Productcarousel
    </div>
  )
}

export default ProductCarousel