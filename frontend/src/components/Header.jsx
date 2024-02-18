import {useGetTopProductsQuery} from '../redux/api/productApiSlice'
import Loader from './Loader'
import ProductCarousel from './ProductCarousel'
import TopProduct from './TopProduct'

const Header = () => {
   const {data, isLoading, error} = useGetTopProductsQuery()
   if(isLoading){
      return <Loader />
   }
   if(error){
      return <h1>Failed to load The resources</h1>
   }
   return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mt-10 ">
         <div className="grid grid-cols-2 h-fit gap-4">
            {data.map(product => (
               <div className="bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer" key={product._id}>
                  <TopProduct product={product} />
               </div>
            ))}
         </div>
         <ProductCarousel />
      </div>
    </>
  )
}

export default Header