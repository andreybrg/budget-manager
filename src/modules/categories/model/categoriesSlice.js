import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { categoriesAPI } from './categoriesAPI'
import { getAuthLocalStorage } from '@shared/utils/localStorage'
import { setNewMicroalert } from '@modules/alerts'
import { checkUnauthorizedErrorStatus } from '@modules/auth'

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
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
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
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
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
    async ({ token, categoryId }, {dispatch, rejectWithValue}) => {
        try {
            const response = await dispatch(categoriesAPI.endpoints.deleteCustomCategory.initiate({
                categoryId,
                token
                
            }))
            if(response.error) {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error(response.error.message)   
            }
        } catch (error) {
            console.log('Ошибка удаления категории', error.message)
            return rejectWithValue({id: categoryId})
        }
    }
)

export const movePostsInDefault = createAsyncThunk(
    'categories/movePostsInDefault',
    async ({token, postList, postType}, {dispatch, getState}) => {
        const categories = getState().auth.data.profileData.categories
        const newCategory = postType === 1 ? categories.find(el => el.name === "Другие доходы") : categories.find(el => el.name === "Другие расходы")

        const fn = async (resolve, reject, id, newCategoryId, token) => {
            try {
                const response = await dispatch(categoriesAPI.endpoints.movePostsInDefault.initiate({
                    id,
                    newCategoryId,
                    token: token
                }))
                if(response.error) {
                    reject(id)
                    dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                    throw new Error(response.error.message)
                }
                return resolve(id)
            } catch (error) {
                console.log('Ошибка изменения категории записей', error.message)
            }
        }

        const promiceList = postList.map(el => new Promise((resolve, reject) => fn(resolve, reject, el.id, newCategory.id, token)))
        await Promise.all(promiceList)
            .then(() => {
                dispatch(setNewMicroalert({text: `Категория успешно удалена`}))
                return true
            })
    }
)

export const deleteCategoryActions = createAsyncThunk(
    'categories/deleteCategoryActions',
    async ({categoryId, postType}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        dispatch(addDeleteCustomCategoryFetchingId({id: categoryId}))
        const [token, _] = getAuthLocalStorage()
        try {
            const responsePosts = await dispatch(categoriesAPI.endpoints.getPostsForPatch.initiate({
                categoryId,
                token: token
            }))
            const moveResponse = await dispatch(movePostsInDefault({postList: responsePosts.data, categoryId, postType, token}))
            const deleteResponse = await dispatch(deleteCustomCategory({token, categoryId}))

            if(!moveResponse.error && !deleteResponse.error) {
                
                return fulfillWithValue({id: categoryId})
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error(`${moveResponse.error ? moveResponse.error.message : null} ${deleteResponse.error ? `and ${deleteResponse.error.message}` : null}`)
            }

        } catch (error) {
            return rejectWithValue(error.message)
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
            .addCase(addNewCustomCategory.pending, (state) => {
                state.addCustomCategory.isFetching = true
            })
            .addCase(addNewCustomCategory.fulfilled, (state) => {
                state.addCustomCategory.isFetching = false
            })
            .addCase(addNewCustomCategory.rejected, (state) => {
                state.addCustomCategory.isFetching = false
            })
            .addCase(editCustomCategory.fulfilled, (state, action) => {
                const index = state.editCustomCategory.fetchingCategoryIds.findIndex(el => el === action.payload.id)
                state.editCustomCategory.fetchingCategoryIds.splice(index, 1)
            })

            .addCase(deleteCategoryActions.fulfilled, (state, action) => {
                const index = state.deleteCustomCategory.fetchingCategoryIds.findIndex(el => el === action.payload.id)
                state.deleteCustomCategory.fetchingCategoryIds.splice(index, 1)

            })
})

export const { addEditCustomCategoryFetchingId, addSuccessedCustomCategoryId, removeSuccessedCustomCategoryId, addDeleteCustomCategoryFetchingId } = categoriesSlice.actions
export default categoriesSlice.reducer