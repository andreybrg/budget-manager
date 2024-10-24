import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPostAPI } from './addPostAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { updateBudget } from '@modules/auth'

export const addPost = createAsyncThunk(
    'addPost/addPost',
    async ({postType, categoryId, volume, title, postDate}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {
            
            const response = await dispatch(addPostAPI.endpoints.addNewPost.initiate({
                token: token,
                userId: userId,
                postType,
                categoryId,
                volume,
                title,
                postDate,
            }))

            if(!response.error) {
                return fulfillWithValue(true)
            } else {
                throw new Error(response.error.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const mutateBalance = createAsyncThunk(
    'addPost/mutateBalance',
    async ({postType, volume}, {dispatch, fulfillWithValue, rejectWithValue, getState}) => {
        const [ token, userId ] = getAuthLocalStorage()
        const currentBudget = getState().auth.data.profileData.budget
        const newBudget = postType===1 ? currentBudget + volume : currentBudget - volume
        try {
            
            const response = await dispatch(addPostAPI.endpoints.mutateBalance.initiate({
                token: token,
                userId: userId,
                newBudget: newBudget,
            }))

            if(!response.error) {
                dispatch(updateBudget({data: newBudget}))
                return fulfillWithValue(true)
            } else {
                throw new Error(response.error.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const addPostActions = createAsyncThunk(
    'addPost/addPostActions',
    async ({postType, categoryId, volume, title, postDate}, {dispatch, fulfillWithValue, rejectWithValue, getState}) => {
        try {
            
            Promise.all([
                dispatch(addPost({postType, categoryId, volume, title, postDate})),
                dispatch(mutateBalance({postType, volume})),
            ])
            .then(([addPost, mutateBalance])=>{
                fulfillWithValue(true)
            })

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    data: {
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: null
    }
}

const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
    extraReducers: builder =>
        builder
            .addCase(addPostActions.pending, (state) => {
                state.data.isFetching = true
                state.data.isError = false
                state.data.errorMessage = null
            })
            .addCase(addPostActions.fulfilled, (state) => {
                state.data.isFetching = false 
                state.data.isError = false  
                state.data.errorMessage  = null
            })
            .addCase(addPostActions.rejected, (state, action) => {
                state.data.isFetching = false 
                state.data.isError = true
                state.data.errorMessage = action.payload
            })
})



export const { } = addPostSlice.actions
export default addPostSlice.reducer