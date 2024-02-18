import { useSelector } from 'react-redux'
import TopProduct from '../../components/TopProduct'
const Favorites = () => {
   const favorites = useSelector(state => state.favorites)
  return (
    <div className='flex flex-wrap mt-10 h-fit gap-4'>
      {favorites.map(product => (
         <TopProduct key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Favorites