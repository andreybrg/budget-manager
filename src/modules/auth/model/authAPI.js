import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_API_URL = 'http://localhost:8080/'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: ({ email, password }) => {
                return {
                url: 'register',
                method: 'POST',
                body: {
                    email: email,
                    password: password
                },
                // validateStatus: (response, result) =>
                //     response.status === 201
                }
            },
        }),
        userLogin: builder.mutation({
            query: ({ email, password }) => {
                return {
                url: 'login',
                method: 'POST',
                body: {
                    email: email,
                    password: password
                },
                // validateStatus: (response, result) =>
                //     response.status === 201
                }
            },
        }),
        checkAuthorization: builder.query({
            query: ({token, id}) => ({
                url: `600/users/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                // validateStatus: (response, result) =>
                //     response.status === 200 && !result.error
            }),
        })
    }),
})

export const { 
    useUserRegisterMutation,
    useUserLoginMutation,
    useCheckAuthorizationQuery
} = authAPI