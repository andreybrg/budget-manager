import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'
import { removeAuthLocalStorage, setAuthLocalStorage } from '@shared/utils/localStorage'
import { checkAuthorization } from '@app'

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userRegister.initiate({
                email: data.email,
                password: data.password
            }))
            if(!response.error) {
                setAuthLocalStorage(response.data.accessToken, response.data.user.id)
                dispatch(setUserAuth())
                return response
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
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await dispatch(authAPI.endpoints.userLogin.initiate({
                email: data.email,
                password: data.password
            }))
            if(!response.error) {
                setAuthLocalStorage(response.data.accessToken, response.data.user.id)
                dispatch(setUserAuth())
                return response
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
    }
)

const initialState = {
    data: {
        isFething: false,
        isError: false,
        errorMessage: null,
        isAuth: false,
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
        },
        resetAuthError(state) {
            state.data.isError = false
            state.data.errorMessage = null
        }
    },
    extraReducers: builder =>
        builder
            .addCase(userRegister.pending, (state) => {
                state.data.isFething = true
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.data.isFething = false
                state.data.isError = false
                state.data.errorMessage = null
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.data.isFething = false
                state.data.isError = true
                state.data.errorMessage = action.payload
            })

            .addCase(userLogin.pending, (state) => {
                state.data.isFething = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.data.isFething = false
                state.data.isError = false
                state.data.errorMessage = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.data.isFething = false
                state.data.isError = true
                state.data.errorMessage = action.payload
            })
})

export const { setUserAuth, setUserUnauth, resetAuthError } = authSlice.actions
export default authSlice.reducer