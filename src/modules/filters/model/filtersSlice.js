import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    filtersData: {
        postType: 0,
        dayFilter: 'today',
        dateFrom: null,
        dateTo: null
    }
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPostTypeFilter(state, action) {
            state.filtersData.postType = action.payload.data
        },
        setDayFilter(state, action) {
            state.filtersData.dayFilter = action.payload.data
        }
    },
    
})

export const { setPostTypeFilter, setDayFilter } = filtersSlice.actions
export default filtersSlice.reducer