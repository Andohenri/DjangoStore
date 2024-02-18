import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import Loader from '../../components/Loader'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

const AllProducts = () => {
   const {data: products, isLoading, refetch, isError} = useAllProductsQuery()

   if(isLoading){
      return <div className="flex justify-center">
         <Loader/>
      </div>
   }
   if(isError){
      return <h1 className="text-center text-white text-2xl font-bold">Error loading the products</h1>
   }

  return (
   <>
      <div className="relative flex flex-col p-2 w-full">
         <div className="flex justify-between">
            <h1 className="text-white text-2xl font-semibold">All Products({products?.length})</h1>
            <Link className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded" to={`/admin/createProduct`}>Create Product</Link>
         </div>
         <div className="flex flex-wrap justify-start flex-col md:flex-row gap-x-10 gap-y-4 mt-4">
         {products?.map(p => (
               <Link key={p._id} to={`/admin/updateProduct/${p._id}`}>
                  <div className="flex flex-row overflow-hidden gap-4 w-full md:w-[500px] h-[100px] p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer">
                     <img className="w-1/4 object-cover" src={p.image} alt="image" />
                     <div className="flex-1">
                        <h1 className="text-white font-bold ">{p.name}</h1>
                        <h1 className='text-gray-400 '>{p.brand}</h1>
                        <p className="text-white">{p.description.slice(0, 25)}...</p>
                     </div>
                     <div className="w-1/4 flex flex-col">
                        <span className="text-gray-500">{p.createdAt}</span>
                        <Link to={`/admin/updateProduct/${p._id}`} className="px-2 py-1 bg-cyan-500 text-white font-semibold rounded flex items-center justify-between"><span>Update</span><span><FaArrowRight /></span></Link>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   </>
  )
}

export default AllProducts