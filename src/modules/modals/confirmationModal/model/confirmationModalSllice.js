import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: null,
    isMounted: false,
}

const confirmationModalSllice = createSlice({
    name: 'centeredModal',
    initialState,
    reducers: {
        setConfirmationModal(state, action) {
            state.title = action.payload.title
            state.isMounted = true
        },
        unsetConfirmationModal(state) {
            state.title = null
            state.isMounted = false
        }
    }
})

export const { setConfirmationModal, unsetConfirmationModal } = confirmationModalSllice.actions
export default confirmationModalSllice.reducer