import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@shared/constants'

export const firstStepsAPI = createApi({
    reducerPath: 'firstStepsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        setProfileInitialData: builder.mutation({
            query: ({ token, currencyId, budget, id }) => ({
                url: `/660/usersProfileData/${id}`,
                method: 'PATCH',
                body: {
                    currencyId,
                    budget,
                    isProfileActivated: true,
                },
                headers: { Authorization: `Bearer ${token}` },
                
            }),
        })
    }),
})

export const { 
    useSetProfileInitialDataMutation
} = firstStepsAPI