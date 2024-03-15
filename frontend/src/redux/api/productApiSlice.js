import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: ({keyword}) => ({
            url: `${PRODUCT_URL}`,
            params: { keyword }
         }),
         keepUnusedDataFor: 5,
         providesTags: ["Product"]
      }),
      getProductById: builder.query({
         query: (productId) => `${PRODUCT_URL}/${productId}`,
         providesTags: (result, error, productId) => [
            { type: "Product", id: productId}
         ]
      }),
      allProducts: builder.query({
         query: () => `${PRODUCT_URL}/all-products`
      }),
      createProduct: builder.mutation({
         query: (data) => ({
            url: `${PRODUCT_URL}`,
            method: "POST",
            body: data
         }),
         invalidatesTags: ["Product"]
      }),
      updateProduct: builder.mutation({
         query: ({productId, formData}) => ({
            url: `${PRODUCT_URL}/${productId}`,
            method: "PUT",
            body: formData
         })
      }),
      daleteProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCT_URL}/${productId}`,
            method: "DELETE",
         }),
         providesTags: ["Product"]
      }),
      createReview: builder.mutation({
         query: (data) => ({
            url: `${PRODUCT_URL}/${data.productId}/review`,
            method: "POST",
            body: data
         })
      }),
      getTopProducts: builder.query({
         query: () => `${PRODUCT_URL}/top`,
         keepUnusedDataFor: 5
      }),
      getNewProducts: builder.query({
         query: () => `${PRODUCT_URL}/new`,
         keepUnusedDataFor: 5
      }),
      getFilteredProducts: builder.query({
         query: ({checked, radio}) => ({
            url: `${PRODUCT_URL}/filtered-products`,
            method: "POST",
            body: {checked, radio}
         })
      }),
   })
})

export const { useGetFilteredProductsQuery, useGetProductsQuery, useGetProductByIdQuery, useAllProductsQuery, useCreateProductMutation, useDaleteProductMutation, useUpdateProductMutation, useCreateReviewMutation, useGetTopProductsQuery, useGetNewProductsQuery } = productApiSlice