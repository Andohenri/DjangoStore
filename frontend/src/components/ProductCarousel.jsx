import { useGetNewProductsQuery } from '../redux/api/productApiSlice'
import React, { useRef } from 'react'
import {FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from 'moment'

import { register } from 'swiper/element/bundle'
register()

const ProductCarousel = () => {
  const {data:products, isLoading, error} = useGetNewProductsQuery()
  const div = useRef()

  if(isLoading){
    return null
  }
  if(error){
    return <h1>Error to load the new Products</h1>
  }
  return <div className='flex justify-between flex-col '>
    <h1 className='text-white font-bold text-2xl pb-2'>New Products</h1>
    <swiper-container pagination-clickable="true" autoplay-delay="9000" style={{"--swiper-navigation-color": "#A5F3FC", "--swiper-pagination-color": "#A5F3FC"}}>
      {products.map(p => (
        <swiper-slide key={p._id} lazy="true">
          <div>
            <img src={p.image} alt={p.name} loading="lazy" className='w-full h-[240px] rounded object-cover'/>
          </div>
          <div className="flex justify-beetwen p-4 pr-0 pb-6">
            <div className='w-1/3'>
              <h2>{p.name}</h2>
              <p>$ {p.price}</p>
              <p>{p.description.substring(0, 170)}...</p>
            </div>
            <div className='w-1/3'>
              <h1 className='flex items-center'><FaStore className='mr-2'/> Brand: {p.brand}</h1>
              <h1 className='flex items-center'><FaClock className='mr-2'/> Added: {moment(p.createdAt).fromNow()}</h1>
              <h1 className='flex items-center'><FaStar className='mr-2'/> Reviews: {p.numReviews}</h1>
            </div>
            <div className='w-1/4'>
              <h1 className='flex items-center'><FaStar className='mr-2'/> Ratings: {Math.round(p.rating)}</h1>
              <h1 className='flex items-center'><FaShoppingCart className='mr-2'/> quantity: {p.rating}</h1>
              <h1 className='flex items-center'><FaBox className='mr-2'/> In stock: {p.countInStock}</h1>
            </div>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  </div>
}

export default ProductCarousel