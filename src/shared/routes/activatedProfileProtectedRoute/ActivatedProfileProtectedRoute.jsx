import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ActivatedProfileProtectedRoute = ({ children }) => {

    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)

    if(isProfileActivated) {
        return children ? children : <Outlet/>
    } else {
        return <Navigate to={'/first-steps'}/>
    }

}