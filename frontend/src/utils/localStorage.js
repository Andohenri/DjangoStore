export const addfavoriteToLocalStorage = (product) => {
   const favorites = getFavoritesFromLocalStorage()
   if(!favorites.some(p => p._id === product._id)){
      favorites.push(product)
      localStorage.setItem('favorites', JSON.stringify(favorites))
   }
}
export const removeFavoriteFromLocalStorage = (productId) => {
   const favorites = getFavoritesFromLocalStorage()
   const updateFavorites = favorites.filter(p => p._id !== productId)
   localStorage.setItem('favorites', JSON.stringify(updateFavorites))
}
export const getFavoritesFromLocalStorage = () => {
   const favoritesJSON = localStorage.getItem('favorites')
   return favoritesJSON ? JSON.parse(favoritesJSON) : []
}