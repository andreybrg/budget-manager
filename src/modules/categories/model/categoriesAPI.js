import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        addCustomCategory: builder.mutation({
            query: ({ userId, name, color, postType }) => ({
                url: `/customCategories`,
                method: 'POST',
                body: {
                    userId,
                    name,
                    color,
                    postType
                }
            }),
        }),
    }),
})

export const { 

} = categoriesAPI