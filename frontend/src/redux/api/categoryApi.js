import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllCategories: builder.query({
         query: () => `${CATEGORY_URL}`,
      }),
      createCategory: builder.mutation({
         query: (data) => ({
            url: `${CATEGORY_URL}`,
            method: "POST",
            body: data
         })
      }), 
      updateCategory: builder.mutation({
         query: (data) => ({
            url: `${CATEGORY_URL}/${data.id}`,
            method: "PUT",
            body: data,
            
         })

      }),
      deleteCategory: builder.mutation({
         query: (id) => ({
            url: `${CATEGORY_URL}/${id}`,
            method: "DELETE"
         })
      })
   })
})

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useGetAllCategoriesQuery, useDeleteCategoryMutation } = categoryApiSlice