import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    microalerts: {
        list: [],
    }
}

export const setNewMicroalert = createAsyncThunk(
    'alert/setNewMicroalert',
    async (data, {dispatch, getState}) => {
        const microalerts = getState().alerts.microalerts.list
        const newItemId = microalerts.length ? microalerts[microalerts.length-1].id+1 : 1
        dispatch(setMicroalert({text: data.text, id: newItemId}))
        dispatch(delLastMicroalert())
    },
)

export const delLastMicroalert = createAsyncThunk(
    'alert/delLastMicroalert',
    async (data, {dispatch}) => {
        setTimeout(()=>{
            dispatch(removeLastMicroalert())
        }, 5000)
    },
)

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setMicroalert(state, action) {
            state.microalerts.list.push({text: action.payload.text, id: action.payload.id})
        },
        removeLastMicroalert(state) {
            state.microalerts.list.shift()
        }
    }
})

export const { setMicroalert, removeLastMicroalert } = alertSlice.actions
export default alertSlice.reducer