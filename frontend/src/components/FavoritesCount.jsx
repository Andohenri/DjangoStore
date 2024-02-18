import { useSelector } from "react-redux"

const FavoritesCount = () => {
   const favorites = useSelector(state => state.favorites)
   const favoritesCount = favorites.length
  return (
    <>
      {favoritesCount > 0 && <div className="bg-pink-500 h-7 w-7 flex items-center justify-center rounded-full text-sm text-white ml-4">{favoritesCount}</div>}
    </>
  )
}

export default FavoritesCount