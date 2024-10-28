import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

export const addPostAPI = createApi({
    reducerPath: 'addPostAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        addNewPost: builder.mutation({
            query: ({ userId, token, postType, title, categoryId, postDate, volume }) => {
                return {
                    url: '660/posts',
                    method: 'POST',
                    body: {
                        userId: userId,
                        postType,
                        categoryId,
                        volume,
                        title,
                        date: postDate
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),
        mutateBalance: builder.mutation({
            query: ({ userId, token, newBudget }) => {
                return {
                    url: `660/usersProfileData/${userId}`,
                    method: 'PATCH',
                    body: {
                        budget: newBudget,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),
    }),
})

export const { 

} = addPostAPI