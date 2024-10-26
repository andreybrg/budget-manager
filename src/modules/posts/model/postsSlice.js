import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from './postsAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { setNewMicroalert } from '@modules/alerts'
import { mutateBalance } from '@modules/addPost'
import { checkUnauthorizedErrorStatus } from '@modules/auth'

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
    async (data, {dispatch, getState, fulfillWithValue, rejectWithValue}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {
            const todayDate = getState().app.data.appData.todayDate
            const filters = getState().filters.filtersData
            
            const response = await dispatch(postsAPI.endpoints.getPosts.initiate({
                    todayDate: todayDate,
                    token: token, 
                    userId: userId, 
                    postType: filters.postType,
                    dayFilter: filters.dayFilter,
                    dateFilterFrom: filters.dateFrom,
                    dateFilterTo: filters.dateTo,
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
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
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

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({postId, postType, volume}, {dispatch, getState, fulfillWithValue, rejectWithValue}) => {
        dispatch(addDeletePostFetchingId({id: postId}))
        const [ token, userId ] = getAuthLocalStorage()
        try {
            const response = await dispatch(postsAPI.endpoints.deletePost.initiate({
                postId,
                token: token
            }))
            if(!response.error) {
                await dispatch(mutateBalance({postType, volume, inversed: true}))
                dispatch(setNewMicroalert({text: 'Запись удалена'}))
                return fulfillWithValue({id: postId})
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                dispatch(setNewMicroalert({text: 'Ошибка удаления записи'}))
                throw new Error('Ощибка удаления записи')
            }
        } catch (error) {
            return rejectWithValue(true)
        }
    }
)



export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({postType, categoryId, volume, title, postDate, postId}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        const [ token, _ ] = getAuthLocalStorage()
        try {
            
            const response = await dispatch(postsAPI.endpoints.updatePost.initiate({
                token: token,
                postType,
                categoryId,
                volume,
                title,
                postDate,
                postId
            }))
            if(!response.error) {
                return fulfillWithValue(true)
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error(response.error.message)
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updatePostActions = createAsyncThunk(
    'posts/updatePostActions',
    async ({postType, categoryId, volume, title, postDate, postId, oldVolume}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        try {
            
            await Promise.all([
                dispatch(updatePost({postType, categoryId, volume, title, postDate, postId})),
                dispatch(mutateBalance({postType, volume, oldVolume})),
            ])
            .then(([updatePost, mutateBalance])=>{
                return fulfillWithValue(true)
            })

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
        postList: null,
        deletingPost: {
            fetchingPostsIds: [],
        },
        editingPost: {
            isFetching: false,
        }
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostList(state, action) {
            state.data.postList = action.payload.data
        },
        resetPostList(state) {
            state.data.postList = null
        },
        setPostsListInit(state) {
            state.data.isInit = true
        },
        addDeletePostFetchingId(state, action) {
            state.data.deletingPost.fetchingPostsIds.push(action.payload.id)
        },
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

            .addCase(deletePost.fulfilled, (state, action) => {
                const index = state.data.deletingPost.fetchingPostsIds.findIndex(el => el === action.payload.id)
                state.data.deletingPost.fetchingPostsIds.splice(index, 1)
            })

            .addCase(updatePostActions.pending, (state) => {
                state.data.editingPost.isFetching = true
            })
            .addCase(updatePostActions.fulfilled, (state) => {
                state.data.editingPost.isFetching = false 
            })
            .addCase(updatePostActions.rejected, (state) => {
                state.data.editingPost.isFetching = false 
            })
})

export const { setPostList, setPostsListInit, resetPostList, addDeletePostFetchingId } = postsSlice.actions
export default postsSlice.reducer