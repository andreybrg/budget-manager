import { authAPI } from '@modules/auth'
import { getUserProfileData, setUserAuth, setUserUnauth } from '@modules/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthLocalStorage, removeAuthLocalStorage } from '@shared/utils/localStorage'
import { appAPI } from './appAPI'
import { getAuthorizedUserData } from '@modules/auth/model/authSlice'

const initialState = {
    data: {
        isInit: false,
        appData: null
    },

}

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
            } else {
                dispatch(setUserUnauth())
                removeAuthLocalStorage()
            }
        } else {
            dispatch(setUserUnauth())
            removeAuthLocalStorage()
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
            dispatch(getUserProfileData())
        ])
        .then(([currencies, postTypes, filters, b]) => {
            dispatch(setAppData({
                currencies: currencies.data,
                postTypes: postTypes.data,
                filters: filters.data
            }))
        })
    }
)

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

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInit(state) {
            state.data.isInit = true
        },
        setAppData(state, action) {
            state.data.appData = action.payload
        },
    }
})

export const { setAppInit, setAppData } = appSlice.actions
export default appSlice.reducer