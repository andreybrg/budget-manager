import React from 'react'
import { Layout } from './Layout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PagePreloader } from '@modules/preloader'

export const Container = () => {

    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)
    const isAuthizizationInProcess = useSelector(store => store.auth.data.inProcess)

    if(!isAuthizizationInProcess) {
        if(isProfileActivated) {
            return(
                <Layout
                    isProfileActivated={isProfileActivated}
                    />
            )
        } else {
            return <Navigate to={'/first-steps'}/>
        }
    } else {
        return <PagePreloader/>
    }
}