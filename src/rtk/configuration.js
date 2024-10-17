import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "@app"
import { authAPI, authSlice } from "@modules/auth"

const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        [authAPI.reducerPath]: authAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
})

export default store

window.reduxStore = store