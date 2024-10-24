import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: null,
    isMounted: false,
}

const centeredModalSlice = createSlice({
    name: 'centeredModal',
    initialState,
    reducers: {
        setCenteredModal(state, action) {
            state.title = action.payload.title
            state.isMounted = true
        },
        unsetCenteredModal(state) {
            state.title = null
            state.isMounted = false
        }
    }
})

export const { setCenteredModal, unsetCenteredModal } = centeredModalSlice.actions
export default centeredModalSlice.reducer