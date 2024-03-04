import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCreateReviewMutation, useGetProductByIdQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import { FaBox, FaClock, FaShoppingBag, FaShoppingBasket, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import HeartIcon from '../../components/HeartIcon'
import { useState } from 'react'
import Rating from '../../components/Rating'
import moment from 'moment'
import ProductTabs from '../../components/ProductTabs'

const ProductDetails = () => {
   const {id} = useParams()
   const navigate = useNavigate()

   const [qty, setQty] = useState(1)
   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')

   const {data: product, refetch, isLoading, error  } = useGetProductByIdQuery(id)
   const { userInfo } = useSelector(state => state.auth)

   const [createReview, {isLoading: loadingReview}] = useCreateReviewMutation()
  
   const addToCartHandler = () => {
      //a faire
   }
   const submitHandler = async (e) => {
      e.preventDefault()
      try {
         const {error} = await createReview({productId: id, rating, comment}).unwrap()
         if(error) throw new Error(error)
         setComment('')
         console.log('Review created sucessfully')
         refetch()
      } catch (error) {
         console.log(error)
      }
   }

  if(isLoading){
   return <Loader />
  }
  if(error){
   return <h1>Error loading the data</h1>
  }
   return (
      <div className='w-full'>
         <div className='flex flex-wrap items-between gap-4 mt-10 rounded'>
            <div className='relative'>
               <img src={product.image} alt={product.name} className='rounded w-full lg:w-[40rem] object-contain' />
               <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between text-white">
               <h2 className='text-2xl font-semibold'>{product.name}</h2>
               <p>{product.description}</p>
               <p className="text-5xl font-extrabold">${product.price}</p>
               <div className="flex items-center gap-4 justify-between">
                  <div>
                     <h1 className="flex items-center mb-6">
                        <FaStore className='mr-2' /> Brand : {product.brand}
                     </h1>
                     <h1 className="flex items-center mb-6">
                        <FaClock className='mr-2' /> Added : {moment(product.createdAt).fromNow()}
                     </h1>
                     <h1 className="flex items-center mb-6">
                        <FaStar className='mr-2' /> Reviews : {product.numReviews}
                     </h1>
                  </div>
                  <div>
                     <h1 className="flex items-center mb-6">
                        <FaStar className='mr-2' /> Ratings : {product.rating}
                     </h1>
                     <h1 className="flex items-center mb-6">
                        <FaShoppingCart className='mr-2' /> Quantity : {product.quantity}
                     </h1>
                     <h1 className="flex items-center mb-6">
                        <FaBox className='mr-2' /> In Stock : {product.countInStock}
                     </h1>
                  </div>
               </div>
               <div className="flex justify-between">
                  <Rating value={product.rating} color="yellow-500" text={`${product.numReviews} reviews`} />
                  {product.countInStock > 0 && (
                     <div>
                        <select className='p-2 w-24 rounded text-black' value={qty} onChange={(e) => setQty(e.target.value)}>
                           {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                           ))}
                        </select>
                     </div>
                  )}
               </div>
               <button className='py-2 px-4 bg-cyan-700 rounded flex items-center justify-center' onClick={addToCartHandler}><FaShoppingBasket className='mr-2'/>Add to Cart</button>
            </div>
            
            
         </div>
         <div className='flex my-8'>
            <ProductTabs 
               loadingReview={loadingReview}
               userInfo={userInfo}
               submitHandler={submitHandler}
               rating={rating}
               setRating={setRating}
               comment={comment}
               setComment={setComment}
               product={product}
            />
         </div>
      </div>
  )
}

export default ProductDetails