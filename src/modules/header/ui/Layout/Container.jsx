import React from 'react'
import { useSelector } from 'react-redux'
import { withAuth } from '@shared/hoc/withAuth'
import { Layout } from './Layout'

const Container = ({ isAuth }) => {

    const isProfileActivated = useSelector(store => store.auth.data.profileData.isProfileActivated)

    return(
        <Layout
            isAuth={isAuth}
            isProfileActivated={isProfileActivated}
            />
    )
}

export const ContainerWithAuth = withAuth(Container)