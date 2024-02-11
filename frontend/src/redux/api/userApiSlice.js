import { apiSlice } from "./apiSlice"
import { USER_URL } from "../constants"
import { RiDatabaseFill } from "react-icons/ri"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: "POST",
                body: data
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USER_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        daleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE"
            })
        }),
        getUserDetails: builder.query({
            query: userId => ({
                url: `${USER_URL}/${userId}`
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.userId}`,
                method:"PUT",
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDaleteUserMutation, useUpdateUserMutation, useGetUserDetailsQuery } = userApiSlice 
