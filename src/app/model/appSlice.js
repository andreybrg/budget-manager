import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        isInit: false,
    },

}

export const appInitialization = createAsyncThunk(
    'app/appInitialization',
    async (data, {dispatch}) => {
        dispatch(setAppInit())
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