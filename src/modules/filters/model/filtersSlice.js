import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    filtersData: {
        postType: 0,
    }
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPostTypeFilter(state, action) {
            state.filtersData.postType = action.payload.data
        }
    },
    
})

export const { setPostTypeFilter } = filtersSlice.actions
export default filtersSlice.reducer