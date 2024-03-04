import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetTopProductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader'
import Rating from './Rating'

const ProductTabs = ({loadingReview,userInfo,submitHandler,rating,setRating,comment,setComment,product}) => {
  const { data, isLoading } = useGetTopProductsQuery()
   const [activeTab, setActiveTab] = useState(1)
   if(isLoading){
      return <Loader/>
   }

   return (
    <div className='flex flex-col md:flex-row text-white'>
       <section>
         <div className={`p-2 flex-1 cursor-pointer text-lg ${activeTab === 1 ? "font-bold text-cyan-400" : ""}`} onClick={() => setActiveTab(1)}>
            Write your review
         </div>
         <div className={`p-2 flex-1 cursor-pointer text-lg ${activeTab === 2 ? "font-bold text-cyan-400" : ""}`} onClick={() => setActiveTab(2)}>
            All reviews
         </div>
         <div className={`p-2 flex-1 cursor-pointer text-lg ${activeTab === 3 ? "font-bold text-cyan-400" : ""}`} onClick={() => setActiveTab(3)}>
            Related products
         </div>
       </section>
       <section>
         {activeTab === 1 && (
            <div className='px-4 py-2'>
               {userInfo ? (
                  <form onSubmit={submitHandler}>
                     <label htmlFor="rating" className='block text-sm mb-2'>Rating</label>
                     <select className='mb-2 px-4 py-2 xl:w-[30rem] focus:outline-cyan-100 w-full rounded bg-[#121258] block' id="rating" onChange={e => setRating(e.target.value)} required value={rating}>
                        <option value="">Select</option>
                        <option value="1">Inferior</option>
                        <option value="2">Decent</option>
                        <option value="3">Great</option>
                        <option value="4">Excellent</option>
                        <option value="5">Exceptionnal</option>
                     </select>
                     <label htmlFor="comment" className='block text-sm mb-2'>Comment</label>
                     <textarea className="mb-2 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Write your review" type="text" value={comment} onChange={e => setComment(e.target.value)}></textarea>
                     <button type='submit' disabled={loadingReview} className='py-2 px-4 bg-cyan-700 rounded'>Submit</button>
                  </form>
               ) : (
                  <p>Please <Link to='/login'>Sign in</Link> to write a review</p>
               )}
            </div>
         )}
         {activeTab === 2 && (
            <div className='px-4 py-2'>
               <p>{product.reviews.lenght === 0  && 'No reviews'}</p>
               {product?.reviews.map(review => (<>
                     <div className="bg-[#121258] mb-1 p-2">
                        <div className='flex justify-between w-full md:w-[40rem] rounded'>
                           <strong>{review.name}</strong>
                           <p className="text-gray-500">{review.createdAt.substring(0,10)}</p>
                        </div>
                        <p className="text-sm mb-1">{review.comment}</p>
                        <Rating value={review.rating} color='yellow' />
                     </div>
                  </>
               ))}
            </div>
         )}
       </section>

    </div>
  )
}

export default ProductTabs