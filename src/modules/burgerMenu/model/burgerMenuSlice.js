import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        isOpened: false
    }
}

const burgerMenuSlice = createSlice({
    name: 'burgerMenu',
    initialState,
    reducers: {
        openBurgerMenu(state) {
            state.data.isOpened = true
        },
        closeBurgerMenu(state) {
            state.data.isOpened = false
        }
    }
})

export const { openBurgerMenu, closeBurgerMenu } = burgerMenuSlice.actions
export default burgerMenuSlice.reducer