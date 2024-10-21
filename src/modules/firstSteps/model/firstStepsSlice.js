import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { firstStepsAPI } from './firstStepsAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { getUserProfileData } from '@modules/auth'

export const setUserProfileInitialData = createAsyncThunk(
    'firstSteps/setUserProfileInitialData',
    async (data, {dispatch}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {
            const response = await dispatch(firstStepsAPI.endpoints.setProfileInitialData.initiate({
                token: token,
                currencyId: data.currencyId,
                budget: data.budget,
                id: userId
            }))
            if(!response.error) {
                dispatch(getUserProfileData())
            } else {
                throw new Error('Ошибка при активации аккаунта')
            }
        } catch (error) {
            console.log(error)
        }
        
    }
)

const initialState = {
    data: {
        isPending: false
    }
}

const firstStepsSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(setUserProfileInitialData.pending, (state) => {
                state.data.isFething = true
            })
            .addCase(setUserProfileInitialData.fulfilled, (state) => {
                state.data.isFething = false
            })
            .addCase(setUserProfileInitialData.rejected, (state) => {
                state.data.isFething = false
            })
})

export const { } = firstStepsSlice.actions
export default firstStepsSlice.reducer