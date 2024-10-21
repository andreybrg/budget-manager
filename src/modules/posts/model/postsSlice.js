import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {}
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    }
})

export const { } = postsSlice.actions
export default postsSlice.reducer