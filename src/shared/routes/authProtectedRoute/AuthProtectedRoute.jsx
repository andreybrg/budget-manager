import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthProtectedRoute = ({ children, forAuthorizedUser=false }) => {

    const isAuth = useSelector(store => store.auth.data.isAuth)
    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)
    
    if(!forAuthorizedUser)  {
        if(isAuth) {
            return children ? children : <Outlet/>
        } else {
            return <Navigate to={'/auth/signin'}/>
        }
    } else {
        if(!isAuth) {
            return children ? children : <Outlet/>
        } else {
            if(isProfileActivated) {
                return <Navigate to={'/panel/main'}/>
            } else {
                return <Navigate to={'/first-steps'}/>
            }
        }
    }
}