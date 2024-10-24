import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

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
                        password: password,
                    },
                }
            },
        }),
        userCreateProfile: builder.mutation({
            query: ({ userId, token }) => {
                return {
                    url: '660/usersProfileData',
                    method: 'POST',
                    body: {
                        id: userId,
                        isProfileActivated: false,
                        userId: userId,
                        currencyId: 0,
                        budget: 0,
                        themeId: 1,
                    },
                    headers: { Authorization: `Bearer ${token}` },
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
                }
            },
        }),
        checkAuthorization: builder.query({
            query: ({token, id}) => ({
                url: `600/users/${id}`,
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        getProfileData: builder.query({
            query: ({token, userId}) => ({
                url: `600/users/${userId}?_embed=usersProfileData`,
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        getCategories: builder.query({
            query: ({token, userId}) => ({
                url: `600/categories?userId=${userId}&_sort=id&_order=desc`,
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        getCustomCategories: builder.query({
            query: ({token, userId}) => ({
                url: `600/customCategories?userId=${userId}&_sort=id&_order=desc`,
                headers: { Authorization: `Bearer ${token}` },
            }),
        })
    }),
})

export const { 
    useUserRegisterMutation,
    useUserLoginMutation,
    useCheckAuthorizationQuery,
    useUserCreateProfileMutation,
    useGetProfileDataQuery
} = authAPI