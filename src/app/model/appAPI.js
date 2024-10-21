import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_API_URL = 'http://localhost:8080/'

export const appAPI = createApi({
    reducerPath: 'appAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getCurrencies: builder.query({
            query: () => ({
                url: `/currencies`,
            }),
        }),
        getPostTypes: builder.query({
            query: () => ({
                url: `/postTypes`,
            }),
        }),
        getFilters: builder.query({
            query: () => ({
                url: `/filters`,
            }),
        }),
    }),
})

export const { 

} = appAPI