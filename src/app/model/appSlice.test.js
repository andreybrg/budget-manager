import { default as appSlice } from './appSlice'
import { setCurrentTheme, setAppInit, setAppData, setCurrentDate } from './appSlice'

const initialState = {
    data: {
        isInit: false,
        appData: null,
        currentTheme: 1,
        changeThemeStatus: {
            isFetching: false
        }
    }
}

describe('appSlice', () => {
    it('slice init on empty action', () => {
        const result = appSlice(undefined, {type: ''})
        expect(result).toEqual(initialState)
    })

    it('setAppInit', () => {
        const action = { type: setAppInit.type, payload: ''}
        const result = appSlice(initialState, action)
        expect(result.data.isInit).toBe(true)
    })

    it('setCurrentTheme', () => {
        const action = { type: setCurrentTheme.type, payload: {themeId: 2}}
        const result = appSlice(initialState, action)
        expect(result.data.currentTheme).toBe(2)
    })

    it('setCurrentDate', () => {
        const action = { type: setCurrentDate.type, payload: {data: '2024-10-10'}}
        const result = appSlice(initialState, action)
        expect(result.data.appData.todayDate).toBe('2024-10-10')
    })

    it('setAppData', () => {
        const action = { type: setAppData.type, payload: {
            data: {
                currencies: [],
                postTypes: [],
                filters: [],
                dayFilters: [],
                themes: []
            }
        }}
        const result = appSlice(initialState, action)
        expect(result.data.appData.currencies).toEqual([])
        expect(result.data.appData.postTypes).toEqual([])
        expect(result.data.appData.filters).toEqual([])
        expect(result.data.appData.dayFilters).toEqual([])
        expect(result.data.appData.themes).toEqual([])
    })
})