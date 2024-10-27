import { default as authSlice } from './authSlice'
import {
    setUserAuth,
    setUserUnauth,
    setAuthError,
    resetAuthError,
    setUserProfileData,
    setUserCategories,
    updateBudget,
    updateCategory,
    setNewCategory,
    unsetDeletedCategory,
} from './authSlice'

const initialState = {
    data: {
        inProcess: false,
        isAuthError: false,
        errorMessage: null,
        isAuth: false,
        profileData: {},
        categories: {
            isFetching: false
        }
    }
}

describe('authSlice', () => {
    it('slice init on empty action', () => {
        const result = authSlice(undefined, {type: ''})
        expect(result).toEqual(initialState)
    })

    it('setUserAuth', () => {
        const action = { type: setUserAuth.type, payload: ''}
        const result = authSlice(initialState, action)
        expect(result.data.isAuth).toBe(true)
    })

    it('setUserUnauth', () => {
        const action = { type: setUserUnauth.type, payload: ''}
        const result = authSlice(initialState, action)
        expect(result.data.isAuth).toBe(false)
        expect(result.data.profileData).toEqual({})

    })

    it('setAuthError', () => {
        const action = { type: setAuthError.type, payload: {message: "error message"}}
        const result = authSlice(initialState, action)
        expect(result.data.isAuthError).toBe(true)
        expect(result.data.errorMessage).toBe("error message")
    })

    it('resetAuthError', () => {
        const action = { type: resetAuthError.type, payload: ''}
        const result = authSlice(initialState, action)
        expect(result.data.isAuthError).toBe(false)
        expect(result.data.errorMessage).toBe(null)
    })

    const userProfileData = {
        budget: 0,
        categories: [],
        currencyId: 2,
        id: 1,
        isProfileActivated: true,
        themeId: 1,
        userId:  1
    }

    it('setUserProfileData', () => {
        const action = { type: setUserProfileData.type, payload: {data: userProfileData}}
        const result = authSlice(initialState, action)
        expect(result.data.profileData).toEqual(userProfileData)

    })

    const categories = [
        {
            id: 12,
            postType: 2,
            isDefault: true,
            name: "Другие расходы",
            color: "#DFCABE",
            userId: 0
        }
    ]

    it('setUserCategories', () => {
        const action = { type: setUserCategories.type, payload: {data: categories}}
        const result = authSlice(initialState, action)
        expect(result.data.profileData.categories).toEqual(categories)
    })

    it('updateBudget', () => {
        const action = { type: updateBudget.type, payload: {data: 100}}
        const result = authSlice(initialState, action)
        expect(result.data.profileData.budget).toBe(100)
    })


    const initialStateWithCategories = {
        data: {
            inProcess: false,
            isAuthError: false,
            errorMessage: null,
            isAuth: false,
            profileData: {
                categories: [
                    {
                        id: 12,
                        postType: 2,
                        isDefault: true,
                        name: "Другие расходы",
                        color: "#DFCABE",
                        userId: 0
                    }
                ]
            },
            categories: {
                isFetching: false
            }
        }
    }


    const updateCategoryData = {
        categoryId: 12,
        newName: "updated",
        color: "#FFFFFF"
    }

    it('updateCategory', () => {
        const action = { type: updateCategory.type, payload: updateCategoryData}
        const result = authSlice(initialStateWithCategories, action)
        const updatedCategory = result.data.profileData.categories.find(el => el.id === 12)
        expect(updatedCategory).toEqual({
            id: 12,
            postType: 2,
            isDefault: true,
            name: "updated",
            color: "#FFFFFF",
            userId: 0
        })
    })

    const newCategory = {
        id: 13,
        postType: 1,
        isDefault: true,
        name: "New one",
        color: "#DFCABE",
        userId: 2
    }

    it('setNewCategory', () => {
        const action = { type: setNewCategory.type, payload: {data: newCategory}}
        const result = authSlice(initialStateWithCategories, action)
        expect(result.data.profileData.categories[0]).toEqual(newCategory)
    })

    it('unsetDeletedCategory', () => {
        const action = { type: unsetDeletedCategory.type, payload: {categoryId: 12} }
        const result = authSlice(initialStateWithCategories, action)
        expect(result.data.profileData.categories.length).toBe(0)
    })

})