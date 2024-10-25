import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        addCustomCategory: builder.mutation({
            query: ({ userId, name, color, postType }) => ({
                url: `/categories`,
                method: 'POST',
                body: {
                    userId,
                    name,
                    color,
                    postType,
                    isDefault: false
                }
            }),
        }),
        editCustomCategory: builder.mutation({
            query: ({ categoryId, newName, color, token }) => ({
                url: `/600/categories/${categoryId}`,
                method: 'PATCH',
                body: {
                    name: newName,
                    color
                },
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        deleteCustomCategory: builder.mutation({
            query: ({ categoryId, token }) => ({
                url: `/600/categories/${categoryId}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        getPostsForPatch: builder.mutation({
            query: ({ categoryId, token }) => ({
                url: `/600/posts?categoryId=${categoryId}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        movePostsInDefault: builder.mutation({
            query: ({ id, newCategoryId, token }) => ({
                url: `/600/posts/${id}`,
                method: 'PATCH',
                body: {
                    categoryId: newCategoryId
                },
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
    }),
})

export const { 

} = categoriesAPI