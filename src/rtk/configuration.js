import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "@app"

const store = configureStore({
    reducer: {
        app: appSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
})

export default store

window.reduxStore = store