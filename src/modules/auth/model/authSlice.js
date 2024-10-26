import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'
import { getAuthLocalStorage, removeAuthLocalStorage, setAuthLocalStorage } from '@shared/utils/localStorage'
import { checkAuthorization } from '@app'
import { resetPostList } from '@modules/posts'
import { setNewMicroalert } from '@modules/alerts'
import { setCurrentTheme } from '@app/model'


export const userCreateAccountProfile = createAsyncThunk(
    'auth/userCreateAccountProfile',
    async (data, {dispatch}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userCreateProfile.initiate({
                userId: data.userId,
                token: data.token
            }))
            if(response.error) {
                throw new Error(`Ошибка создания профиля ${response.error.message}`)
            } else {
                return true
            }
        } catch (error) {
            console.log(error.message)
            return false
        }
        
    }
)

const setAuthLocalStorageWithPromice = (accessToken, id) => {
    setAuthLocalStorage(accessToken, id)
    return Promise.resolve()
}

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data, {dispatch, rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userRegister.initiate({
                email: data.email,
                password: data.password
            }))
            if(!response.error) {
                await Promise.all([
                    dispatch(userCreateAccountProfile({userId: response.data.user.id, token: response.data.accessToken})),
                    setAuthLocalStorageWithPromice(response.data.accessToken, response.data.user.id),
                ])
                .then(() => {
                    dispatch(getAuthorizedUserData())
                })
                .then(() => {
                    dispatch(setUserAuth())
                    return fulfillWithValue(true)
                })
            } else {
                // response.error.data - сообщение
                // response.error.status - статус ошибки
                throw new Error(response.error.data)
            }
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (data, {dispatch, rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userLogin.initiate({
                email: data.email,
                password: data.password
            }))
            if(!response.error) {
                await Promise.all([
                    setAuthLocalStorage(response.data.accessToken, response.data.user.id),
                    dispatch(getAuthorizedUserData()),
                ])
                .then(() => {
                    dispatch(setUserAuth())
                    return fulfillWithValue(true)
                })
            } else {
                // response.error.data - сообщение
                // response.error.status - статус ошибки
                throw new Error(response.error.data)
            }
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async (_, {dispatch}) => {
        removeAuthLocalStorage()
        dispatch(checkAuthorization())
        dispatch(resetPostList())
    }
)

export const getAuthorizedUserData = createAsyncThunk(
    'auth/getAuthorizedUserData',
    async (_, {dispatch}) => {
        try {
            await Promise.all([
                dispatch(getUserProfileData()),
                dispatch(getUserCategories()),
            ])
            .then(() => true)
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getUserProfileData = createAsyncThunk(
    'auth/getUserProfileData',
    async (_, {dispatch}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {

            const response = await dispatch(authAPI.endpoints.getProfileData.initiate({
                token: token,
                userId: userId
            },
            {
                subscribe: false, 
                forceRefetch: true 
            }))

            if(!response.error) {
                const pd = {data: response.data.usersProfileData[0]}
                dispatch(setUserProfileData(pd))
                dispatch(setCurrentTheme({themeId: pd.data.themeId}))
                return Promise.resolve()
            } else {
                throw new Error('Ошибка получения данных профиля')
            }

        } catch (error) {
            console.log(error.message)
            return Promise.reject()
        }
    }
)

export const getUserCategories = createAsyncThunk(
    'auth/getUserCategories',
    async (_, {dispatch}) => {
        const [ token, userId ] = getAuthLocalStorage()
        try {
            const response = await dispatch(authAPI.endpoints.getCategories.initiate({
                token: token,
                userId: userId
            },
            {
                subscribe: false, 
                forceRefetch: true 
            }))

            if(!response.error) {
                const categories = {data: response.data}
                dispatch(setUserCategories(categories))
                return Promise.resolve()
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error('Ошибка получения данных профиля')
            }
            
        } catch (error) {
            console.log(error.message)
            return Promise.reject()
        }
    }
)

export const checkUnauthorizedErrorStatus = createAsyncThunk(
    'auth/checkUnauthorizedErrorStatus',
    async ({status}, {dispatch}) => {
        if(status===401) {
            dispatch(setNewMicroalert({text: 'Сессия истекла. Авторизуйтесь заново.'}))
            dispatch(userLogout())
        }
    }
)

const initialState = {
    data: {
        inProcess: false,
        isAuthError: false,
        errorMessage: null,
        isAuth: false,
        profileData: {},
        categories: {
            isFetching: false
        }
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserAuth(state) {
            state.data.isAuth = true
        },
        setUserUnauth(state) {
            state.data.isAuth = false
            state.data.profileData = {}
        },
        setAuthError(state, action) {
            state.data.isAuthError = true
            state.data.errorMessage = action.payload.message
        },
        resetAuthError(state) {
            state.data.isAuthError = false
            state.data.errorMessage = null
        },
        setUserProfileData(state, action) {
            state.data.profileData = {
                ...state.data.profileData,
                ...action.payload.data,
            }
        },
        setUserCategories(state, action) {
            state.data.profileData = {
                ...state.data.profileData,
                categories: action.payload.data
            }
        },
        setUserCustomCategories(state, action) {
            state.data.profileData = {
                ...state.data.profileData,
                customCategories: action.payload.data
            }
        },
        updateBudget(state, action) {
            state.data.profileData.budget = action.payload.data
        },

        updateCategory(state, action) {
            state.data.profileData.categories = state.data.profileData.categories.map(el => {
                if(el.id === action.payload.categoryId) {
                    return {
                        ...el,
                        name: action.payload.newName,
                        color: action.payload.color
                    }
                } else {
                    return el
                }
            })
        },
        setNewCategory(state, action) {
            state.data.profileData.categories.unshift(action.payload.data)
        },
        unsetDeletedCategory(state, action) {
            state.data.profileData.categories = state.data.profileData.categories.filter(el => el.id !== action.payload.categoryId)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(userRegister.pending, (state) => {
                state.data.inProcess = true
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.data.inProcess = false
                state.data.isAuthError = false
                state.data.errorMessage = null
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.data.inProcess = false
                state.data.isAuthError = true
                state.data.errorMessage = action.payload
            })

            .addCase(userLogin.pending, (state) => {
                state.data.inProcess = true
            })
            .addCase(userLogin.fulfilled, (state) => {
                state.data.inProcess = false
                state.data.isAuthError = false
                state.data.errorMessage = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.data.inProcess = false
                state.data.isAuthError = true
                state.data.errorMessage = action.payload
            })

            .addCase(getUserCategories.pending, (state) => {
                state.data.categories.isFetching = true
            })
            .addCase(getUserCategories.fulfilled, (state) => {
                state.data.categories.isFetching = false
            })
})

export const { unsetDeletedCategory, setNewCategory, updateCategory, setUserAuth, setUserUnauth, setAuthError, resetAuthError, setUserProfileData, unsetUserProfileData, setUserCategories, setUserCustomCategories, updateBudget } = authSlice.actions
export default authSlice.reducer