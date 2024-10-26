import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPostAPI } from './addPostAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { checkUnauthorizedErrorStatus, updateBudget } from '@modules/auth'
import { setNewMicroalert } from '@modules/alerts'

export const addPost = createAsyncThunk(
    'addPost/addPost',
    async ({postType, categoryId, volume, title, postDate}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {
            
            const response = await dispatch(addPostAPI.endpoints.addNewPost.initiate({
                token: token,
                userId: Number(userId),
                postType,
                categoryId,
                volume,
                title,
                postDate,
            }))

            if(!response.error) {
                return fulfillWithValue(true)
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                dispatch(setNewMicroalert({text: 'Ошибка добавления записи'}))
                throw new Error(response.error.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const getNewBudget = (postType, volume, inversed, currentBudget, oldVolume) => {

    if(oldVolume) {
        if(volume !== oldVolume) {
            return currentBudget + (volume - oldVolume)
        } else {
            return null
        }
    } else {
        if(!inversed) {
            return postType===1 ? currentBudget + volume : currentBudget - volume
        } else {
            return postType===1 ? currentBudget - volume : currentBudget + volume
        }
    }
}

export const mutateBalance = createAsyncThunk(
    'addPost/mutateBalance',
    async ({postType, volume, inversed, oldVolume=null}, {dispatch, fulfillWithValue, rejectWithValue, getState}) => {
        
        const [ token, userId ] = getAuthLocalStorage()
        const currentBudget = getState().auth.data.profileData.budget
        const newBudget = getNewBudget(postType, volume, inversed, currentBudget, oldVolume)

        if(newBudget !== null) {
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
    }
)


export const addPostActions = createAsyncThunk(
    'addPost/addPostActions',
    async ({postType, categoryId, volume, title, postDate}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        try {
            
            await Promise.all([
                dispatch(addPost({postType, categoryId, volume, title, postDate})),
                dispatch(mutateBalance({postType, volume})),
            ])
            .then(([addPost, mutateBalance])=>{
                return fulfillWithValue(true)
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
                state.data.isSuccess = false
                state.data.isError = false
                state.data.errorMessage = null
            })
            .addCase(addPostActions.fulfilled, (state) => {
                state.data.isFetching = false
                state.data.isSuccess = true
                state.data.isError = false
                state.data.errorMessage  = null
            })
            .addCase(addPostActions.rejected, (state, action) => {
                state.data.isFetching = false
                state.data.isSuccess = false
                state.data.isError = true
                state.data.errorMessage = action.payload
            })
})



export const { } = addPostSlice.actions
export default addPostSlice.reducer