import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { firstStepsAPI } from './firstStepsAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { checkUnauthorizedErrorStatus, getUserProfileData } from '@modules/auth'

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
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error('Ошибка при активации аккаунта')
            }
        } catch (error) {
            console.log(error)
        }
        
    }
)

const initialState = {
    data: {
        isFetching: false
    }
}

const firstStepsSlice = createSlice({
    name: 'firstSteps',
    initialState,
    extraReducers: builder =>
        builder
            .addCase(setUserProfileInitialData.pending, (state) => {
                state.data.isFetching = true
            })
            .addCase(setUserProfileInitialData.fulfilled, (state) => {
                state.data.isFetching = false
            })
            .addCase(setUserProfileInitialData.rejected, (state) => {
                state.data.isFetching = false
            })
})

export const { } = firstStepsSlice.actions
export default firstStepsSlice.reducer