import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const TopProduct = ({product}) => {
  return (
    <div className='relative h-fit md:w-[200px] lg:w-[250px]'>
      <HeartIcon product={product} />
      <img src={product.image} alt={product.name} className='h-[150px] w-full rounded object-cover'/>
      <div>
        <Link to={`/product/${product._id}`}>
          <div className='flex justify-between items-center p-4 flex-col md:flex-row'>
            <h2 className='text-white'>{product.name}</h2>
            <span className='bg-cyan-200 text-cyan-800 text-sm px-2 py-1 font-bold rounded-full'>${product.price}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopProduct