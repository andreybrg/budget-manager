import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "@app"
import { authAPI, authSlice } from "@modules/auth"
import { appAPI } from "@app/model"
import { firstStepsAPI, firstStepsSlice } from "@modules/firstSteps"
import { burgerMenuSlice } from "@modules/burgerMenu"
import { postsAPI, postsSlice } from "@modules/posts"
import { filtersSlice } from "@modules/filters"
import { categoriesSlice, categoriesAPI } from "@modules/categories"


const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        firstSteps: firstStepsSlice,
        burgerMenu: burgerMenuSlice,
        posts: postsSlice,
        filters: filtersSlice,
        categories: categoriesSlice,
        [authAPI.reducerPath]: authAPI.reducer,
        [appAPI.reducerPath]: appAPI.reducer,
        [firstStepsAPI.reducerPath]: firstStepsAPI.reducer,
        [postsAPI.reducerPath]: postsAPI.reducer,
        [categoriesAPI.reducerPath]: postsAPI.reducer,
        
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(appAPI.middleware)
            .concat(firstStepsAPI.middleware)
            .concat(postsAPI.middleware)
            .concat(categoriesAPI.middleware)
})


export default store

window.reduxStore = store