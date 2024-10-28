import { authAPI } from '@modules/auth'
import { getUserProfileData, setUserAuth, setUserUnauth } from '@modules/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthLocalStorage, removeAuthLocalStorage } from '@shared/utils/localStorage'
import { appAPI } from './appAPI'
import { getAuthorizedUserData } from '@modules/auth/model/authSlice'
import { setNewMicroalert } from '@modules/alerts'

const initialState = {
    data: {
        isInit: false,
        appData: null,
        currentTheme: 1,
        changeThemeStatus: {
            isFetching: false
        }
    },

}

export const appInitialization = createAsyncThunk(
    'app/appInitialization',
    async (_, {dispatch}) => {
        await Promise.all([
                dispatch(checkAuthorization()),
                dispatch(getAppData()),
            ])
            .then(() => {
                dispatch(setAppInit())
            })
    }
)

export const checkAuthorization = createAsyncThunk(
    'app/checkAuthorization',
    async (_, {dispatch}) => {
        const [ token, id ] = getAuthLocalStorage()
        if(token) {
            const response = await dispatch(authAPI.endpoints.checkAuthorization.initiate({
                token: token, 
                id: id
            }))
            if(!response.error) {
                dispatch(getAuthorizedUserData())
                dispatch(setUserAuth())
                return true
            } else {
                dispatch(setUserUnauth())
                removeAuthLocalStorage()
                return true
            }
        } else {
            dispatch(setUserUnauth())
            removeAuthLocalStorage()
            return true
        }
    }
)

export const getAppData = createAsyncThunk(
    'app/getAppData',
    async (_, {dispatch}) => {
        await Promise.all([
            dispatch(appAPI.endpoints.getCurrencies.initiate()),
            dispatch(appAPI.endpoints.getPostTypes.initiate()),
            dispatch(appAPI.endpoints.getFilters.initiate()),
            dispatch(appAPI.endpoints.getDayFilters.initiate()),
            dispatch(appAPI.endpoints.getThemes.initiate()),
            dispatch(getUserProfileData()),
            dispatch(getCurrentDate())
        ])
        .then(([currencies, postTypes, filters, dayFilters, themes, b]) => {
            dispatch(setAppData({
                data: {
                    currencies: currencies.data,
                    postTypes: postTypes.data,
                    filters: filters.data,
                    dayFilters: dayFilters.data,
                    themes: themes.data
                }
            }))
        })
    }
)

export const getCurrentDate = createAsyncThunk(
    'app/getCurrentDate',
    async (_, {dispatch}) => {
        const today = new Date().toISOString().split("T")[0]
        dispatch(setCurrentDate({
            data: today
        }))
        return true
    }
)

export const changeUserTheme = createAsyncThunk(
    'app/changeUserTheme',
    async ({themeId}, {dispatch, fulfillWithValue, rejectWithValue}) => {
        try {
            const [ token, userId ] = getAuthLocalStorage()
            const response = dispatch(appAPI.endpoints.setNewTheme.initiate({
                themeId,
                userId: userId,
                token: token
            }))
            if(!response.error) {
                dispatch(setCurrentTheme({themeId}))
                fulfillWithValue(true)
            } else {
                dispatch(checkUnauthorizedErrorStatus({status: response.error.status}))
                throw new Error('Ошибка установки темы')
            }
        } catch (error) {
            dispatch(setNewMicroalert({text: 'Ошибка установки темы'}))
            console.log(error.message)
            rejectWithValue(true)
        }
        
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInit(state) {
            state.data.isInit = true
        },
        setAppData(state, action) {
            state.data.appData = {
                ...state.data.appData,
                ...action.payload.data
            }
        },
        setCurrentDate(state, action) {
            state.data.appData = {
                ...state.data.appData,
                todayDate: action.payload.data
            }
        },
        setCurrentTheme(state, action) {
            state.data.currentTheme = action.payload.themeId
        }
    },
    extraReducers: builder =>
        builder
            .addCase(changeUserTheme.pending, (state) => {
                state.data.changeThemeStatus.isFetching = true
            })
            .addCase(changeUserTheme.fulfilled, (state) => {
                state.data.changeThemeStatus.isFetching = false
            })
            .addCase(changeUserTheme.rejected, (state) => {
                state.data.changeThemeStatus.isFetching = false
            })
})

export const { setCurrentTheme, setAppInit, setAppData, setCurrentDate } = appSlice.actions
export default appSlice.reducer