import React from 'react'
import { Layout } from './Layout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PagePreloader } from '@modules/preloader'

export const Container = () => {

    const isAuthizizationInProcess = useSelector(store => store.auth.data.inProcess)

    if(!isAuthizizationInProcess) {
        return <Layout/>
    } else {
        return <PagePreloader/>
    }
}