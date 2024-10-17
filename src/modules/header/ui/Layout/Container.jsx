import React from 'react'
import { withAuth } from '@shared/hoc/withAuth'
import { Layout } from './Layout'

const Container = ({ isAuth }) => {
    return(
        <Layout
            isAuth={isAuth}
            />
    )
}

export const ContainerWithAuth = withAuth(Container)