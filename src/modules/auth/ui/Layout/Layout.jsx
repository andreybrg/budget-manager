import React from 'react'
import { SignIn } from '@modules/auth/signIn'
import { SignUp } from '@modules/auth/signUp'
import authStyle from './Layout.module.sass'

export const Layout = ({
    authMode,
    toggleAuthMode
}) => {

    if(authMode === 'signin') {
        return(
            <div className={authStyle.container}>
                <div className={authStyle.title}>Добро пожаловать</div>
                <SignIn
                    authStyle={authStyle}
                    toggleAuthMode={toggleAuthMode}
                    />
            </div>
        )
    }
    if(authMode === 'signup') {
        return(
            <div className={authStyle.container}>
                <div className={authStyle.title}>Начните управлять бюджетами</div>
                <SignUp
                    authStyle={authStyle}
                    toggleAuthMode={toggleAuthMode}
                    />
            </div>
        )
    }
}