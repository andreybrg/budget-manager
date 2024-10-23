import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { categoriesAPI } from './categoriesAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'

export const successedCustomCategoryIdSign = createAsyncThunk(
    'categories/successedCustomCategoryIdSign',
    async ({ categoryId }, {dispatch}) => {
        dispatch(addSuccessedCustomCategoryId({id: categoryId}))
        setTimeout(() => {
            dispatch(removeSuccessedCustomCategoryId())
        }, 1000)
    }
)

export const addNewCustomCategory = createAsyncThunk(
    'categories/addNewCustomCategory',
    async ({ userId, name, color, postType }, {dispatch, fulfillWithValue, rejectWithValue}) => {
        try {
            const response = await dispatch(categoriesAPI.endpoints.addCustomCategory.initiate({
                userId,
                name,
                color,
                postType
            }))
            
            if(!response.error) {
                dispatch(successedCustomCategoryIdSign({categoryId: response.data.id}))
                return fulfillWithValue({data: response.data})
            } else {
                throw new Error(response.error.message)
            }
        } catch (error) {
            console.log('Ошибка добавления категории', error.message)
            return rejectWithValue({name})
        }
    }
)


export const editCustomCategory = createAsyncThunk(
    'categories/editCustomCategory',
    async ({ categoryId, newName, categoryColor }, {dispatch, fulfillWithValue, rejectWithValue}) => {
        dispatch(addEditCustomCategoryFetchingId({id: categoryId}))
        const [token, _] = getAuthLocalStorage()
        try {
            const response = await dispatch(categoriesAPI.endpoints.editCustomCategory.initiate({
                categoryId,
                newName,
                color: categoryColor,
                token: token
                
            }))
            if(!response.error) {
                dispatch(successedCustomCategoryIdSign({categoryId}))
                return fulfillWithValue({id: categoryId, newName})
            } else {
                // newMicroalert
                throw new Error(response.error.message)
            }
        } catch (error) {
            console.log('Ошибка изменения названия категории', error.message)
            return rejectWithValue({id: categoryId, newName})
        }
    }
)

export const deleteCustomCategory = createAsyncThunk(
    'categories/deleteCustomCategory',
    async ({ categoryId }, {dispatch, fulfillWithValue, rejectWithValue}) => {
        dispatch(addDeleteCustomCategoryFetchingId({id: categoryId}))
        const [token, _] = getAuthLocalStorage()
        try {
            const response = await dispatch(categoriesAPI.endpoints.deleteCustomCategory.initiate({
                categoryId,
                token: token
                
            }))
            if(!response.error) {
                return fulfillWithValue({id: categoryId})
            } else {
                // newMicroalert
                throw new Error(response.error.message)
            }
        } catch (error) {
            console.log('Ошибка удаления категории', error.message)
            return rejectWithValue({id: categoryId})
        }
    }
)


const initialState = {
    editCustomCategory: {
        fetchingCategoryIds: [],
    },
    deleteCustomCategory: {
        fetchingCategoryIds: [],
    },
    addCustomCategory: {
        isFetching: false
    },
    successedCategoriesIds: []
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addEditCustomCategoryFetchingId(state, action) {
            state.editCustomCategory.fetchingCategoryIds.push(action.payload.id)
        },
        addSuccessedCustomCategoryId(state, action) {
            state.successedCategoriesIds.push(action.payload.id)
        },
        removeSuccessedCustomCategoryId(state) {
            state.successedCategoriesIds.shift()
        },
        addDeleteCustomCategoryFetchingId(state, action) {
            state.deleteCustomCategory.fetchingCategoryIds.push(action.payload.id)
        },
    },
    extraReducers: builder =>
        builder
            .addCase(editCustomCategory.fulfilled, (state, action) => {
                const index = state.editCustomCategory.fetchingCategoryIds.findIndex(el => el === action.payload.id)
                state.editCustomCategory.fetchingCategoryIds.splice(index, 1)
            })
            .addCase(addNewCustomCategory.pending, (state) => {
                state.addCustomCategory.isFetching = true
            })
            .addCase(addNewCustomCategory.fulfilled, (state) => {
                state.addCustomCategory.isFetching = false
            })

            .addCase(deleteCustomCategory.fulfilled, (state, action) => {
                const index = state.deleteCustomCategory.fetchingCategoryIds.findIndex(el => el === action.payload.id)
                state.deleteCustomCategory.fetchingCategoryIds.splice(index, 1)
            })
})

export const { addEditCustomCategoryFetchingId, addSuccessedCustomCategoryId, removeSuccessedCustomCategoryId, addDeleteCustomCategoryFetchingId } = categoriesSlice.actions
export default categoriesSlice.reducer