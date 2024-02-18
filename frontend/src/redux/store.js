import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoritesReducer from './features/favorites/favoriteSlice'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
})

setupListeners(store.dispatch)
export default store
