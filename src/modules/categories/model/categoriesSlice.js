import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { categoriesAPI } from './categoriesAPI'

export const addNewCustomCategory = createAsyncThunk(
    'categories/addNewCustomCategory',
    async ({ userId, name, color, postType }, {dispatch}) => {
        try {
            const response = dispatch(categoriesAPI.endpoints.addCustomCategory.initiate({
                userId,
                name,
                color,
                postType
            }))
            console.log(response)
            return response
        } catch (error) {
            console.log(error.message)
        }
    }
)

const initialState = {
    data: {}
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    // extraReducers: builder =>
    //     builder
    //         .addCase(addNewCustomCategory.pending, (state) => {
                
    //         })
})

export const { } = categoriesSlice.actions
export default categoriesSlice.reducer