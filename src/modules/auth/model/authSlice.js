import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'
import { getAuthLocalStorage, removeAuthLocalStorage, setAuthLocalStorage } from '@shared/utils/localStorage'
import { checkAuthorization } from '@app'
import { resetPostList } from '@modules/posts'


export const userCreateAccountProfile = createAsyncThunk(
    '',
    async (data, {dispatch}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userCreateProfile.initiate({
                userId: data.userId,
                token: data.token
            }))
            if(response.error) {
                throw new Error(`Ошибка создания профиля ${response.error.message}`)
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }
)

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
                    setAuthLocalStorage(response.data.accessToken, response.data.user.id),
                    dispatch(getAuthorizedUserData())
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
                dispatch(getUserCategories())
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

            const pd = {data: response.data.usersProfileData[0]}
            dispatch(setUserProfileData(pd))
            return response
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getUserCategories = createAsyncThunk(
    'auth/getUserCategories',
    async (_, {dispatch}) => {
        try {
            const response = await dispatch(authAPI.endpoints.getCategories.initiate({
                
            },
            {
                subscribe: false, 
                forceRefetch: true 
            }))
            const categories = {data: response.data}
            dispatch(setUserCategories(categories))
            return response
        } catch (error) {
            console.log(error.message)
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
})

export const { setUserAuth, setUserUnauth, setAuthError, resetAuthError, setUserProfileData, unsetUserProfileData, setUserCategories } = authSlice.actions
export default authSlice.reducer