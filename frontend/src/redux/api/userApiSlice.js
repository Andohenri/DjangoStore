import { apiSlice } from "./apiSlice"
import { USER_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body: data
            })
        }),
        // logout:
    })
})

export const {useLoginMutation} = userApiSlice 
