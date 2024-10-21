import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'



export const postsAPI = createApi({
    reducerPath: 'postsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({

        getPosts: builder.query({
            query: ({token, userId, postType, dateFrom, dateTo}) => {

                let queryUrl = `600/posts?userId=${userId}`
                queryUrl += postType?`&postType=${postType}`:''

                return {
                    url: queryUrl,
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),

        // userCreateProfile: builder.mutation({
        //     query: ({ userId, token }) => {
        //         return {
        //             url: '/660/usersProfileData',
        //             method: 'POST',
        //             body: {
        //                 id: userId,
        //                 isProfileActivated: false,
        //                 userId: userId,
        //                 currencyId: null,
        //                 budget: null,
        //                 themeId: 1,
        //             },
        //             headers: { Authorization: `Bearer ${token}` },
        //         }
        //     },
        // }),
        
        
    }),
})

export const { 
    useGetPostsQuery
} = postsAPI