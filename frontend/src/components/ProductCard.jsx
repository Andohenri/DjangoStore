import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import HeartIcon from './HeartIcon'
import {Link} from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { addToCart } from '../redux/features/cart/cartSlice'
import { useDispatch } from 'react-redux'


const ProductCard = ({p}) => {
   const dispatch = useDispatch()
   const addToCartHandler = (product, qty) => {
      dispatch(addToCart({...product, qty}))
   }
  return (
    <div className='p-3 rounded shadow-lg bg-white/5 bg-opacity-80 backdrop-blur-sm'>
      <section className='relative'>
         <Link to={`/product/${p._id}`}>
            <span className='absolute bottom-3 right-3 bg-cyan-200 text-cyan-600 text-sm font-medium px-2 py-1 rounded-full'>
               {p?.brand}
            </span>
            <img src={p.image} alt={p.name} className='h-[150px] rounded w-[200px] object-cover cursor-pointer'/>
         </Link>
         <HeartIcon product={p} />
      </section>
      <section className='mt-2'>
         <div className="flex justify-between items-center">
            <h5 className='text-md'>{p?.name}</h5>
            <p className='text-cyan-500 font-bold'>{p?.price.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
         </div>
         <p className='w-[200px] text-sm text-slate-300'>{p?.description?.substring(0,60)}...</p>
      </section>
      <section className="mt-2 flex justify-between">
         <Link className='flex items-center gap-2 bg-cyan-400 rounded-lg px-4 py-1' to={`/product/${p._id}`}>Read More <FaArrowRight /></Link>
         <button onClick={() => addToCartHandler(p, 1)}><AiOutlineShoppingCart size={26}/></button>
      </section>
    </div>
  )
}

export default ProductCard