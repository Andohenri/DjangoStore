import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import Product from '../../components/Product'

const Home = () => {

  const { keyword } = useParams()
  const { data, isLoading, isError} = useGetProductsQuery({keyword})

  if(isLoading) return <Loader />
  if(isError) return <h1>Could not fetch the products</h1>

  return (
    <div>
      {!keyword ? <Header /> : null}
      <hr className='my-8'/>
      <div>
        <div className="flex justify-between items-center text-white">
          <h1 className='font-bold text-2xl'>Specials products</h1>
          <Link className='bg-cyan-600 font-bold rounded-lg px-4 py-1' to={`/shop`}>Shop</Link>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8 my-8'>
          {data.products.map(p => (
            <div key={p._id}>
              <Product product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home