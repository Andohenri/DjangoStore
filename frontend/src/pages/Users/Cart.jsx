import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../../redux/features/cart/cartSlice'

const Cart = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { cartItems, itemsPrice } = useSelector(state => state.cart)

   const addToCartHandler = (product, qty) => {
      dispatch(addToCart({...product, qty}))
   }
   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
   }
   const checkoutHandler = () => {
      navigate('/login?redirect=/shipping')
   }
  return (
   <>
      <div className='text-white container mx-auto flex justify-around items-start flex-wrap mt-6'>
         {cartItems.length === 0 ? (
            <div>
               Your cart is empty <Link className='text-cyan-600 font-bold' to={'/shop'}>Go To shop</Link>
            </div>
         ) : (
            <>
               <div className='flex flex-col gap-4 md:w-[90%]'>
                  <h1 className="text-2xl font-semibold">Shopping cart</h1>
                  {cartItems.map(item => (
                     <div key={item._id} className="flex items-center gap-4">
                        <div className='w-20 h-20'>
                           <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded' />
                        </div>
                        <div className='flex-1'>
                           <Link  className='text-cyan-500' to={`/product/${item._id}`}>
                              {item.name}
                           </Link>
                           <p className='text-sm'>{item.brand}</p>
                           <p className='font-bold'>$ {item.price}</p>
                        </div>
                        <div>
                           <select className='p-2 w-20 rounded text-black' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                              {[...Array(item.countInStock).keys()].map(x => (
                                 <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                           </select>
                        </div>
                        <div className='text-red-500' onClick={() => removeFromCartHandler(item._id)}>
                           <button><FaTrash/></button>
                        </div>
                     </div>
                  ))}
                  <div>
                     <p className='text-xl font-semibold'>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</p>
                     <p className='text-2xl font-bold'>$ {itemsPrice}</p>
                     <button onClick={checkoutHandler} disabled={cartItems.length === 0} className='bg-cyan-600 disabled:opacity-90 py-2 mt-4 px-4 rounded text-lg'>Proceed to checkout</button>
                  </div>
               </div>
            </>
         )}
      </div>
   </>
  )
}

export default Cart