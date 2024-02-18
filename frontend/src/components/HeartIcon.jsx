import { useEffect } from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites, setFavorites } from '../redux/features/favorites/favoriteSlice'
import { addfavoriteToLocalStorage, removeFavoriteFromLocalStorage, getFavoritesFromLocalStorage } from '../utils/localStorage'

const HeartIcon = ({product}) => {

   const dispatch = useDispatch()
   const favorites = useSelector(state => state.favorites) || []
   const isFavorite = favorites.some(p => p._id === product._id)
   useEffect(() => {
      const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
      dispatch(setFavorites(favoritesFromLocalStorage))
   }, [])

   const toggleFavorites = () => {
      if(isFavorite){
         dispatch(removeFromFavorites(product))
         removeFavoriteFromLocalStorage(product._id)
      }else{
         dispatch(addToFavorites(product))
         addfavoriteToLocalStorage(product)
      }
   }
  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-3 cursor-pointer rounded-full p-2 bg-black bg-opacity-50'>
      {isFavorite ? <FaHeart className='text-pink-500'/> : <FaRegHeart className='text-white' />}
    </div>
  )
}

export default HeartIcon