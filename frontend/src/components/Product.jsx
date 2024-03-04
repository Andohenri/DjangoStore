import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div className='relative w-[20rem] bg-white/5 bg-opacity-80 backdrop-blur-sm rounded'>
      <img src={product.image} alt={product.name} className='w-full h-[12rem] rounded-tr rounded-tl'/>
      <HeartIcon product={product}/>
      <Link to={`product/${product._id}`}>
        <div className='flex justify-between sm:items-center p-4 flex-col md:flex-row bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer rounded-br rounded-bl'>
          <h2 className='text-white'>{product.name}</h2>
          <span className='bg-cyan-200 text-cyan-800 text-sm px-2 py-1 font-bold rounded-full'>${product.price}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product