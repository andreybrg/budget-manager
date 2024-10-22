import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

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
        getDayFilters: builder.query({
            query: () => ({
                url: `/dayFilters`,
            }),
        }),
    }),
})

export const { 

} = appAPI