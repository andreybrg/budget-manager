import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from './postsAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'

export const postsListInit = createAsyncThunk(
    'posts/postsListInit',
    async (data, {dispatch, getState}) => {
        const isPostListInit = getState().posts.data.isInit
        if(!isPostListInit) {
            dispatch(setPostsListInit())
        }
    }
)

export const getPostsList = createAsyncThunk(
    'posts/getPostsList',
    async (data, {dispatch, fulfillWithValue, rejectWithValue}) => {

        const [ token, userId ] = getAuthLocalStorage()
        try {
            const response = await dispatch(postsAPI.endpoints.getPosts.initiate({
                    token: token, 
                    userId: userId, 
                    postType: data.postType
                },
                {
                    subscribe: false, 
                    forceRefetch: true 
                }
            ))
            if(!response.error) {
                dispatch(setPostList({
                    data: response.data
                }))
                return fulfillWithValue(true)
            } else {
                if(response.error.status === 403) {
                    dispatch(setPostList({
                        data: []
                    }))
                    return fulfillWithValue(true)
                } else {
                    throw new Error('Ошибка получения записей')
                }
            }



        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    data: {
        isInit: false,
        isFetching: false,
        isError: false,
        errorMessage: null,
        postList: null
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostList(state, action) {
            state.data.postList = action.payload.data
        },
        setPostsListInit(state) {
            state.data.isInit = true
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getPostsList.pending, (state) => {
                state.data.isFetching = true
                state.data.isError = false
                state.data.errorMessage = null
            })
            .addCase(getPostsList.fulfilled, (state) => {
                state.data.isFetching = false 
                state.data.isError = false  
                state.data.errorMessage  = null
            })
            .addCase(getPostsList.rejected, (state, action) => {
                state.data.isFetching = false 
                state.data.isError = true
                state.data.errorMessage = action.payload
            })
})

export const { setPostList, setPostsListInit } = postsSlice.actions
export default postsSlice.reducer