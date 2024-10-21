import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const Container = () => {

    const navigate = useNavigate()
    const { authMode } = useParams()
    const [ authModeState, setAuthModeState ] = useState(authMode)

    const onToggleAuthMode = (mode) => {
        navigate(`/auth/${mode}`)
        // setAuthModeState(prev => mode)
    }

    useEffect(() => {
        setAuthModeState(authMode)
    }, [authMode])

    if(authMode) {
        return(
            <Layout
                authMode={authModeState}
                toggleAuthMode={onToggleAuthMode}
                />
        )
    } else {
        <Navigate to={'/auth/signup'}/>
    }
}