import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthProtectedRoute = ({ children, inversed=false }) => {

    const isAuth = useSelector(store => store.auth.data.isAuth)
    
    if(!inversed) {
        if(!isAuth) {
            // Если юзер не авторизован
            return <Navigate to={'/auth/signin'}/>
        } else {
            // Если юзер авторизован
            return children ? children : <Outlet/>
        }
    } else {
        if(isAuth) {
            // Если юзер авторизован
            return <Navigate to={'/panel/main'}/>
        } else {
            // Если юзер не авторизован
            return children ? children : <Outlet/>
        }
    }

}