import { authAPI } from '@modules/auth'
import { setUserAuth, setUserUnauth } from '@modules/auth/model/authSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthLocalStorage, removeAuthLocalStorage } from '@shared/utils/localStorage'

const initialState = {
    data: {
        isInit: false,
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

export const appInitialization = createAsyncThunk(
    'app/appInitialization',
    async (_, {dispatch}) => {
        Promise.all([dispatch(checkAuthorization())])
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
    }
})

export const { setAppInit } = appSlice.actions
export default appSlice.reducer