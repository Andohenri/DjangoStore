import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/favorites/favoriteSlice'
import cartReducer from './features/cart/cartSlice'
import shopReducer from './features/shop/shopSlice'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        favorites: favoritesReducer,
        auth: authReducer,
        cart: cartReducer,
        shop: shopReducer
    },
    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
})

setupListeners(store.dispatch)
export default store
