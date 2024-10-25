import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'
import { getMonthStartEnd } from '@shared/utils/getMonthStartEnd'
import { getWeekStartEnd } from '@shared/utils/getWeekStartEnd'



export const postsAPI = createApi({
    reducerPath: 'postsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({

        getPosts: builder.query({
            query: ({token, userId, postType, dayFilter, dateFilterFrom, dateFilterTo, todayDate}) => {

                let queryUrl = `600/posts?userId=${userId}&_sort=id&_order=desc`
                queryUrl += postType ? `&postType=${postType}` : ``


                if(!dateFilterFrom && !dateFilterTo) {
                    if(dayFilter === 'today') {
                        queryUrl += `&date=${todayDate}`
                    }

                    if(dayFilter === 'yesterday') {
                        const day = new Date(todayDate)
                        day.setDate(day.getDate() - 1)
                        queryUrl += `&date=${day.toISOString().split("T")[0]}`
                    }

                    if(dayFilter === 'currentweek') {
                        const {weekStart, weekEnd } = getWeekStartEnd(todayDate)
                        queryUrl += `&date_gte=${weekStart}`
                        queryUrl += `&date_lte=${weekEnd}`
                    }

                    if(dayFilter === 'currentmonth') {
                        const {monthStart, monthEnd } = getMonthStartEnd(todayDate)
                        queryUrl += `&date_gte=${monthStart}`
                        queryUrl += `&date_lte=${monthEnd}`
                    }

                    if(dayFilter === 'last30') {
                        const day = new Date(todayDate)
                        day.setDate(day.getDate() - 30)
                        queryUrl += `&date_gte=${day.toISOString().split("T")[0]}`
                    }

                    
                }

                return {
                    url: queryUrl,
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),
        deletePost: builder.mutation({
            query: ({ token, postId }) => {
                return {
                    url: `600/posts/${postId}`,
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),
        updatePost: builder.mutation({
            query: ({ 
                token,
                postType,
                categoryId,
                volume,
                title,
                postDate,
                postId
            }) => {
                return {
                    url: `600/posts/${postId}`,
                    method: 'PATCH',
                    body: {
                        postType,
                        categoryId,
                        volume,
                        title,
                        date: postDate,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            },
        }),
    }),
})

export const { 
    useGetPostsQuery
} = postsAPI